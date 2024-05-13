"use client";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import React, {useState} from "react";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import uuid from "react-native-uuid";

interface Props extends Partial<PropsCommon> {
    id: string;
    value?: boolean;
    options: QuestionOption[];
    onChange?: StandardInputProps['onChange'];
}

const defaultProps: Props = {
    ...defaultCommonProps,
    id: uuid.v4().toString(),
    value: false,
    options: [],
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

        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e);
        }
    }

    return (
        <FormControl
            sx={{ m: 1 }}
            component="fieldset"
            variant="standard"
            fullWidth
            error={props.hasError}
            required={props.required}
            disabled={props.disabled}
        >
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup>
                {props.options.map((item: QuestionOption) => (
                    <FormControlLabel
                        key={item.key}
                        control={
                            <Checkbox
                                value={item.key}
                                inputProps={
                                    {readOnly: props.readonly,}
                                }
                                onChange={handleFieldChange}
                            />
                        }
                        label={item.value}
                        disabled={item.disabled}
                    />

                ))}


            </FormGroup>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
