import Container from "@mui/material/Container";
import {Button, ButtonGroup, Grid} from "@mui/material";
import Stack from "@mui/material/Stack";

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
                <Grid alignItems='center' justifyContent='center'>
                    <ButtonGroup>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" color="primary" href="/login">
                                Iniciar sesión
                            </Button>
                            <Button variant="contained" color="primary" href="/register">
                                Registrarse
                            </Button>
                        </Stack>
                    </ButtonGroup>
                </Grid>
            </Container>
        </Container>
    );
}
