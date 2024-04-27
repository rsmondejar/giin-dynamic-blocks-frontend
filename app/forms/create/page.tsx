import InputTextField from "@/components/forms/InputTextField";
import InputRadioField, {RadioOption} from "@/components/forms/InputRadioField";
import uuid from "react-native-uuid";
import InputSelectField, {SelectOption} from "@/components/forms/InputSelectField";

export default function FormsCreatePage() {

    const radioOptions: RadioOption[] = [
        { key: 'key-1', value: 'Option 1'} ,
        { key: 'key-2', value: 'Option 2'} ,
        { key: 'key-3', value: 'Option 3'} ,
    ]

    const selectOptions: SelectOption[] = [
        { key: 'key-1', value: 'Option 1'} ,
        { key: 'key-2', value: 'Option 2'} ,
        { key: 'key-3', value: 'Option 3'} ,
    ]

    return (
        <>
            <h1>Create Form</h1>
            <form>
                <InputTextField
                    label="Input type text"
                    placeholder="Esto es el placeholder"
                    hasError={false}
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
                />
            </form>
        </>
    )
}
