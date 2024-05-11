import Question from "@/components/forms/interfaces/question.interface";

export default interface FormCreate {
    title: string;
    slug?: string | null;
    description?: string | null;
    questions?: Question[] | null;
}
