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
import SelectOption from "@/components/forms/interfaces/select-option.interface";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import RadioOption from "@/components/forms/interfaces/radio-option.interface";
import {SelectProps as StandardSelectProps} from "@mui/material/Select/Select";

interface Props extends Partial<PropsCommon> {
    id: string;
    value?: string;
    options: RadioOption[];
    onChange?: StandardSelectProps['onChange'];
}

const defaultProps: Props = {
    ...defaultCommonProps,
    id: uuid.v4().toString(),
    value: '',
    options: [],
}

export default function InputSelectField(
    propsIn: Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        value: props.value,
        error: false,
    });

    const handleFieldChange = (e: SelectChangeEvent) => {
        setInputState({
            ...inputState,
            value: e.target.value
        });

        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e, e.target.value);
        }
    }

    return (
        <FormControl
            sx={{mb: 1}}
            error={props.hasError}
            fullWidth
            required={props.required}
            disabled={props.disabled}
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
                    <MenuItem
                        key={item.key}
                        value={item.key}
                        disabled={item.disabled}
                    >{item.value}</MenuItem>
                ))}
            </Select>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
