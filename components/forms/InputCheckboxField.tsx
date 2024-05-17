"use client";

import {Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel} from "@mui/material";
import React, {useEffect, useState} from "react";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import {InputProps as StandardInputProps} from "@mui/material/Input/Input";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import uuid from "react-native-uuid";

interface Props extends Partial<PropsCommon> {
    id: string,
    values?: string[],
    options: QuestionOption[],
    onChange?: StandardInputProps['onChange'],
    onChangeValues?: (e: React.ChangeEvent<HTMLInputElement>, values: string[]) => void
}

const defaultProps: Props = {
    ...defaultCommonProps,
    id: uuid.v4().toString(),
    values: [],
    options: [],
}

export default function InputCheckboxField(
    propsIn: Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        values: [] as string[],
        error: false,
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let values: string[];
        if (e.target.checked) {
            values = [...inputState.values, (e.target.value as string)];
        } else {
            values = inputState.values.filter((value) => value !== e.target.value) as string[];
        }

        setInputState({
            ...inputState,
            values: values,
        });


        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e);
        }

        if (typeof propsIn.onChangeValues === 'function') {
            propsIn.onChangeValues(e, values);
        }
    }

    return (
        <FormControl
            sx={{m: 1}}
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
