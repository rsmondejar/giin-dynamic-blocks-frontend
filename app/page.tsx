import Container from "@mui/material/Container";
import {Grid} from "@mui/material";

export default function HomePage() {
  return (
      <Container maxWidth="lg">
          <Container maxWidth="md">
              <Grid alignItems='center' justifyContent='center'>
                  <Grid item>
                      <h1>Hello World!</h1>
                  </Grid>
              </Grid>
          </Container>
      </Container>
  );
}
