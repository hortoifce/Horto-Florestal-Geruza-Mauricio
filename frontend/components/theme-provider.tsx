"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem("theme") as Theme
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme)
      }
    } catch (error) {
      console.log("[v0] Error accessing localStorage in ThemeProvider")
    }
  }, [])

  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    try {
      localStorage.setItem("theme", newTheme)
    } catch (error) {
      console.log("[v0] Error saving theme in ThemeProvider")
    }
  }

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    return {
      theme: "light" as Theme,
      toggleTheme: () => console.log("[v0] ThemeProvider not available"),
    }
  }
  return context
}
