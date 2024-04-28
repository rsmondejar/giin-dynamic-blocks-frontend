"use client";

import {TextField} from "@mui/material";
import React, {useState} from "react";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";

interface Props extends Partial<PropsCommon> {
    type?: string;
    rows?: number;
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

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            value: e.target.value
        });
    }

    return (
        <TextField
            error={props.hasError}
            type={props.type}
            sx={{mb: 1}}
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
        />
    );
}
