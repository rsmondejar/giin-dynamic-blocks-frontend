"use client";

import {ThemeProvider} from '@mui/material';
import {ThemeContextType, useThemeContext} from "@/theme/ThemeContextProvider";
import {ReactNode} from "react";

export default function ThemeProviderClientWrapper({children}: Readonly<{ children: ReactNode }>) {
    const theme: ThemeContextType = useThemeContext();
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}
