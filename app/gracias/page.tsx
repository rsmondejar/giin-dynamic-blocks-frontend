import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Gracias por su respuesta",
    description: "Thanks description page VIU GIIN Dynamic Blocks"
};

export default function ThanksPage() {
    return (
        <Container maxWidth="lg">
            <Container maxWidth="md">
                <Grid alignItems='center' justifyContent='center'>
                    <Grid item>
                        <h1>¡Gracias por su respuesta!</h1>
                        <p>La petición enviada ha sido registrada.</p>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
