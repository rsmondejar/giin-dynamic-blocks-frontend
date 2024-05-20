import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";
import QuestionAnswerOption from "@/components/forms/interfaces/question-answer-option.interface";

export default interface QuestionUserView {
    id: string;
    title: string;
    placeholder?: string | null;
    isRequired: boolean;
    type: QuestionType;
    order: number;
    value?: string|QuestionAnswerOption|null;
    values?: QuestionAnswerOption[]|null;
    hasError: boolean;
    options?: QuestionOption[] | null;
}
