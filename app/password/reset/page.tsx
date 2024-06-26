import type {Metadata} from "next";
import ResetPasswordForm from "@/app/password/reset/ResetPasswordForm";
import Header from "@/components/Header";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";

export const metadata: Metadata = {
    title: "Resetear contraseña",
    description: "Reset Password description page VIU GIIN Dynamic Blocks"
};

export default function ResetPasswordPage() {

    return (
        <Container maxWidth="lg">
            <Container maxWidth="sm">
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Resetear contraseña' />
                        <ResetPasswordForm />
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
