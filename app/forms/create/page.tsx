import InputTextField from "@/components/forms/InputTextField";

export default function FormsCreatePage() {
    return (
        <div>
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
            </form>
        </div>
    )
}
