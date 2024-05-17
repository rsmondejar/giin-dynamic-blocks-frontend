import Container from "@mui/material/Container";
import {Grid} from "@mui/material";

export default function HomePage() {
    return (
        <Container maxWidth="lg">
            <Container maxWidth="md">
                <Grid alignItems='center' justifyContent='center'>
                    <Grid item>
                        <h1>VIU GIIN Dynamic Blocks</h1>
                        <h2>Página de bienvenida</h2>
                        <p>El contenido de esta lading está en construcción.</p>
                        <p>Por favor, regrese más tarde.</p>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    );
}
