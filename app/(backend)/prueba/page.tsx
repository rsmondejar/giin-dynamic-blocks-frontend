'use client';

import {Button} from "@mui/material";
import {useState} from "react";
import ChildComponent1 from "@/app/(backend)/prueba/ChildComponent1";
import ChildComponent2 from "@/app/(backend)/prueba/ChildComponent2";

export default function PruebaPage() {
    const form = {
        title: 'algo',
        description: 'algo más',
        hasError: false,
    };

    const [formState, setFormState] = useState(form);

    const handleClick = () => {
        setFormState({
            ...formState,
            hasError : !formState.hasError,
        });
    };

    return (
        <div>
            <h1>Prueba</h1>

            <Button
                color="primary"
                variant="contained"
                onClick={handleClick}
            >
                Click me
            </Button>

            <div><pre>{JSON.stringify(formState, null, 2) }</pre></div>

            <ChildComponent1 form={formState}/>
            <ChildComponent2 form={formState}/>
        </div>
    );
}
