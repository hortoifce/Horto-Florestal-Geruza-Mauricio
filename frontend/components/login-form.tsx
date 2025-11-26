"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simular delay de autenticação
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar credenciais de teste
    if (formData.login === "admin" && formData.password === "eco2024") {
      // Salvar estado de autenticação
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("user", JSON.stringify({ login: formData.login }))

      // Redirecionar para dashboard
      router.push("/admin/dashboard")
    } else {
      setError("Credenciais inválidas. Use admin/eco2024")
    }
    setIsLoading(false)
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Acesso Administrativo</h1>
          <p className="text-sm text-muted-foreground">Faça login para gerenciar flora e fauna</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="login" className="text-sm font-medium text-foreground">
              Login
            </Label>
            <Input
              id="login"
              type="text"
              placeholder="Digite seu login"
              value={formData.login}
              onChange={(e) => setFormData({ ...formData, login: e.target.value })}
              className="mt-1"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-foreground">
              Senha
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pr-10"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Loading State */}
          <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        {/* Test Credentials */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Credenciais de teste:</h3>
          <div className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <p>Login: admin</p>
            <p>Senha: eco2024</p>
          </div>
        </div>
      </div>
    </div>
  )
}
