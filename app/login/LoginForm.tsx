"use client";

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const [authState, setAuthState] = useState({
        email: '',
        password: '',
    });

    const [formState, setFormState] = useState({
        error: '',
        processing: false,
    });

    const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthState({
            ...authState,
            [e.target.id]: e.target.value
        });
    }

    const simplifyError = (error: string): string => {
        const errorMap: any = {
            'CredentialsSignin': 'El email y/o la contraseña son incorrectos',
            'SessionRequired': 'Necesario iniciar sesión primero',
        }

        return errorMap[error] || 'Error desconocido';
    }

    const handleSubmit = async () => {
        setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
            ...old,
            processing: true,
            error: ''
        }));

        signIn('credentials', {
            ...authState,
            redirect: false
        }).then((res) => {
            if (undefined === res) {
                throw new Error('No response from server');
            }
            if (res.ok) {
                router.push('/dashboard');

            } else {
                setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                    ...old,
                    error: res?.error || '',
                    processing: false
                }));
            }
        }).catch((err): void => {
            console.error(err);
            setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                ...old,
                error: err.message,
                processing: false
            }));
        })
    }
    return (
        <Grid container alignItems='center' justifyContent='center'>
            <Grid item>
                {
                    formState.error !== '' &&
                    <Alert severity='error' sx={{mb: 2}}>
                        {simplifyError(formState.error)}
                    </Alert>
                }
                <TextField
                    sx={{mb: 1}}
                    onChange={handleFieldChange}
                    value={authState.email}
                    fullWidth
                    label='E-mail'
                    id='email'
                    placeholder='Introducir correo electrónico ...'
                />
                <TextField
                    sx={{mb: 1}}
                    onChange={handleFieldChange}
                    value={authState.password}
                    fullWidth
                    label='Contraseña'
                    id='password'
                    type='password'
                    placeholder='Introducir contraseña ...'
                />
                <Button
                    disabled={formState.processing}
                    sx={{mb: 1}}
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                >
                    Entrar
                </Button>
            </Grid>
        </Grid>
    );
}
