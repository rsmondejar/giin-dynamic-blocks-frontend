export default function ChildComponent1(propsIn: {form: any}) {
    return (
        <div>
            <h2>Child Component 1</h2>

            <div>
                <pre>{JSON.stringify(propsIn.form, null, 2)}</pre>
            </div>
        </div>
    );
}
