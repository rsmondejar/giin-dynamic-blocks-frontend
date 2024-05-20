"use client";

import {useSession} from "next-auth/react";
import {Button, Grid} from "@mui/material";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import FormListTable from "@/components/dashboard/FormListTable";
import Link from "next/link";

export default function Dashboard() {
    const {data: session} = useSession({
        required: true,
    });

    if (!session) {
        return <></>;
    }

    return (
        <Container maxWidth={false}>
            <Container maxWidth={false} sx={{mb: 5}}>
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Dashboard'/>
                        <FormListTable/>
                    </Grid>
                </Grid>
            </Container>
            <Container maxWidth="md">
                <Grid container alignItems='center' justifyContent='start'>
                    <Grid item>
                        <Button
                            component={Link}
                            href={'/forms/create'}
                            variant="contained"
                        >
                            Nuevo Formulario
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
