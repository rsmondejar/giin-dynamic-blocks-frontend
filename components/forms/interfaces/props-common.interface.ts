export default interface PropsCommon {
    label: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    hasError: boolean;
    id?: string|null;
    type?: string|null;
    value?: string|boolean|null;
    placeholder?: string;
    helperText?: string|null;
}

