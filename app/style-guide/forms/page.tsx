"use client";

import InputTextField from "@/components/forms/InputTextField";
import InputRadioField from "@/components/forms/InputRadioField";
import InputSelectField from "@/components/forms/InputSelectField";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import InputCheckboxField from "@/components/forms/InputCheckboxField";
import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import Item from "@/components/Item";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import React from "react";

export default function StyleGuideFormsPage() {

    const options: QuestionOption[] = [
        {key: 'key-1', value: 'Option 1', order: 1},
        {key: 'key-2', value: 'Option 2 disabled', order: 2, disabled: true},
        {key: 'key-3', value: 'Option 3', order: 3},
    ]

    return (
        <Container maxWidth="lg">
            <Container maxWidth="md">
                <Grid alignItems='center' justifyContent='center'>
                    <Grid item>
                        <h1>Guía de estilos de formularios</h1>
                        <Box sx={{width: '100%'}}>
                            <Stack spacing={3}>
                                <Item>
                                    <InputTextField
                                        label="Input type text"
                                        placeholder="Esto es el placeholder"
                                        helperText="Texto de ayuda"
                                        hasError={false}
                                        readonly={false}
                                        disabled={false}
                                        required={false}
                                        value=""
                                    />
                                </Item>
                                <Item>
                                    <InputTextField
                                        label="Input type password"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        type="password"
                                    />
                                </Item>
                                <Item>
                                    <InputTextField
                                        label="Input type numeric"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        type="number"
                                    />
                                </Item>
                                <Item>
                                    <InputTextField
                                        label="Input type date"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        value={new Date().toISOString().split('T')[0]}
                                        type="date"
                                    />
                                </Item>
                                <Item>
                                    <InputTextField
                                        label="Input type textarea multiline 4 rows"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        type="multiline"
                                        rows={4}
                                    />
                                </Item>
                                <Item>
                                    <InputRadioField
                                        id="id_input_ramdon_01"
                                        label="Input type radio column format"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        options={options}
                                    />
                                </Item>
                                <Item>
                                    <InputRadioField
                                        id="id_input_ramdon_02"
                                        label="Input type radio row format"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        row={true}
                                        options={options}
                                    />
                                </Item>
                                <Item>
                                    <InputSelectField
                                        id="id_select_ramdon_01"
                                        label="Input type select"
                                        placeholder="Esto es el placeholder"
                                        hasError={false}
                                        options={options}
                                        disabled={false}
                                        required={false}
                                        // value="key-3"
                                    />
                                </Item>
                                <Item>
                                    <InputCheckboxField
                                        label="Input type Checbox simple"
                                        placeholder="Esto es el placeholder"
                                        helperText="This is the helper text"
                                        hasError={false}
                                        disabled={false}
                                        required={false}
                                        // value={false}
                                    />
                                </Item>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
