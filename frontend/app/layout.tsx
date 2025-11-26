import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { SpeciesProvider } from "@/contexts/species-context"

export const metadata: Metadata = {
  title: "EcoCatalog - Flora & Fauna",
  description: "Catálogo de biodiversidade com QR codes interativos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SpeciesProvider>
            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
          </SpeciesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
