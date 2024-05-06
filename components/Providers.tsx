"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";
import {ThemeContextProvider} from "@/theme/ThemeContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import {SnackbarProvider} from "notistack";

const Providers = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ThemeContextProvider>
            <CssBaseline/>
            <SessionProvider>
                <SnackbarProvider maxSnack={5}>
                    {children}
                </SnackbarProvider>
            </SessionProvider>
        </ThemeContextProvider>
    );
};

export default Providers;
