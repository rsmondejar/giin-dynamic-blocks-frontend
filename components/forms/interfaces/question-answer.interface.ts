import QuestionAnswerOption from "@/components/forms/interfaces/question-answer-option.interface";

export default interface QuestionAnswer {
    questionId: string;
    type: string;
    title: string;
    value?: string|QuestionAnswerOption|null;
    values?: QuestionAnswerOption[]|null;
}
