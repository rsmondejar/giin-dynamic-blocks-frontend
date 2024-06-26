"use client";

import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import {useRouter} from "next/navigation";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import UserRegister from "@/components/users/interfaces/user-register.interface";
import {useSnackbar} from "notistack";
import Link from "next/link";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();

    const [authState, setAuthState] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
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

        try {
            // enable loading screen
            setLoading(true);

            // send form to backend
            const response = await sendForm(authState);

            if (response.errors) {
                throw new Error(
                    'Error al registrar el usuario: ' + (response.errors ?? '')
                );
            }

            enqueueSnackbar('Usuario registrado correctamente.', {variant: 'success'});

            // try to login the user
            await signIn('credentials', {
                ...authState,
                redirect: false
            }).then((res) => {
                setLoading(false);
                if (undefined === res) {
                    throw new Error('No response from server');
                }
                if (res.ok) {
                    router.push('/dashboard');

                } else {
                    setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                        ...old,
                        error: res?.error ?? '',
                        processing: false
                    }));
                }
            }).catch((err): void => {
                setLoading(false);
                console.error(err);
                setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                    ...old,
                    error: err.message,
                    processing: false
                }));
            })
        } catch (error: any) {
            enqueueSnackbar(error?.message ?? '', {variant: 'error'});
        } finally {
            // disable loading screen
            setLoading(false);
            setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                ...old,
                processing: false
            }));
        }
    }

    const sendForm = async (user: UserRegister) => {
        const formUserRegisterResponse = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        return await formUserRegisterResponse.json()
    }

    return (
        <>
            <LoadingBackdrop open={loading}/>
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
                        value={authState.name}
                        fullWidth
                        label='Nombre'
                        id='name'
                        placeholder='Introducir nombre del usuario ...'
                    />
                    <TextField
                        sx={{mb: 1}}
                        onChange={handleFieldChange}
                        value={authState.lastName}
                        fullWidth
                        label='Apellidos'
                        id='lastName'
                        placeholder='Introducir apellidos del usuario ...'
                    />
                    <TextField
                        sx={{mb: 1}}
                        onChange={handleFieldChange}
                        value={authState.email}
                        fullWidth
                        label='E-mail'
                        id='email'
                        placeholder='Introducir correo electrónico ...'
                        type='email'
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
                        Registrar
                    </Button>
                    <Button
                        component={Link}
                        variant="text"
                        color="primary"
                        href="/login"
                    >
                        Login
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}
