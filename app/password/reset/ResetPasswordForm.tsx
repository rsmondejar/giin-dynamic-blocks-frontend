"use client";

import React, {useState} from "react";
import {Alert, Button, Grid, TextField} from "@mui/material";
import Link from "next/link";
import UserPasswordEmailReset from "@/components/users/interfaces/user-password-email-reset";
import {useSnackbar} from "notistack";
import EmailIcon from '@mui/icons-material/Email';

export default function ResetPasswordForm() {
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const [authState, setAuthState] = useState({
        email: '',
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

    const simplifyError = (error: string): Promise<string> => {
        console.log('aqui', error);
        const errorMap: any = {
            'USER_NOT_FOUND': 'No se ha encontrado el email en el sistema',
        }

        console.log('errorMap', errorMap);

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

            enqueueSnackbar('Enviado email resteo contraseña.', {variant: 'success'});
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

    const sendForm = async (user: UserPasswordEmailReset) => {
        const formPasswordEmailResetResponse = await fetch(`/api/auth/password/email`, {
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
                    onKeyDown={handleKeyDown}
                    value={authState.email}
                    fullWidth
                    label='E-mail'
                    id='email'
                    placeholder='Introducir correo electrónico ...'
                />
                <Button
                    disabled={formState.processing}
                    sx={{mb: 1}}
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    startIcon={<EmailIcon />}
                >
                    Enviar enlace para resetear la contraseña
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
    );
}
