"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  const applyTheme = (newTheme: "light" | "dark") => {
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  useEffect(() => {
    setMounted(true)
    try {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark"
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        setTheme(savedTheme)
        applyTheme(savedTheme)
      } else {
        // Check system preference
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setTheme(systemTheme)
        applyTheme(systemTheme)
      }
    } catch (error) {
      console.log("[v0] Error accessing localStorage, using default theme")
      setTheme("light")
      applyTheme("light")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    console.log("[v0] Toggling theme from", theme, "to", newTheme)

    setTheme(newTheme)
    applyTheme(newTheme)

    try {
      localStorage.setItem("theme", newTheme)
    } catch (error) {
      console.log("[v0] Error saving theme to localStorage")
    }
  }

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
        disabled
      >
        <Sun className="h-4 w-4 text-green-600 dark:text-green-400" />
        <span className="sr-only">Alternar tema</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-8 w-8 p-0 hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <Sun className="h-4 w-4 text-green-600 dark:text-green-400" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}
