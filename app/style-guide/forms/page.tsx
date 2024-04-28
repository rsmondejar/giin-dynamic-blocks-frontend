import InputTextField from "@/components/forms/InputTextField";
import InputRadioField from "@/components/forms/InputRadioField";
import uuid from "react-native-uuid";
import InputSelectField from "@/components/forms/InputSelectField";
import RadioOption from "@/components/forms/interfaces/radio-option.interface";
import SelectOption from "@/components/forms/interfaces/select-option.interface";
import InputCheckboxField from "@/components/forms/InputCheckboxField";

export default function StyleGuideFormsPage() {

    const radioOptions: RadioOption[] = [
        { key: 'key-1', value: 'Option 1'} ,
        { key: 'key-2', value: 'Option 2 disabled', disabled: true},
        { key: 'key-3', value: 'Option 3'} ,
    ]

    const selectOptions: SelectOption[] = [
        { key: 'key-1', value: 'Option 1'} ,
        { key: 'key-2', value: 'Option 2 disabled', disabled: true},
        { key: 'key-3', value: 'Option 3'} ,
    ]

    return (
        <>
            <h1>Guía de estilos de formularios</h1>
            <form>
                <InputTextField
                    label="Input type text"
                    placeholder="Esto es el placeholder"
                    helperText="Texto de ayuda"
                    hasError={false}
                    readonly={false}
                    disabled={false}
                    required={false}
                    value=""
                />
                <InputTextField
                    label="Input type numeric"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    type="number"
                />
                <InputTextField
                    label="Input type password"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    type="password"
                />
                <InputTextField
                    label="Input type textarea multiline 4 rows"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    type="multiline"
                    rows={4}
                />
                <InputRadioField
                    id={uuid.v4().toString()}
                    label="Input type radio"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    options={radioOptions}
                />
                <InputRadioField
                    id={uuid.v4().toString()}
                    label="Input type radio row format"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    row={true}
                    options={radioOptions}
                />
                <InputSelectField
                    id={uuid.v4().toString()}
                    label="Input type select"
                    placeholder="Esto es el placeholder"
                    hasError={false}
                    options={selectOptions}
                    disabled={false}
                    required={false}
                    // value="key-3"
                />
                <InputCheckboxField
                    label="Input type Checbox simple"
                    placeholder="Esto es el placeholder"
                    helperText="This is the helper text"
                    hasError={false}
                    disabled={false}
                    required={false}
                    // value={false}
                />
            </form>
        </>
    );
}
