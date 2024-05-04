"use client";

import {PaletteMode} from "@mui/material";
import {teal, deepPurple, grey} from "@mui/material/colors";

const theme = {
    palette: {
        primary: teal,
    },
};

export const getDesignTokens = (mode: PaletteMode = "light") => ({
    palette: {
        mode,
        ...(mode === "light"
            ? {
                // palette values for light mode
                primary: teal,
                divider: teal[200],
                background: {},
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepPurple,
                divider: deepPurple[700],
                background: {},
                text: {},
            }),
    },
});

export default theme;
