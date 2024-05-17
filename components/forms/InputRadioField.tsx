"use client";

import {FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup} from "@mui/material";
import React, {useState} from "react";
import uuid from "react-native-uuid";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import {SelectProps as StandardSelectProps} from "@mui/material/Select/Select";

interface Props extends Partial<PropsCommon> {
    id: string;
    options: QuestionOption[];
    row?: boolean;
    onChange?: StandardSelectProps['onChange'];
}

const defaultProps: Props = {
    ...defaultCommonProps,
    id: uuid.v4().toString(),
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

        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e, e.target.value);
        }
    }

    return (
        <FormControl
            sx={{mb: 1}}
            error={props.hasError}
            onChange={handleFieldChange}
            fullWidth
            required={props.required}
            disabled={props.disabled}
        >
            <FormLabel id={props.id}>{props.label}</FormLabel>
            <RadioGroup
                row={props.row}
                aria-labelledby={props.id}
                name="radio-buttons-group"
            >
                {props.options.map((item: QuestionOption) => (
                    <FormControlLabel
                        key={item.key}
                        value={item.key}
                        control={<Radio />}
                        label={item.value}
                        disabled={item.disabled}
                    />
                ))}

            </RadioGroup>
            <FormHelperText>{props.helperText}</FormHelperText>
        </FormControl>
    );
}
