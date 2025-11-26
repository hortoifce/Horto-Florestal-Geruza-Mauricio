// components/ThemeToggle.tsx (CORRIGIDO E SIMPLIFICADO)
"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
      variant={"ghost"}
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-8 w-8 p-0 hover:bg-muted dark:hover:bg-muted transition-colors">
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-foreground" />
      )}
      <span className="sr-only">Alternar tema</span>
    </Button>
  )
}