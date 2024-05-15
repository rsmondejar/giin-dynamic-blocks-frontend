"use client";

import Container from "@mui/material/Container";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Skeleton
} from "@mui/material";
import React from "react";
import {FormBasicInfo} from "@/components/forms/interfaces/form-basic-info-interface";
import Header from "@/components/Header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import QuestionType from "@/components/forms/enums/question-type-enum";
import QuestionUserView from "@/components/forms/interfaces/question-user-view.interface";
import Item from "@/components/Item";
import Typography from "@mui/material/Typography";
import CardItemInputUserView from "@/components/forms/CardItemInputUserView";
import uuid from "react-native-uuid";

export default function FormUserView(
    propsIn: Readonly<{
        slug: string
    }>
) {
    const [slug]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn.slug);
    const [form, setForm] = React.useState({
        id: '',
        title: '',
        slug: '',
        description: '',
        questions: [],
    } as FormBasicInfo);

    const getFormBySlug = async (slug: string) => {
        const response = await fetch(`/api/forms/find-by-slug/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await response.json()
    }

    // Load data from API
    React.useEffect(() => {
        getFormBySlug(slug).then((data) => {
            setForm(data);
        });
    }, [slug]);

    const [openSubmitDialog, setOpenSubmitDialog] = React.useState(false);

    const handleOpenSubmitDialog = () => {
        // setOpenSubmitDialog(true); // TODO: comentado temporalemnte para las pruebas
        handleConfirmSubmitDialog(); // TODO: Borrar despues de terminar las pruebas
    };

    const handleCloseSubmitDialog = () => {
        setOpenSubmitDialog(false);
    };

    type FormToSend = {
        formId: string;
        answers: QuestionAnswer[];
    }

    type QuestionAnswer = {
        questionId: string;
        value?: string|boolean|null;
        values?: string[]|boolean[]|null;
    }

    const handleConfirmSubmitDialog = async () => {
        console.log('Formulario enviado');
        setOpenSubmitDialog(false);

        // TODO: Validations

        const formToSend: FormToSend = {
            formId: form.id,
            answers: form.questions.map((question: QuestionUserView) => {
                let answer: QuestionAnswer = {
                    questionId: question.id,
                };

                switch (question.type) {
                    case QuestionType.InputSelect:
                    case QuestionType.InputRadio:
                        answer.value = question.value ?? null;
                        break;
                    case QuestionType.InputCheckbox:
                        answer.values = question.values ?? null;
                        break;
                    default:
                        answer.value = question.value ?? null;
                        break;
                }

                return answer;
            }),
        }

        console.log('formToSendAnswers', formToSend.answers);

        // TODO: Send Form

        // TODO: Redirect to thanks page
    };

    return (
        <Container maxWidth="md">
            <Grid alignItems='center' justifyContent='center'>
                <Grid item>
                    {form && form.id.length > 0 && (
                        <>
                            <Header title={form.title} />
                            <Typography variant="body1" sx={{mb:3}}>{form.description}</Typography>
                            <Box sx={{width: '100%', mb: 3}}>
                                <Stack spacing={3}>
                                    {form.questions.map((question) => (
                                        <article key={question.id}>
                                            <Item>
                                                <CardItemInputUserView question={question} />
                                            </Item>
                                        </article>
                                    ))}
                                </Stack>
                            </Box>
                            <Grid container alignItems='center' justifyContent='right' sx={{mb:5}}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenSubmitDialog}
                                >
                                    Enviar formulario
                                </Button>
                            </Grid>
                        </>
                    ) || (
                        <>
                            <Header title="Cargando formulario..." />
                            <Skeleton variant="rectangular" width="100%" height={50} animation="wave" />

                            <Box sx={{width: '100%', mt: 2}}>
                                <Stack spacing={3}>
                                    {[...Array(4)].map(() => (
                                        <article key={uuid.v4().toString()}>
                                            <Item >
                                                <Skeleton variant="rectangular" width="100%" height={50} animation="wave" sx={{mb: 1}} />
                                                <Skeleton variant="rectangular" width="100%" height={20} animation="wave" />
                                            </Item>
                                        </article>
                                    ))}
                                    <Grid container alignItems='center' justifyContent='right' sx={{mb:5}}>
                                        <Skeleton variant="rectangular" width={200} height={50} animation="wave" />
                                    </Grid>
                                </Stack>
                            </Box>
                        </>
                    )}
                </Grid>
            </Grid>

            <Dialog
                open={openSubmitDialog}
                onClose={handleCloseSubmitDialog}
                aria-labelledby="alert-dialog-submit-title"
                aria-describedby="alert-dialog-submit-description"
            >
                <DialogTitle id="alert-dialog-submit-title">
                    {"¿Usted está seguro de enviar el formulario?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-submit-description">
                        Una vez enviado el formulario no se podrá modificar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSubmitDialog} variant="contained" color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmSubmitDialog} variant="contained" autoFocus>
                        Enviar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
