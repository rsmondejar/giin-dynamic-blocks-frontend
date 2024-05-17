import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import React from "react";

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
