import InputTextField from "@/components/forms/InputTextField";
import React, {useEffect} from "react";
import uuid from "react-native-uuid";
import {List, ListItem, ListItemButton, ListItemText, Radio, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import QuestionOption from "@/components/forms/interfaces/question-option.interface";
import Question from "@/components/forms/interfaces/question.interface";

export default function CardItemInputRadio(
    propsIn: Readonly<{
        question: Question
    }>
): React.JSX.Element {

    const defaultTitle: string = "Indicar el título de la pregunta";
    const defaultPlaceholder: string = "Texto opcional del placeholder...";

    const addOption = (): QuestionOption => ({
        key: uuid.v4().toString(),
        value: '',
        order: 0,
        hasError: false,
    });

    const [title, setTitle]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.title || '');
    const [placeholder, setPlaceholder]: [string, (value: (((prevState: string) => string) | string)) => void] = React.useState(propsIn?.question?.placeholder ?? '');

    const [options, setOptions]: [QuestionOption[], (value: (((prevState: QuestionOption[]) => QuestionOption[]) | QuestionOption[])) => void] = React.useState([
        addOption(),
    ]);

    useEffect(() => {
        setOptions(propsIn.question.options || [addOption()]);
    }, [propsIn]);

    useEffect(() => {
        options.map((option, index) => {
            option.order = index + 1;
        })
    },[options])

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        propsIn.question.title = e.target.value;
    }

    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceholder(e.target.value);
        propsIn.question.placeholder = e.target.value;
    }


    const handleClickOptionInputText = (index: number): void => {
        if (index === options.length - 1) {
            setOptions([
                ...options,
                addOption(),
            ]);
        }
    }

    const handleClickOptionDelete = (index: number): void => {
        if (options.length > 1) {
            let tempOptions: QuestionOption[] = options.filter((option: QuestionOption, i: number) => i !== index)
            setOptions(tempOptions);
            propsIn.question.options = tempOptions;
        }
    }

    const handleFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, optionKey: string) => {
        // controlar que value sea único
        const hasError: boolean = options.some((option: QuestionOption) => option.key !== optionKey && option.value === e.target.value);

        propsIn.question.options = options.map((option: QuestionOption) => {
            if (option.key === optionKey) {
                return {
                    ...option,
                    value: e.target.value,
                    hasError
                }
            }
            return option;
        });

        setOptions(propsIn.question.options);
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
            <h3>Agregar opciones para los elementos radio</h3>
            <List sx={{width: '100%'}} dense>
                {options.map((option: QuestionOption, index: number) => {
                    return (
                        <ListItem
                            key={option.key}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="Eliminar entrada"
                                    onClick={() => handleClickOptionDelete(index)}
                                >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            }
                            disablePadding
                        >
                            <ListItemButton role={undefined} dense>
                                <ListItemText
                                    sx={{mr: 1}}
                                    id={`checkbox-list-label-${option.key}`}
                                    primary={
                                        <Radio
                                            value=""
                                            disabled
                                            sx={{pl: 0}}
                                        />
                                    }
                                />

                                <TextField
                                    error={option.hasError}
                                    hiddenLabel
                                    variant="filled"
                                    value={option.value}
                                    fullWidth
                                    placeholder="Añadir opción"
                                    size="small"
                                    onClick={() => handleClickOptionInputText(index)}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleFieldChange(e, option.key)}

                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}
