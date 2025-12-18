// components/login-form.tsx 
"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/lib/api";

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await api.post(
        '/auth/login',
        formData
      );

      const { nome, email, token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify({ nome, email }));

      router.push("/admin/dashboard");

    } catch (err) {
      console.error("Erro de autenticação:", err);
      setError("E-mail ou senha inválidos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-full max-w-md">
        <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground mb-2">Acesso Administrativo</h1>
            <p className="text-sm text-muted-foreground">Faça login para gerenciar o catálogo</p>
          </div>

          {/* Mensagem de Erro */}
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Label htmlFor="senha" className="text-sm font-medium text-foreground">
                Senha
              </Label>
              <div className="relative mt-1">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
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

            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Precisa registrar um novo administrador?
            </p>
            <p className="text-sm text-muted-foreground">
              Entre como um administrador existente e cadastre um novo no painel administrativo.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}