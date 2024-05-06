"use client";

import React, {useState} from "react";
import InputTextField from "@/components/forms/InputTextField";
import {Grid} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import CardItemInput from "@/components/forms/CardItemInput";
import Container from "@mui/material/Container";
import FormCreateSpeedDial from "@/components/forms/FormCreateSpeedDial";
import Item from "@/components/Item";

export default function FormsCreatePage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [questions] = useState([
        {
            id: '',
            title: 'Pregunta 1',
            placeholder: 'Pregunta 1...',
            isRequired: false,
            type: 'input_text',
        }
    ]);

    const handleFormTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleFormDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }

    return (
        <Container maxWidth="lg">
            <Container maxWidth="md">
                <Grid alignItems='center' justifyContent='center'>
                    <Grid item>
                        <h1>Crear nuevo formulario</h1>
                        <Item>
                            <InputTextField
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

                        <h2>Crear preguntas</h2>

                        <Box sx={{width: '100%'}}>
                            <Stack spacing={3}>
                                {questions.map((question) => (
                                    <CardItemInput key={question.id} question={question}/>
                                ))}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Box sx={{position: 'fixed', bottom: 16, right: 16}}>
                <FormCreateSpeedDial/>
            </Box>
        </Container>
    );
}
