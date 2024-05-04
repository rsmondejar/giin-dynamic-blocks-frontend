"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";
import {ThemeContextProvider} from "@/theme/ThemeContextProvider";
import CssBaseline from "@mui/material/CssBaseline";

const Providers = ({children}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <ThemeContextProvider>
            <CssBaseline/>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeContextProvider>
    );
};

export default Providers;
