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
    SelectChangeEvent,
    Switch
} from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CardItemInputText from "@/components/forms/CarItemInputText";
import CardItemInputSelect from "@/components/forms/CarItemInputSelect";
import Item from "@/components/Item";

export default function CardItemInput(
    propsIn: Readonly<{
        question: {
            id: string;
            title: string;
            placeholder: string;
            isRequired: boolean;
            type: string;
            hasError?: boolean;
        }
    }>
): React.JSX.Element {
    const inputsTypesAvailable = [
        {key: 'input_text', value: 'Texto Simple'},
        {key: 'input_textarea', value: 'Texto Multilinea'},
        {key: 'input_select', value: 'Lista desplegable'},
    ];

    const [inputType, setInputType]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn.question.type || 'input_text');
    const [isRequired, setIsRequired]: [boolean, (value: (((prevState: boolean) => boolean) | boolean)) => void] = React.useState(propsIn?.question?.isRequired || false);

    const renderSwitch = (param: string) => {
        switch (param) {
            case 'input_select':
                return <CardItemInputSelect question={propsIn.question}/>
            case 'input_radio':
                return (<p>TODO: Input radio</p>)
            case 'input_checkbox':
                return (<p>TODO: Input checkbox</p>)
            default:
                return <CardItemInputText question={propsIn.question}/>;
        }
    }

    const handleInputTypeChange = (e: SelectChangeEvent<string>) => {
        setInputType(e.target.value)
    }

    return (
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
                                onChange={(e) => setIsRequired(e.target.checked)}
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
                            onClick={() => console.log('delete: ' + propsIn.question.id)}
                        >
                            <DeleteIcon fontSize="small"/>
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            {propsIn.question.id}
        </Item>
    )
}
