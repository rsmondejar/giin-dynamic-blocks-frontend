"use client";

import {TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";

interface Props extends Partial<PropsCommon> {
    type?: string;
    rows?: number;
    onChange?: StandardInputProps['onChange'];
}

const defaultProps: Props = {
    ...defaultCommonProps,
    type: 'text',
    rows: 4,
}

export default function InputTextField(
    propsIn : Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        value: props.value,
        error: false,
    });

    useEffect(() => {
        setInputState({
            ...inputState,
            value: props.value,
        });
    }, [props.value]);

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            value: e.target.value
        });

        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e);
        }
    }

    const inputLabelProps = props.type === 'date' ? { shrink: true } : {};

    return (
        <TextField
            error={props.hasError}
            type={props.type}
            sx={{mb: 2}}
            onChange={handleFieldChange}
            value={inputState.value}
            required={props.required}
            disabled={props.disabled}
            inputProps={
                {readOnly: props.readonly,}
            }
            fullWidth
            label={props.label}
            placeholder={props.placeholder}
            helperText={props.helperText}
            rows={props.rows}
            multiline={props.type === 'multiline'}
            size={props.size}
            InputLabelProps={ inputLabelProps }
        />
    );
}
