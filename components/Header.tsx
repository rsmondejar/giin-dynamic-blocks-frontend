import {Grid} from "@mui/material";

export default function Header({title} : Readonly<{ title: string }>) {
    return (
        <header>
            <Grid container alignItems='center' justifyContent='center'>
                <Grid item>
                    <h1>{title}</h1>
                </Grid>
            </Grid>
        </header>
    )
}
