import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import React from "react";

export default function PublicFormPage({ params }: { params: { slug: string } }): React.JSX.Element {
  return (
      <Container maxWidth="lg">
          <Container maxWidth="md">
              <Grid alignItems='center' justifyContent='center'>
                  <Grid item>
                      <h1>Mi formulario: {params.slug}</h1>
                  </Grid>
              </Grid>
          </Container>
      </Container>
  );
}
