// app/layout.tsx (versão corrigida)
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeciesProvider } from "@/contexts/species-context"
import { LayoutWrapper } from "@/components/layout-wrapper" // 👈 IMPORTE AQUI

export const metadata: Metadata = {
  title: "Horto Florestal Geruza Maurício de Andrade",
  description: "Horto Florestal Geruza Maurício de Andrade - Tabuleiro do Norte",
  keywords: [
    "horto florestal geruza maurício de andrade",
    "horto tabuleiro do norte",
    "tabuleiro do norte",
    "horto florestal",
    "horto tabuleiro",
    "horto de plantas",
    "horto"
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon1.png", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  other: {
    "google-site-verification": "google226f3b144e77e503.html",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body className="h-full" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <SpeciesProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SpeciesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}