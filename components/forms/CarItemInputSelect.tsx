"use client";

import InputTextField from "@/components/forms/InputTextField";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    TextField
} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';
import SelectOption from "@/components/forms/interfaces/select-option.interface";
import uuid from "react-native-uuid";

export default function CardItemInputSelect(
    propsIn: Readonly<{
        question: {
            id: string;
            title: string;
            placeholder: string;
            isRequired: boolean;
            hasError?: boolean;
        }
    }>
): React.JSX.Element {

    const defaultTitle: string = "Indicar el título de la pregunta";
    const defaultPlaceholder: string = "Texto opcional del placeholder...";

    const [title, setTitle]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.title || '');
    const [placeholder, setPlaceholder]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.placeholder || '');

    const [options, setOptions]: [SelectOption[], (value: (((prevState: SelectOption[]) => SelectOption[]) | SelectOption[])) => void] = React.useState([
        {key: uuid.v4().toString(), value: ''},
    ]);

    const handleClickOptionInputText = (index: number): void => {
        console.log('click: ' + index);
        if (index === options.length - 1) {
            setOptions([
                ...options,
                {key: uuid.v4().toString(), value: ''}
            ]);
        }
    }

    const handleClickOptionDelete = (index: number): void => {
        if (options.length > 1) {
            setOptions(options.filter((option: SelectOption, i: number) => i !== index));
        }
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, optionKey: string) => {
        // controlar que value sea único
        const hasError: boolean = options.some((option: SelectOption) => option.key !== optionKey && option.value === e.target.value);

        setOptions(options.map((option: SelectOption) => {
            if (option.key === optionKey) {
                return {
                    ...option,
                    value: e.target.value,
                    hasError
                }
            }
            return option;
        }));
    }

    return (
        <>
            <InputTextField
                label={title.length > 0 ? title : defaultTitle}
                value={title}
                placeholder={placeholder.length > 0 ? placeholder : defaultPlaceholder}
                onChange={(e) => setTitle(e.target.value)}
                required={propsIn?.question?.isRequired || false}
                sx={{mb: 4}}
            />
            <InputTextField
                label="Texto opcional del placeholder"
                value={placeholder}
                placeholder={defaultPlaceholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                size="small"
            />
            <h3>Agregar opciones para la lista desplegable</h3>
            <List sx={{width: '100%'}}>
                {options.map((option: SelectOption, index: number) => {
                    const labelId: string = `checkbox-list-label-${option.key}`;

                    return (
                        <ListItem
                            key={option.key}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="Eliminar entrada"
                                    onClick={() => handleClickOptionDelete(index)}

                                >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemText id={labelId} primary={`${index + 1}`} sx={{mr: 1}}/>

                                <TextField
                                    error={option.hasError}
                                    hiddenLabel
                                    variant="filled"
                                    value={option.value}
                                    fullWidth
                                    placeholder="Añadir opción"
                                    size="small"
                                    onClick={() => handleClickOptionInputText(index)}
                                    onChange={(e) => handleFieldChange(e, option.key)}

                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}
