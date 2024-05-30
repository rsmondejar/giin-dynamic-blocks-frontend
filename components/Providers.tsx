"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";
import {ThemeContextProvider} from "@/theme/ThemeContextProvider";
import CssBaseline from "@mui/material/CssBaseline";
import {SnackbarProvider} from "notistack";
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from "@vercel/analytics/react"

const Providers = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ThemeContextProvider>
            <CssBaseline/>
            <SpeedInsights/>
            <Analytics/>
            <SessionProvider>
                <SnackbarProvider maxSnack={5}>
                    {children}
                </SnackbarProvider>
            </SessionProvider>
        </ThemeContextProvider>
    );
};

export default Providers;
