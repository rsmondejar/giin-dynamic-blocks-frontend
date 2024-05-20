import QuestionAnswerOption from "@/components/forms/interfaces/question-answer-option.interface";

export default interface PropsCommon {
    label: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    hasError: boolean;
    id?: string|null;
    type?: string|null;
    value?: string|QuestionAnswerOption|null;
    placeholder?: string;
    helperText?: string|null;
    size?: 'small'|'medium';
    sx?: any;
}


