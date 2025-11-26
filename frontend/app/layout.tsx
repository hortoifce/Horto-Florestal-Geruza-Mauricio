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
  title: "EcoCatalog - Flora & Fauna",
  description: "Catálogo de biodiversidade com QR codes interativos",
}

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