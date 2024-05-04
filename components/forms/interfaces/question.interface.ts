export default interface Question {
    id: string | null | undefined;
    title: string;
    placeholder: string;
    isRequired: boolean;
    type: string;
}
