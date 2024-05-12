"use client";

import {signOut, useSession} from "next-auth/react";
import {Button, Grid} from "@mui/material";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import FormListTable from "@/components/dashboard/FormListTable";
import Item from "@/components/Item";

export default function Dashboard() {
    const { data: session} = useSession({
        required: true,
    });

    if (!session) {
        return <></>;
    }

    return (
        <Container maxWidth={false}>
            {/*<Container maxWidth="md">*/}
            {/*    <Grid container alignItems='center' justifyContent='center'>*/}
            {/*        <Grid item>*/}
            {/*            <Header title='Dashboard' />*/}
            {/*            <p>Bievenido <strong>{ session.user?.name }</strong></p>*/}
            {/*            <ul>*/}
            {/*                <li>Nombre: { session.user?.name }</li>*/}
            {/*                <li>Apellidos: {session.user?.lastName}</li>*/}
            {/*                <li>ID: {session.user?.id}</li>*/}
            {/*                <li>Email: {session.user?.email}</li>*/}
            {/*                <li>Fecha alta: {session.user?.createdAt.toString()}</li>*/}
            {/*            </ul>*/}
            {/*        </Grid>*/}
            {/*    </Grid>*/}
            {/*</Container>*/}
            <Container maxWidth={false}>
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Dashboard' />
                        {/*<Item>*/}
                            <FormListTable />
                        {/*</Item>*/}
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
