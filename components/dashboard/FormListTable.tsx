"use client";

import * as React from 'react';
import {alpha} from '@mui/material/styles';
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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {visuallyHidden} from '@mui/utils';
import moment from "moment/moment";
import Link from "next/link";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from "@mui/material/Button";
import {Chip, Skeleton} from "@mui/material";
import {styled} from '@mui/material/styles';


interface Data {
    id: string;
    title: string;
    slug: string;
    author: {
        id: string;
        name: string;
        lastName: string;
    };
    isPublished: boolean;
    createdAt: string;
    formsRoles: any; // TODO
    _count: {
        formSubmission: number;
        formsRoles: number;
    };
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
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
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
        id: 'author',
        numeric: false,
        disablePadding: false,
        label: 'Autor',
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
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Fecha creación',
        align: 'center',
    },
    {
        id: '_count',
        numeric: false,
        disablePadding: false,
        label: 'Total inscripciones',
        align: 'center',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'seleccionar formulario',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
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
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} seleccionados
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Formularios
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Eliminar">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Lista Filtrada">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function DataTable() {
    const [rows, setRows] = React.useState([] as Data[]);
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('title');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    // Load data from API
    React.useEffect(() => {
        getForms().then((data) => {
            setRows(data);
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

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected: string[] = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
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

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <TableContainer>
                    <Table
                        stickyHeader
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.length > 0 && (
                                <>
                                    {visibleRows.map((row: Data, index: number) => {
                                        const isItemSelected: boolean = isSelected(row.id);
                                        const labelId: string = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <StyledTableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={index}
                                                selected={isItemSelected}
                                                sx={{cursor: 'pointer'}}
                                            >
                                                <StyledTableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
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
                                                <StyledTableCell align="left">{row.author?.name ?? ''}</StyledTableCell>
                                                <StyledTableCell
                                                    align="center">{row.isPublished ? 'Sí' : 'No'}</StyledTableCell>
                                                <StyledTableCell
                                                    align="left">{parseDate(row.createdAt)}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Chip
                                                        label={row?._count?.formSubmission ?? 0}
                                                        variant="outlined"
                                                    />
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        );
                                    })}
                                </>
                            ) || (
                                [...Array(defaultSkeletonRows)].map((index) => (
                                    <>
                                        <StyledTableRow
                                            key={index}
                                            role="checkbox"
                                        >
                                            <StyledTableCell padding="checkbox">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                            >
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Skeleton variant="rectangular"/>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Skeleton variant="rounded"/>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </>
                                ))
                            )}
                            {emptyRows > 0 && (
                                <StyledTableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <StyledTableCell colSpan={6}/>
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
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Paper>
        </Box>
    );
}
