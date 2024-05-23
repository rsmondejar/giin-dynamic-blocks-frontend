import Container from "@mui/material/Container";
import {Button, ButtonGroup, Card, CardMedia, Grid} from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Header from "@/components/Header";
import Services from "@/components/landing/Services";
import loremIpsum from "@/lib/Lorem";
import UserRecommendationSlider from "@/components/landing/UserRecommendationSlider";
import moment from "moment/moment";
import ImageParallax from "@/components/landing/image-parallax/ImageParallax";

export default function HomePage() {
    return (
        <>
            <Card>
                <CardMedia
                    component="img"
                    image="https://placehold.co/1920x400"
                    alt="banner"
                    title="banner"
                    width="100%"
                    height="auto"
                />
            </Card>
            <Container sx={{pt: 5, pb: 10}}>
                <Header title="Welcome to the VIU GIIN Dynamic Blocks"/>
                <Grid>
                    <Typography variant="body1" gutterBottom>
                        El contenido de esta lading está en construcción.
                    </Typography>
                    <ButtonGroup sx={{py: 2}}>
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
                <Grid sx={{pt: 3, pb: 5}}>
                    <Typography variant="body1" gutterBottom>
                        {loremIpsum}
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Nuestros servicios
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Services/>
                </Grid>
            </Container>
            <ImageParallax image="https://placehold.co/1920x400?text=Parallax\\nBackground" />
            <Container sx={{py: 5}}>
                <Grid sx={{pt: 2, pb: 2}}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        ¿Quienes somos?
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {loremIpsum}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {loremIpsum}
                    </Typography>
                </Grid>
            </Container>
            <Container sx={{pb: 2}}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Nuestros clientes
                </Typography>
                <UserRecommendationSlider/>
            </Container>
            <Container maxWidth={false} sx={{py: 5}}>
                <Box display="flex" justifyContent="center" sx={{py: 3, bgcolor: 'background.paper', borderTop: 1}}>
                    <Typography variant="body1" color="text.secondary">
                        © {moment().format('Y')} VIU GIIN Dynamic Blocks. Todos los derechos reservados.
                    </Typography>
                </Box>
            </Container>
        </>
    );
}
