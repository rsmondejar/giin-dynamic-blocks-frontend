import QuestionUserView from "@/components/forms/interfaces/question-user-view.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";
import InputSelectField from "@/components/forms/InputSelectField";
import InputRadioField from "@/components/forms/InputRadioField";
import InputCheckboxField from "@/components/forms/InputCheckboxField";
import InputTextField from "@/components/forms/InputTextField";
import React, {useEffect} from "react";
import {SelectChangeEvent} from "@mui/material";
import QuestionAnswerOption from "@/components/forms/interfaces/question-answer-option.interface";

export default function CardItemInputUserView(propsIn: Readonly<{ question: QuestionUserView }>): React.JSX.Element {
    const [question, setQuestion]: [QuestionUserView, (value: (((prevState: QuestionUserView) => QuestionUserView) | QuestionUserView)) => void] = React.useState(propsIn.question);

    useEffect(() => {
        setQuestion(propsIn.question);
    }, [propsIn]);

    const handleSelectFieldChange = (e: SelectChangeEvent<unknown>, values: QuestionAnswerOption[]) => {
        propsIn.question.value = e.target.value as string ?? '';
        propsIn.question.values = values;
    }

    const handleRadioFieldChange = (e: React.ChangeEvent<HTMLInputElement>, values: QuestionAnswerOption[]) => {
        propsIn.question.value = e.target.value as string ?? '';
        propsIn.question.values = values;
    }

    const handleInputTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        propsIn.question.value = e.target.value;
    }

    const handleCheckboxFieldChange = (e: React.ChangeEvent<HTMLInputElement>, values: QuestionAnswerOption[]) => {
        propsIn.question.values = values;
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
                    hasError={question?.hasError || false}
                    required={question.isRequired}
                    values={question.values ?? []}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChangeValues={handleSelectFieldChange}
                />
            case QuestionType.InputRadio:
                return <InputRadioField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question?.hasError || false}
                    required={question.isRequired}
                    values={question.values ?? []}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChangeValues={handleRadioFieldChange}
                />
            case QuestionType.InputCheckbox:
                return <InputCheckboxField
                    id={question.id}
                    label={`${question.title}`}
                    placeholder={question.placeholder ?? ''}
                    hasError={question?.hasError || false}
                    required={question.isRequired}
                    values={question.values ?? []}
                    options={question.options ?? []}
                    helperText={question.placeholder ?? ''}
                    onChangeValues={handleCheckboxFieldChange}
                />
            default:
                return <InputTextField
                    id={question.id}
                    label={question.title}
                    placeholder={question.placeholder ?? ''}
                    hasError={question?.hasError || false}
                    required={question.isRequired}
                    value={question.value as string ?? ''}
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
