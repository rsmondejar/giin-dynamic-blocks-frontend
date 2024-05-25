import type {Metadata} from "next";
import RegisterForm from "@/app/register/RegisterForm";
import Header from "@/components/Header";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
export const metadata: Metadata = {
    title: "Registro nuevo usuario",
    description: "Register description page VIU GIIN Dynamic Blocks"
};
export default function RegisterPage() {
    return (
        <Container maxWidth="lg">
            <Container maxWidth="sm">
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Registro nuevo usuario' />
                        <RegisterForm />
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
