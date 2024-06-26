import type {Metadata} from "next";
import LoginForm from "@/app/login/LoginForm";
import Header from "@/components/Header";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";

export const metadata: Metadata = {
    title: "Login",
    description: "Login description page VIU GIIN Dynamic Blocks"
};

export default function LoginPage() {

    return (
        <Container maxWidth="lg">
            <Container maxWidth="sm">
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Login' />
                        <LoginForm />
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
