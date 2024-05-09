export default interface QuestionOption {
    key: string;
    value: string;
    order: number;
    disabled?: boolean;
    hasError?: boolean;
}
