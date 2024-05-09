"use client";

import {
    Button,
    ButtonGroup,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem, Select,
    SelectChangeEvent, Slide,
    Switch
} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CardItemInputText from "@/components/forms/CarItemInputText";
import CardItemInputSelect from "@/components/forms/CarItemInputSelect";
import Item from "@/components/Item";
import CardItemInputCheckbox from "@/components/forms/CarItemInputCheckbox";
import CardItemInputRadio from "@/components/forms/CarItemInputRadio";
import Question from "@/components/forms/interfaces/question.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";

export default function CardItemInput(
    propsIn: Readonly<{
        question: Question,
        handleDeleteQuestion: (id: string) => void;
    }>
): React.JSX.Element {
    const inputsTypesAvailable = [
        {key: QuestionType.InputText, value: 'Texto Simple'},
        {key: QuestionType.InputTextarea, value: 'Texto Multilinea'},
        {key: QuestionType.InputNumeric, value: 'Número'},
        {key: QuestionType.InputDate, value: 'Fecha'},
        {key: QuestionType.InputSelect, value: 'Lista desplegable'},
        {key: QuestionType.InputRadio, value: 'Lista opciones'},
        {key: QuestionType.InputCheckbox, value: 'Checkbox'},
    ];

    const [inputType, setInputType] = React.useState(propsIn.question.type || QuestionType.InputText);
    const [isRequired, setIsRequired]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = React.useState(propsIn?.question?.isRequired || false);

    const renderSwitch = (param: string) => {
        switch (param) {
            case QuestionType.InputSelect:
                return <CardItemInputSelect question={propsIn.question}/>
            case QuestionType.InputRadio:
                return <CardItemInputRadio question={propsIn.question} />
            case QuestionType.InputCheckbox:
                return <CardItemInputCheckbox question={propsIn.question} />
            default:
                return <CardItemInputText question={propsIn.question}/>
        }
    }

    const handleInputTypeChange = (e: SelectChangeEvent<string>) => {
        setInputType(e.target.value as QuestionType)
        propsIn.question.type = e.target.value as QuestionType;
    }

    const handleIsRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRequired(e.target.checked);
        propsIn.question.isRequired = e.target.checked;
    }

    return (
        <Slide direction="up" in={true}>
            <Item>
                <Grid container direction="row" justifyContent="flex-end" mb={1}>
                    <Grid item>
                        <FormControl sx={{ mb: 1, minWidth: 300 }} size="small">
                            <InputLabel id="demo-simple-select-label">Seleccionar tipo de pregunta</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={inputType}
                                label="Seleccionar tipo de pregunta"
                                onChange={(e) => handleInputTypeChange(e)}
                                autoWidth
                            >
                                {inputsTypesAvailable.map(({key, value}) => (
                                    <MenuItem key={key} value={key}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {renderSwitch(inputType)}

                <Grid container direction="row" justifyContent="space-between">
                    <Grid item>
                        <FormGroup>
                            <FormControlLabel
                                control={<Switch
                                    checked={isRequired}
                                    onChange={(e) => handleIsRequiredChange(e)}
                                    size="small"
                                />}
                                label="Obligatorio"
                                labelPlacement="start"
                            />
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        <ButtonGroup size="small">
                            <Button
                                variant="text"
                                size="small"
                                aria-label="delete"
                                color="error"
                                onClick={() => propsIn.handleDeleteQuestion(propsIn.question.id)}
                            >
                                <DeleteIcon fontSize="small"/>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                {propsIn.question.id}
            </Item>
        </Slide>
    )
}
