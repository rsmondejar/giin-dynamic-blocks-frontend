import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import React from "react";
import FormUserView from "@/components/forms/FormUserView";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Formulario de registro",
    description: "Submission form description page VIU GIIN Dynamic Blocks"
};

export default function PublicFormPage({params}: Readonly<{ params: { slug: string } }>): React.JSX.Element {
    return (
        <Container maxWidth="lg">
            <Container maxWidth="md">
                <Grid alignItems='center' justifyContent='center'>
                    <Grid item>
                        <FormUserView slug={params.slug} />
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
