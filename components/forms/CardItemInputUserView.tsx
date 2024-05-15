import QuestionUserView from "@/components/forms/interfaces/question-user-view.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";
import InputSelectField from "@/components/forms/InputSelectField";
import InputRadioField from "@/components/forms/InputRadioField";
import InputCheckboxField from "@/components/forms/InputCheckboxField";
import InputTextField from "@/components/forms/InputTextField";
import React from "react";
import {SelectChangeEvent} from "@mui/material";

export default function CardItemInputUserView(propsIn: Readonly<{ question: QuestionUserView }>): React.JSX.Element {
    const [question]: [QuestionUserView, (value: (((prevState: QuestionUserView) => QuestionUserView) | QuestionUserView)) => void] = React.useState(propsIn.question);
    const [value, setValue] = React.useState(propsIn?.question?.value || '');

    const handleSelectFieldChange = (e: SelectChangeEvent<unknown>) => {
        setValue(e.target.value as string ?? '');
        propsIn.question.value = e.target.value as string ?? '';
    }

    const handleInputTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        propsIn.question.value = e.target.value;
    }

    const getInputType = (questionType: QuestionType) : string => {
        let type: string = 'text';
        switch (questionType) {
            case 'input_textarea': type = 'multiline'; break;
            case 'input_date': type = 'date'; break;
            case 'input_numeric': type = 'number'; break;
            case 'input_email': type = 'email'; break;
            case 'input_password': type = 'password'; break;
        }
        return type;
    }

    const renderSwitch = (question: QuestionUserView) => {
        switch (question.type) {
            case QuestionType.InputSelect:
                return <InputSelectField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question.hasError}
                    required={question.isRequired}
                    value={value as string ?? ''}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChange={handleSelectFieldChange}
                />
            case QuestionType.InputRadio:
                return <InputRadioField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question.hasError}
                    required={question.isRequired}
                    value={question.value ?? null}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChange={handleSelectFieldChange}
                />
            case QuestionType.InputCheckbox:
                return <InputCheckboxField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question.hasError}
                    required={question.isRequired}
                    value={question.value as boolean ?? false}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChange={handleInputTextFieldChange}
                />
            default:
                return <InputTextField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question.hasError}
                    required={question.isRequired}
                    value={question.value ?? ''}
                    helperText={question.placeholder ?? ''}
                    type={getInputType(question.type)}
                    onChange={handleInputTextFieldChange}
                />
        }
    }

    return (
        <>
            {renderSwitch(question)}
        </>
    )
}
