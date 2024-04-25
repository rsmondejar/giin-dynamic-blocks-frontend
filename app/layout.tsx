import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import React from "react";

export const metadata: Metadata = {
    title: {
        template: '%s | Dynamic Blocks',
        default: 'Dynamic Blocks',
    },
    description: 'VIU GIIN - Dynamic Blocks',
    metadataBase: new URL(process.env.APP_URL || ''),
    alternates: {
        canonical: './',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
          <Providers>
              {children}
          </Providers>
      </body>
    </html>
  );
}
