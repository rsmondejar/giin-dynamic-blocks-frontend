"use client";

import React, {useEffect, useState} from "react";
import InputTextField from "@/components/forms/InputTextField";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import CardItemInput from "@/components/forms/CardItemInput";
import Container from "@mui/material/Container";
import FormCreateSpeedDial from "@/components/forms/FormCreateSpeedDial";
import Item from "@/components/Item";
import uuid from "react-native-uuid";
import {useSnackbar} from "notistack";
import Question from "@/components/forms/interfaces/question.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";
import {useSession} from "next-auth/react";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import FormCreate from "@/components/forms/interfaces/form-create.interface";
import {useRouter} from 'next/navigation'

export default function FormsCreatePage() {
    useSession({
        required: true,
    });

    const router = useRouter()
    const {enqueueSnackbar} = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState('');
    const [slug, setSlug] = useState('');
    const [hasErrorTitle, setHasErrorTitle] = useState(false);

    const addQuestion = (): Question => ({
        id: uuid.v4().toString(),
        title: 'Pregunta 1',
        placeholder: '',
        isRequired: false,
        type: QuestionType.InputText,
        order: 0,
        options: null,
        hasError: false,
    });

    const [questions, setQuestions] = useState([
        {
            ...addQuestion(),
            id: '',
        },
    ]);

    useEffect(() => {
        setQuestions([
            addQuestion(),
        ]);

        setId(uuid.v4().toString());
    }, []);

    useEffect(() => {
        questions.map((question, index) => {
            question.order = index + 1;
        })
    }, [questions])

    const generateSlug = () => {
        return `${slugify(title)}-${id}`;
    };

    const slugify = (str: string): string => {
        if (!str) {
            return '';
        }

        // make lower case and trim
        let slug = str.toLowerCase().trim();

        // remove accents from charaters
        slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // replace invalid chars with spaces
        slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim();

        // replace multiple spaces or hyphens with a single hyphen
        slug = slug.replace(/[\s-]+/g, '-');

        return slug;
    }


    const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setSlug(generateSlug());
        setHasErrorTitle(e.target.value.length === 0);
    }

    const handleFormDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                ...addQuestion(),
                title: 'Pregunta ' + (questions.length + 1),
                placeholder: '',
            },
        ]);
    }

    const handleDeleteQuestion = (id: string) => {
        setQuestions(questions.filter((question) => question.id !== id));
    }

    const [openSaveDialog, setOpenSaveDialog] = React.useState(false);

    const handleOpenSaveDialog = () => {
        setOpenSaveDialog(true);
    };

    const handleCloseSaveDialog = () => {
        setOpenSaveDialog(false);
    };

    const handleConfirmSaveDialog = async () => {
        setOpenSaveDialog(false);

        if (await formValidation()) {
            enqueueSnackbar("Revisar los errores del fomulario.", {variant: 'warning'});
            return;
        }

        const form: FormCreate = {
            title: title,
            slug: slug,
            description: description,
            questions: questions,
        }

        try {
            // enable loading screen
            setLoading(true);

            // send form to backend
            const response = await sendForm(form);


            if (response.errors) {
                throw new Error(
                    'Error al guardar el formulario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Formulario guardado correctamente.', {variant: 'success'});

            // redirect to forms list
            router.push('/dashboard');
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', {variant: 'error'});
        } finally {
            // disable loading screen
            setLoading(false);
        }
    }

    const formValidation = async () => {
        let formHasError: boolean = false;
        if (title.length === 0) {
            enqueueSnackbar("El campo 'titulo del formulario' no puede estar vacío.", {variant: 'error'});
            setHasErrorTitle(true);
            formHasError = true;
        }

        if (questions.length === 0) {
            enqueueSnackbar("Debe agregar al menos una pregunta.", {variant: 'error'});
            formHasError = true;
        }

        questions.map((question) => {
            question.hasError = false;
            if (question.title.length === 0) {
                enqueueSnackbar("La pregunta no puede estar vacía.", {variant: 'error'});
                question.hasError = true;
                formHasError = true;
            }
            if (question.type === QuestionType.InputSelect || question.type === QuestionType.InputRadio || question.type === QuestionType.InputCheckbox) {
                if (question.options === null || question.options?.length === 0) {
                    enqueueSnackbar("La pregunta '" + question.title + "' debe tener al menos una opción.", {variant: 'error'});
                    question.hasError = true;
                    formHasError = true;
                }
                question.options?.map((option) => {
                    option.hasError = false;
                    if (option.value.length === 0 && question.options?.length === 1) {
                        enqueueSnackbar("La opción de la pregunta '" + question.title + "' no puede estar vacía.", {variant: 'error'});
                        question.hasError = true;
                        option.hasError = true;
                        formHasError = true;
                    }
                });
            }
        });

        return formHasError;
    }

    const sendForm = async (form: FormCreate) => {
        const formCreateResponse = await fetch(`/api/forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        return await formCreateResponse.json()
    }

    return (
        <>
            <LoadingBackdrop open={loading}/>
            <Container maxWidth="lg" sx={{mb: 15}}>
                <Container maxWidth="md">
                    <Grid alignItems='center' justifyContent='center'>
                        <Grid item>
                            <h1>Crear nuevo formulario</h1>
                            <Item>
                                <InputTextField
                                    hasError={hasErrorTitle}
                                    value={title}
                                    required={true}
                                    label="Titulo del formulario"
                                    placeholder="Indicar el título del formulario..."
                                    onChange={handleFormTitleChange}
                                />
                                <InputTextField
                                    value={description}
                                    required={false}
                                    label="Descripción del formulario"
                                    placeholder="Indicar descripción del formulario..."
                                    onChange={handleFormDescriptionChange}
                                    type="multiline"
                                    rows={2}
                                />
                            </Item>

                            <h2>Preguntas:</h2>

                            {questions.length > 0 && (
                                <Box sx={{width: '100%'}}>
                                    <Stack spacing={3}>
                                        {questions.map((question) => (
                                            question.id.length > 0 && (
                                                <CardItemInput
                                                    key={question.id}
                                                    question={question}
                                                    handleDeleteQuestion={handleDeleteQuestion}
                                                />
                                            )
                                        ))}
                                    </Stack>
                                </Box>
                            ) || (
                                <Box sx={{width: '100%'}}>
                                    <Stack spacing={3}>
                                        <Item>
                                            <Grid container direction="row" justifyContent="flex-start" mb={1}>
                                                <Grid item>
                                                    <h3>Formulario sin preguntas</h3>
                                                </Grid>
                                            </Grid>
                                        </Item>
                                    </Stack>
                                </Box>
                            )}
                        </Grid>
                    </Grid>
                </Container>
                <Box sx={{position: 'fixed', bottom: 16, right: 16}}>
                    <FormCreateSpeedDial
                        handleAddQuestion={handleAddQuestion}
                        handleOpenSaveDialog={handleOpenSaveDialog}
                    />
                </Box>
                <Dialog
                    open={openSaveDialog}
                    onClose={handleCloseSaveDialog}
                    aria-labelledby="alert-dialog-save-title"
                    aria-describedby="alert-dialog-save-description"
                >
                    <DialogTitle id="alert-dialog-save-title">
                        {"¿Usted está seguro de guardar el formulario?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-save-description">
                            Una vez guardado el formulario no se podrá modificar.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseSaveDialog} variant="contained" color="secondary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmSaveDialog} variant="contained" autoFocus>
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </>
    );
}
