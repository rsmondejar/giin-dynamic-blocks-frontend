"use client";

import * as React from 'react';
import {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FeedIcon from '@mui/icons-material/Feed';
import RestoreIcon from '@mui/icons-material/Restore';
import {visuallyHidden} from '@mui/utils';
import moment from "moment/moment";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from "@mui/material/Button";
import {
    ButtonGroup,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, List, SelectChangeEvent,
    Skeleton
} from "@mui/material";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import {useSnackbar} from "notistack";
import uuid from "react-native-uuid";
import {useSession} from "next-auth/react";
import InputTextField from "@/components/forms/InputTextField";
import InputSelectField from "@/components/forms/InputSelectField";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";

interface Author {
    id: string;
    name: string;
    lastName: string;
}

interface CountMetrics {
    formSubmission: number;
    formsRoles: number;
    questions?: number;
}

interface Question {
    id: string;
}

interface Data {
    id: string;
    title: string;
    slug: string;
    author: Author;
    isPublished: boolean;
    createdAt: string;
    deletedAt: string;
    formsRoles: any;
    questions: Question[];
    _count: CountMetrics;
    _countFormSubmission: number;
    _countFormRoles: number;
    _countFormQuestions: number;
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
    align: 'left' | 'center' | 'right';
}

type Order = 'asc' | 'desc';

const defaultSkeletonRows = 5;

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string | Author | boolean | CountMetrics | Question[] },
    b: { [key in Key]: number | string | Author | boolean | CountMetrics | Question[] },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Fecha creación',
        align: 'center',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Título',
        align: 'center',
    },
    {
        id: 'slug',
        numeric: false,
        disablePadding: false,
        label: 'Slug',
        align: 'center',
    },
    {
        id: 'isPublished',
        numeric: false,
        disablePadding: false,
        label: '¿Publicado?',
        align: 'center',
    },
    {
        id: '_countFormSubmission',
        numeric: false,
        disablePadding: false,
        label: 'Total inscripciones',
        align: 'center',
    },
    {
        id: '_countFormRoles',
        numeric: false,
        disablePadding: false,
        label: 'Total Permisos',
        align: 'center',
    },
    {
        id: '_countFormQuestions',
        numeric: false,
        disablePadding: false,
        label: 'Total preguntas',
        align: 'center',
    },
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell: HeadCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell
                    align='center'
                    padding='normal'
                >
                    Acciones
                </TableCell>
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar() {
    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
            }}
        >
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Formularios
            </Typography>
        </Toolbar>
    );
}

export default function FormListTable() {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [loadingGetData, setLoadingGetData] = useState(true);

    const [rows, setRows] = React.useState([] as Data[]);
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('createdAt');
    const [selected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { data: session} = useSession({
        required: false,
    });

    const userId: string = session?.user?.id ?? '';
    const roleTypeOwner: string = 'owner';

    // Load data from API
    React.useEffect(() => {
        setLoadingGetData(true);
        getForms()
            .then(data => {
                return data.map((form: Data) => {
                    return {
                        ...form,
                        _count: {
                          questions: form?.questions?.length ?? 0,
                        },
                    }
                })
            })
            .then(data => {
            setRows(data);
            setLoadingGetData(false);
        });
    }, []);

    const getForms = async () => {
        const response = await fetch('/api/forms/find-all-by-user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json()
    }

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [rows, order, orderBy, page, rowsPerPage],
    );

    const parseDate = (stringDate: string) => moment(stringDate).format('DD/MM/YYYY HH:mm:ss');

    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [deleteFormItem, setDeleteFormItem] = React.useState({} as Data);

    const handleOpenDeleteDialog = (form: Data) => {
        setOpenDeleteDialog(true);
        setDeleteFormItem(form);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDeleteDialog = async () => {
        setOpenDeleteDialog(false);

        try {
            // enable loading screen
            setLoading(true);

            // send form to backend
            const response = await sendDeleteItem(deleteFormItem);

            if (response.errors) {
                throw new Error(
                    'Error al eliminar el formulario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Formulario eliminado correctamente.', { variant: 'success' });

            // Recargar los formularios
            await getForms().then((data) => {
                setRows(data);
                enqueueSnackbar('Listado de formularios actualizado.', { variant: 'success' });
            });
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', { variant: 'error' });
        } finally {
            // disable loading screen
            setLoading(false);
            setDeleteFormItem({} as Data);
        }
    }

    const sendDeleteItem = async (form: Data) => {
        const formCreateResponse = await fetch(`/api/forms/${form.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        return await formCreateResponse.json()
    }

    const [openRestoreDialog, setOpenRestoreDialog] = React.useState(false);
    const [restoreFormItem, setRestoreFormItem] = React.useState({} as Data);

    const handleOpenRestoreDialog = (form: Data) => {
        setOpenRestoreDialog(true);
        setRestoreFormItem(form);
    };

    const handleCloseRestoreDialog = () => {
        setOpenRestoreDialog(false);
    };

    const handleConfirmRestoreDialog = async () => {
        setOpenRestoreDialog(false);

        try {
            // enable loading screen
            setLoading(true);

            // send form to backend
            const response = await sendRestoreItem(restoreFormItem);

            if (response.errors) {
                throw new Error(
                    'Error al restaurar el formulario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Formulario restaurado correctamente.', { variant: 'success' });

            // Recargar los formularios
            await getForms().then((data) => {
                setRows(data);
                enqueueSnackbar('Listado de formularios actualizado.', { variant: 'success' });
            });
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', { variant: 'error' });
        } finally {
            // disable loading screen
            setLoading(false);
            setRestoreFormItem({} as Data);
        }
    }

    const sendRestoreItem = async (form: Data) => {
        const formRestoreResponse = await fetch(`/api/forms/${form.id}/restore`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        return await formRestoreResponse.json()
    }

    const handleExportFormSubmissions = async (form: Data) => {
        try {
            setLoading(true);

            const blob = await exportFormSubmissionsExcel(form);

            const date: string = moment().format('DD-MM-YYYY_HH:mm:ss');

            downloadFile(blob, `formulario_${form.slug}_inscripciones_${date}.xlsx`);

            enqueueSnackbar('Inscripciones formulario exportadas correctamente.', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', { variant: 'error' });
        } finally {
            // disable loading screen
            setLoading(false);
        }
    }

    const downloadFile = (blob: Blob, fileName: string) => {
        // Now you can use the blob to create a download link, for example
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // or any other filename you want
        document.body.appendChild(a); // we need to append the element to the dom -> invisible
        a.click();
        a.remove();  // afterwards we remove the element again
    }

    const exportFormSubmissionsExcel = async (form: Data) => {
        const formCreateResponse = await fetch(`/api/forms/${form.id}/submissions/export/excel`, {
            method: 'GET',
        });

        return await formCreateResponse.blob()
    }

    interface FormRole {
        role: {
            id: string,
            name: string,
            type: string,
        },
        user: {
            id: string,
            email: string,
            name: string,
            lastName?: string,
        }
    }

    const [openShareDialog, setOpenShareDialog] = React.useState(false);
    const [formUserRoles, setFormUserRoles] = React.useState([] as FormRole[]);
    const [formToShare, setFormToShare] = React.useState({} as Data);
    const [addPermissionEmailInputError, setAddPermissionEmailInputError] = React.useState(false);
    const [addPermissionRoleInputError, setAddPermissionRoleInputError] = React.useState(false);
    const [addPermissionEmailInput, setAddPermissionEmailInput] = React.useState('');
    const [addPermissionRoleInput, setAddPermissionRoleInput] = React.useState('');

    // TODO: Get values form API
    const userRoleOptions: QuestionOption[] = [
        {key: '663f55ecdc1f28997cddf155', value: 'Colaborador', order: 1},
        {key: '663f55ad234cf67246ef16e6', value: 'Propietario', order: 2},
    ]

    const handleOpenShareDialog = (form: Data) => {
        setFormUserRoles(form.formsRoles);
        setFormToShare(form);
        setOpenShareDialog(true);
    }

    const handleCloseShareDialog = () => {
        setOpenShareDialog(false);
        setFormUserRoles([]);
        setFormToShare({} as Data);
    };

    const handleDeletePermission = async (userEmail: string) => {
        try {
            setLoading(true);

            const response = await sendDeleteUserPermissions(userEmail);

            if (response.errors) {
                throw new Error(
                    'Error al eliminar permisos al formulario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Permisos de usuario eliminados correctamente.', { variant: 'success' });

            // Recargar los formularios
            await getForms().then((data) => {
                setRows(data);
                setFormUserRoles(data.find((form: Data) => form.id === formToShare.id)?.formsRoles ?? []);
                enqueueSnackbar('Listado de formularios actualizado.', { variant: 'success' });
            });
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', { variant: 'error' });
        } finally {
            // disable loading screen
            setLoading(false);
        }
    }

    const handleAddPermissionEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddPermissionEmailInput(e.target.value);
    }

    const handleAddPermissionRoleInput = (e: SelectChangeEvent<unknown>) => {
        setAddPermissionRoleInput(e.target.value as string);
    }

    const handleAddUserPermissions = async () => {
        if (validationAddUserPermissions()) {
            return;
        }

        try {
            setLoading(true);

            const response = await sendAddUserPermissions();

            if (response.errors) {
                throw new Error(
                    'Error al agregar permisos al formulario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Permisos de usuario agregados correctamente.', { variant: 'success' });

            // Recargar los formularios
            await getForms().then((data) => {
                setRows(data);
                setFormUserRoles(data.find((form: Data) => form.id === formToShare.id)?.formsRoles ?? []);
                enqueueSnackbar('Listado de formularios actualizado.', { variant: 'success' });
            });

            setAddPermissionEmailInput('');
            setAddPermissionRoleInput('');
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', { variant: 'error' });
        } finally {
            // disable loading screen
            setLoading(false);
        }
    }

    const validationAddUserPermissions = () => {
        let hasErrors: boolean = false;

        setAddPermissionEmailInputError(false);
        setAddPermissionRoleInputError(false);

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addPermissionEmailInput)) { // NOSONAR
            setAddPermissionEmailInputError(true);
            hasErrors = true;
        }

        if (!addPermissionRoleInput) {
            setAddPermissionRoleInputError(true);
            hasErrors = true;
        }
        return hasErrors;
    }

    const sendAddUserPermissions = async () => {
        const response = await fetch(`/api/forms/${formToShare.id}/permissions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: addPermissionEmailInput,
                roleId: addPermissionRoleInput,
            }),
        });

        return await response.json();
    }

    const sendDeleteUserPermissions = async (email: string) => {
        const response = await fetch(`/api/forms/${formToShare.id}/permissions/remove`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });

        return await response.json();
    }

    const isAdminUser = session?.user?.isAdmin ?? false;

    return (
        <>
            <LoadingBackdrop open={loading} />
            <Box sx={{width: '100%'}}>
                <Paper sx={{width: '100%', mb: 2}}>
                    <EnhancedTableToolbar/>
                    <TableContainer>
                        <Table
                            stickyHeader
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {/* @ts-ignore */}
                                {rows.length > 0 && visibleRows.map((row: Data) => {
                                    const isItemSelected: boolean = isSelected(row.id);
                                    const labelId: string = `enhanced-table-checkbox-${row.id}`;

                                    return (
                                        <TableRow
                                            hover
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{cursor: 'pointer'}}
                                        >
                                            <StyledTableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                align="left"
                                            >
                                                {parseDate(row.createdAt)}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {row.title}
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Button
                                                    href={`/formularios/${row.slug}`}
                                                    target="_blank"
                                                    component={Link}
                                                    sx={{display: 'flex', justifyContent: 'flex-start'}}
                                                >
                                                    <OpenInNewIcon/>
                                                    {row.slug}
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center">{row.isPublished ? 'Sí' : 'No'}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Chip
                                                    label={row?._count?.formSubmission ?? 0}
                                                    variant="outlined"
                                                    title={`Total inscripciones del formulario ${row.title}`}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Chip
                                                    label={row?._count?.formsRoles ?? 0}
                                                    variant="outlined"
                                                    title={`Total permisos del formulario ${row.title}`}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Chip
                                                    label={row?._count?.questions ?? 0}
                                                    variant="outlined"
                                                    title={`Total preguntas del formulario ${row.title}`}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                            >
                                                <ButtonGroup size="small">
                                                    {(isAdminUser || row.formsRoles.some((formRole: FormRole) =>
                                                        formRole.user.id === userId && formRole.role.type === roleTypeOwner)) && (
                                                        <Button
                                                            onClick={() => handleOpenShareDialog(row)}
                                                            variant="contained"
                                                            color="warning"
                                                            title={`Compartir formulario ${row.title}`}
                                                        >
                                                            <FolderSharedIcon/>
                                                        </Button>
                                                    )}
                                                    <Button
                                                        onClick={() => handleExportFormSubmissions(row)}
                                                        variant="contained"
                                                        color="info"
                                                        title={`Exportar inscripciones formulario ${row.title}`}
                                                    >
                                                        <FeedIcon/>
                                                    </Button>
                                                    {(isAdminUser || row.formsRoles.some((formRole: {
                                                        user: { id: string; };
                                                        role: { type: string; };
                                                    }) =>
                                                        formRole.user.id === userId && formRole.role.type === roleTypeOwner)) && (
                                                        isAdminUser && row.deletedAt) && (
                                                        <Button
                                                            onClick={() => handleOpenRestoreDialog(row)}
                                                            variant="contained"
                                                            color="success"
                                                            title={`Restaurar formulario ${row.title}`}
                                                        >
                                                            <RestoreIcon/>
                                                        </Button>
                                                    ) || (
                                                        <Button
                                                            onClick={() => handleOpenDeleteDialog(row)}
                                                            variant="contained"
                                                            color="error"
                                                            title={`Eliminar formulario ${row.title}`}
                                                        >
                                                            <DeleteIcon/>
                                                        </Button>
                                                    )}
                                                </ButtonGroup>
                                            </StyledTableCell>
                                        </TableRow>
                                    );
                                }) || loadingGetData && (
                                    [...Array(defaultSkeletonRows)].map(() => (
                                        <StyledTableRow key={uuid.v4().toString()}>
                                            <StyledTableCell component="th" scope="row">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rounded"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rounded"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rounded"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rounded"/>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    ))
                                )}
                                {!loadingGetData && rows.length === 0  && (
                                    <StyledTableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <StyledTableCell colSpan={8}>
                                            Todavía no tienes formularios dados de alta
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, {value: -1, label: 'Todos'}]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        labelRowsPerPage='Filas por página'
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <Dialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-delete-title"
                    aria-describedby="alert-dialog-delete-description"
                >
                    <DialogTitle id="alert-dialog-delete-title">
                        {"¿Usted está seguro de eliminar el formulario?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-delete-description">
                            El formulario <strong>&quot;{deleteFormItem.title ?? ''}&quot;</strong> será eliminado.
                            <br/>
                            Una vez eliminado el formulario no se podrá recuperar.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} variant="contained" color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmDeleteDialog} variant="contained" autoFocus>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openRestoreDialog}
                    onClose={handleCloseRestoreDialog}
                    aria-labelledby="alert-dialog-restore-title"
                    aria-describedby="alert-dialog-restore-description"
                >
                    <DialogTitle id="alert-dialog-restore-title">
                        {"¿Usted está seguro de restaurar el formulario?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-restore-description">
                            El formulario <strong>&quot;{restoreFormItem.title ?? ''}&quot;</strong> será restaurado.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRestoreDialog} variant="contained" color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmRestoreDialog} variant="contained" autoFocus>
                            Restaurar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openShareDialog}
                    onClose={handleCloseShareDialog}
                    aria-labelledby="alert-dialog-share-title"
                    aria-describedby="alert-dialog-share-description"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-share-title">
                        {"Agregar usuarios al formulario"}
                    </DialogTitle>
                    <DialogContent>
                        <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2 }} sx={{pt: 1}}>
                            <Grid item xs={12}>
                                <InputTextField
                                    type="email"
                                    label="Email"
                                    placeholder="Introducir correo eléctornico del usuario a agregar"
                                    size="small"
                                    required={true}
                                    hasError={addPermissionEmailInputError}
                                    onChange={handleAddPermissionEmailInput}
                                    value={addPermissionEmailInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <InputSelectField
                                    id="roleId"
                                    label="Permiso"
                                    options={userRoleOptions}
                                    size="small"
                                    required={true}
                                    hasError={addPermissionRoleInputError}
                                    onChange={handleAddPermissionRoleInput}
                                    value={addPermissionRoleInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleAddUserPermissions}
                                >
                                    <PersonAddIcon sx={{pr: 1}} /> Agregar
                                </Button>
                            </Grid>
                        </Grid>

                        <p>Listado de usuarios con permisos:</p>
                        <List>
                            {formUserRoles?.map((formUserRole: FormRole, index: number) => (
                                <Grid
                                    key={uuid.v4().toString()}
                                    container
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    sx={{pb: 1}}
                                >
                                    <Grid item xs={8}>
                                        {`${index + 1}.- ${formUserRole.user.email}`}
                                    </Grid>
                                    <Grid item xs={3} display="flex" justifyContent="center">
                                        <Chip label={formUserRole.role.name} variant="outlined" />
                                    </Grid>
                                    <Grid item xs={1} display="flex" justifyContent="flex-end">
                                        {session?.user?.id !== formUserRole.user.id
                                            && formUserRole.role.name !== roleTypeOwner
                                            && (
                                                <ButtonGroup>
                                                    <Button
                                                        onClick={() => handleDeletePermission(formUserRole.user.email)}
                                                        color="error"
                                                        variant="text"
                                                        size="small"

                                                    >
                                                        <DeleteIcon color="error"  />
                                                    </Button>
                                                </ButtonGroup>
                                            )}
                                    </Grid>
                                </Grid>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseShareDialog} variant="contained" color="secondary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
