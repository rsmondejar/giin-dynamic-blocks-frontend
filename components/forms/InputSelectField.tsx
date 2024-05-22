"use client";

import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import React, {useEffect, useState} from "react";
import uuid from "react-native-uuid";
import PropsCommon from "@/components/forms/interfaces/props-common.interface";
import defaultCommonProps from "@/components/forms/entities/default-common-props.entity";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import {SelectProps as StandardSelectProps} from "@mui/material/Select/Select";
import QuestionAnswerOption from "@/components/forms/interfaces/question-answer-option.interface";

interface Props extends Partial<PropsCommon> {
    id: string;
    options: QuestionOption[];
    value?: string;
    values?: QuestionAnswerOption[];
    onChange?: StandardSelectProps['onChange'];
    onChangeValues?: (e: SelectChangeEvent, values: QuestionAnswerOption[]) => void
}

const defaultProps: Props = {
    ...defaultCommonProps,
    id: uuid.v4().toString(),
    value: '',
    values: [],
    options: [],
}

export default function InputSelectField(
    propsIn: Readonly<Props>
) {
    const props = {...defaultProps, ...propsIn};

    const [inputState, setInputState] = useState({
        value: props.value,
        values: [] as QuestionAnswerOption[],
        error: false,
    });

    useEffect(() => {
        setInputState({
            ...inputState,
            value: props.value,
            values: props.values as QuestionAnswerOption[],
        });
    }, [props.value, props.values]);

    const handleFieldChange = (e: SelectChangeEvent) => {
        const option = props.options.find((item: QuestionOption) => item.key === e.target.value);
        let values: QuestionAnswerOption[] = [{
            key: option?.key ?? '',
            value: option?.value ?? '',
        }];

        setInputState({
            ...inputState,
            value: e.target.value,
            values: values,
        });

        if (typeof propsIn.onChange === 'function') {
            propsIn.onChange(e, e.target.value);
        }

        if (typeof propsIn.onChangeValues === 'function') {
            propsIn.onChangeValues(e, values);
        }
    }

    return (
        <FormControl
            sx={{mb: 1}}
            error={props.hasError}
            fullWidth
            required={props.required}
            disabled={props.disabled}
            size={props.size}
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
                {props.options.map((item: QuestionOption) => (
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
