"use client";

import React, {createContext, useContext, useMemo, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {PaletteMode, Theme} from "@mui/material";
import {getDesignTokens} from "@/theme/theme";

export type ThemeContextType = {
    mode: string;
    toggleColorMode: () => void;
    theme: Theme;
};
export const ThemeContext: React.Context<ThemeContextType> = createContext<ThemeContextType>({
    mode: "light",
    toggleColorMode: () => {},
    theme: createTheme(),
});

export function ThemeContextProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const [mode, setMode]: [string, (value: (((prevState: string) => string) | string)) => void] = useState('dark');

    const colorMode = useMemo(() => ({
        mode,
        toggleColorMode: () => {
            setMode(mode === 'light' ? 'dark' : 'light');
        },
        theme: createTheme(),
    }), [mode]);

    const theme = createTheme(getDesignTokens(mode as PaletteMode));

    return (
        <ThemeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => useContext(ThemeContext);
