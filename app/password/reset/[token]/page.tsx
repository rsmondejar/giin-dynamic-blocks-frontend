import type {Metadata} from "next";
import Header from "@/components/Header";
import {Grid} from "@mui/material";
import Container from "@mui/material/Container";
import NewPasswordForm from "@/app/password/reset/[token]/NewPasswordLoginForm";

export const metadata: Metadata = {
    title: "Nueva contraseña",
    description: "New Password description page VIU GIIN Dynamic Blocks"
};

export default function ResetPasswordTokenPage({params}: Readonly<{ params: { token: string } }>) {
    return (
        <Container maxWidth="lg">
            <Container maxWidth="sm">
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item>
                        <Header title='Escribir nueva contraseña' />
                        <NewPasswordForm token={params.token} />
                        <p></p>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
