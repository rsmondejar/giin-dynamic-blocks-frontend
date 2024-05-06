import InputTextField from "@/components/forms/InputTextField";
import React from "react";

export default function CardItemInputText(
    propsIn: Readonly<{
        question: {
            id: string;
            title: string;
            placeholder: string;
            isRequired: boolean;
        }
    }>
): React.JSX.Element {

    const defaultTitle: string = "Indicar el título de la pregunta";
    const defaultPlaceholder: string = "Texto opcional del placeholder...";

    const [title, setTitle]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.title || '');
    const [placeholder, setPlaceholder]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.placeholder || '');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        propsIn.question.title = e.target.value;
    }

    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceholder(e.target.value);
        propsIn.question.placeholder = e.target.value;
    }

    return (
        <>
            <InputTextField
                label={title.length > 0 ? title : defaultTitle}
                value={title}
                placeholder={placeholder.length > 0 ? placeholder : defaultPlaceholder}
                onChange={handleTitleChange}
                required={propsIn?.question?.isRequired || false}
                sx={{mb: 4}}
            />
            <InputTextField
                label="Texto opcional del placeholder"
                value={placeholder}
                placeholder={defaultPlaceholder}
                onChange={handlePlaceholderChange}
                size="small"
            />
        </>
    )
}
