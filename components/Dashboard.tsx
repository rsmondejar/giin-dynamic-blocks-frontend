"use client";

import {signOut, useSession} from "next-auth/react";
import {Button, Grid} from "@mui/material";
import Header from "@/components/Header";

export default function Dashboard() {
    const { data: session} = useSession({
        required: true, // TODO: change after fixing the session storage to true
    });

    if (!session) {
        return <></>;
    }

    return (
        <Grid container alignItems='center' justifyContent='center' height='100vh'>
            <Grid item>
                <Header title='Dashboard' />
                <p>Bievenido <strong>{ session.user?.name }</strong></p>
                <ul>
                    <li>Nombre: { session.user?.name }</li>
                    <li>Apellidos: {session.user?.lastName}</li>
                    <li>ID: {session.user?.id}</li>
                    <li>Email: {session.user?.email}</li>
                    <li>Fecha alta: {session.user?.createdAt.toString()}</li>
                </ul>

                <Button variant='contained' color='primary' onClick={ _ => signOut()}>Cerrar sesión</Button>
            </Grid>
        </Grid>
    )
}
