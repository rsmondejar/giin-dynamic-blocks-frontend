import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import QuestionType from "@/components/forms/enums/question-type-enum";

export default interface Question {
    id: string;
    title: string;
    placeholder?: string | null;
    isRequired: boolean;
    type: QuestionType;
    order: number;
    hasError: boolean;
    options?: QuestionOption[] | null;
}
