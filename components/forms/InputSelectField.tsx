"use client";

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import React, {useState} from "react";
import uuid from "react-native-uuid";

export interface SelectOption {
    key: string;
    value: string;
}

interface Props {
    id?: string
    label: string;
    placeholder: string;
    hasError: boolean;
    options: SelectOption[];
    helperText?: string | null;
}

const defaultProps: Props = {
    id: uuid.v4().toString(),
    label: '',
    placeholder: '',
    hasError: false,
    options: [],
}

export default function InputSelectField(
    propsIn: Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        value: '',
        error: false,
    });

    const handleFieldChange = (e: SelectChangeEvent) => {
        setInputState({
            ...inputState,
            value: e.target.value
        });
    }

    return (
        <FormControl
            sx={{mb: 1}}
            error={props.hasError}
            fullWidth
        >
            <InputLabel id={props.id}>{props.label}</InputLabel>
            <Select
                labelId={props.id}
                aria-labelledby={props.id}
                id={props.id}
                value={inputState.value}
                label={props.label}
                onChange={handleFieldChange}
            >
                {props.options.map((item: SelectOption) => (
                    <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
