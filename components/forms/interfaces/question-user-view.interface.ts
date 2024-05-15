import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";

export default interface QuestionUserView {
    id: string;
    title: string;
    placeholder?: string | null;
    isRequired: boolean;
    type: QuestionType;
    order: number;
    value?: string|boolean|null;
    values?: string[]|boolean[]|null;
    hasError?: boolean;
    options?: QuestionOption[] | null;
}
