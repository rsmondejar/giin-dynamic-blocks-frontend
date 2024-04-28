"use client";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import React, {useState} from "react";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";

interface Props extends Partial<PropsCommon> {
    value?: boolean;
}

const defaultProps: Props = {
    ...defaultCommonProps,
    value: false,
}

export default function InputCheckboxField(
    propsIn : Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        // value: props.value,
        value: false,
        error: false,
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            value: e.target.value === 'on'
        });
    }

    return (
        <FormControl
            sx={{ m: 1 }}
            component="fieldset"
            variant="standard"
            fullWidth
            error={props.hasError}
        >
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            value={inputState.value}
                            // checked={inputState.value}
                            onChange={handleFieldChange}
                        />
                    }
                    label={props.label}
                    required={props.required}
                    disabled={props.disabled}
                />
            </FormGroup>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
