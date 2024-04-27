"use client";

import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";
import React, {useState} from "react";
import uuid from "react-native-uuid";

export interface RadioOption {
    key: string;
    value: string;
}
interface Props {
    id?: string
    label: string;
    placeholder: string;
    hasError: boolean;
    options: RadioOption[];
    helperText?: string|null;
    row?: boolean;
}

const defaultProps: Props = {
    id: uuid.v4().toString(),
    label: '',
    placeholder: '',
    hasError: false,
    options: [],
    row: false,
}

export default function InputRadioField(
    propsIn : Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        value: '',
        error: false,
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            value: e.target.value
        });
    }

    return (
        <FormControl
            sx={{mb: 1}}
            error={props.hasError}
            onChange={handleFieldChange}
            fullWidth
        >
            <FormLabel id={props.id}>{props.label}</FormLabel>
            <RadioGroup
                row={props.row}
                aria-labelledby={props.id}
                defaultValue="female"
                name="radio-buttons-group"
            >
                {props.options.map((item: RadioOption) => (
                    <FormControlLabel
                        key={item.key}
                        value={item.key}
                        control={<Radio />}
                        label={item.value}
                    />
                ))}

            </RadioGroup>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
