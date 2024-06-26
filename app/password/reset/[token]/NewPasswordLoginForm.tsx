"use client";

import React, {useState} from "react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import {useSnackbar} from "notistack";
import UserNewPassword from "@/components/users/interfaces/user-new-password";
import {signIn} from "next-auth/react";

export default function NewPasswordForm(props: { token: string }) {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const searchParams = useSearchParams()
    const email = searchParams.get('email') ?? ''

    const [authState, setAuthState] = useState({
        email: email ?? '',
        password: '',
        token: props.token,
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
            'USER_MAIL_TOKEN_NOT_FOUND': 'No se ha encontrado el email y/o token de reseteo',
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

        try {
            // enable loading screen
            setLoading(true);

            // send form to backend
            const response = await sendForm(authState);

            if (response.errors) {
                throw new Error(response.errors ?? '');
            }

            enqueueSnackbar('Se ha reseteado correctamente la contraseña.', {variant: 'success'});

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
        } catch (error: any) {
            setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                ...old,
                error: error.message,
            }));
            enqueueSnackbar(simplifyError(error.message), {variant: 'error'});
        } finally {
            // disable loading screen
            setLoading(false);
            setFormState((old: { processing: boolean; error: string }): { error: any, processing: boolean } => ({
                ...old,
                processing: false
            }));
        }
    }

    const sendForm = async (user: UserNewPassword) => {
        const formPasswordEmailResetResponse = await fetch(`/api/auth/password/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        return await formPasswordEmailResetResponse.json()
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
                    Resetear contraseña
                </Button>
            </Grid>
            <Grid item xs={12}>
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
    );
}
