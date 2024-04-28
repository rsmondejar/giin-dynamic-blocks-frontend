import type {Metadata} from "next";
import LoginForm from "@/app/login/LoginForm";
import Header from "@/components/Header";
import {Grid} from "@mui/material";

export const metadata: Metadata = {
    title: "Login",
    description: "Login description page VIU GIIN Dynamic Blocks"
};

export default function LoginPage() {

    return (
        <Grid container alignItems='center' justifyContent='center'>
            <Grid item>
                <Header title='Login' />
                <LoginForm />
            </Grid>
        </Grid>
    )
}
