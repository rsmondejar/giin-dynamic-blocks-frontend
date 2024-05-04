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

    return (
        <>
            <InputTextField
                label={title.length > 0 ? title : defaultTitle}
                value={title}
                placeholder={placeholder.length > 0 ? placeholder : defaultPlaceholder}
                onChange={(e) => setTitle(e.target.value)}
                required={propsIn?.question?.isRequired || false}
                sx={{mb: 4}}
            />
            <InputTextField
                label="Texto opcional del placeholder"
                value={placeholder}
                placeholder={defaultPlaceholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                size="small"
            />
        </>
    )
}
