"use client";

import {TextField} from "@mui/material";
import React, {useState} from "react";

interface Props {
    label: string;
    placeholder: string;
    hasError: boolean;
    type?: string;
    helperText?: string|null;
    rows?: number;
}

const defaultProps: Props = {
    label: '',
    placeholder: '',
    hasError: false,
    type: 'text',
    rows: 4,
}

export default function InputTextField(
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
        <TextField
            error={props.hasError}
            type={props.type}
            sx={{mb: 1}}
            onChange={handleFieldChange}
            value={inputState.value}
            fullWidth
            label={props.label}
            placeholder={props.placeholder}
            helperText={props.helperText}
            rows={props.rows}
            multiline={props.type === 'multiline'}
        />
    );
}
