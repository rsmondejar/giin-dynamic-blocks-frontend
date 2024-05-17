import QuestionAnswer from "@/components/forms/interfaces/question-answer.interface";

export default interface FormSubmit {
    formId: string;
    answers: QuestionAnswer[];
}
