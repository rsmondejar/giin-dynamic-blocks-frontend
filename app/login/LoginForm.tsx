"use client";

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams()
    const email = searchParams.get('email') ?? ''

    const [authState, setAuthState] = useState({
        email: email ?? '',
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

    const handleKeyDown = async (event: { key: string; }) => {
        if (event.key === 'Enter') {
            await handleSubmit();
        }
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
            <Grid item xs={12}>
                {
                    formState.error !== '' &&
                    <Alert severity='error' sx={{mb: 2}}>
                        {simplifyError(formState.error)}
                    </Alert>
                }
                <TextField
                    sx={{mb: 1}}
                    onChange={handleFieldChange}
                    onKeyDown={handleKeyDown}
                    value={authState.email}
                    fullWidth
                    label='E-mail'
                    id='email'
                    placeholder='Introducir correo electrónico ...'
                />
                <TextField
                    sx={{mb: 1}}
                    onChange={handleFieldChange}
                    onKeyDown={handleKeyDown}
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
            <Grid item xs={12}>
                <Button
                    component={Link}
                    variant="text"
                    color="primary"
                    href="/password/reset"
                >
                    ¿Olvidaste tu contraseña?
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    component={Link}
                    variant="text"
                    color="primary"
                    href="/register"
                >
                    Registar usuario
                </Button>
            </Grid>
        </Grid>
    );
}
