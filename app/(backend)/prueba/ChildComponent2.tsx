import {useEffect, useState} from "react";

export default function ChildComponent2(propsIn: {form: any}) {

    const [form, setForm] = useState(propsIn.form);

    useEffect(() => {
        setForm(propsIn.form);
    }, [propsIn.form]);

    return (
        <div>
            <h2>Child Component 2</h2>

            <div>
                <pre>{JSON.stringify(form, null, 2)}</pre>
            </div>
        </div>
    );
}
