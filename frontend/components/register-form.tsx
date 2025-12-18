// components/register-form.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus } from "lucide-react"; // Trocar ícone para UserPlus
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";

export function RegisterForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // Estado para mensagem de sucesso

    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(""); // Limpar sucesso a cada tentativa

        try {
            // Usar o endpoint de registro e enviar o payload completo
            console.log(formData)
            await api.post("/auth/register", formData);

            // Lógica de sucesso
            setSuccess("Cadastro realizado com sucesso! Você já pode fazer login.");
            // Limpar o formulário
            setFormData({
                nome: "",
                email: "",
                senha: "",
            });
        } catch (err) {
            console.error("Erro no cadastro:", err);
            // Tratar erro específico (ex: e-mail já existe)
            setError("Erro ao realizar cadastro. Verifique se o e-mail já está em uso.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md justify-center flex min-h-screen m-auto">
            <div className="bg-card text-card-foreground rounded-lg shadow-sm border border-border p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        {/* Ícone atualizado */}
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    {/* Textos atualizados */}
                    <h1 className="text-2xl font-semibold text-foreground mb-2">
                        Criar Conta
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Preencha os dados para se registrar
                    </p>
                </div>

                {/* Mensagem de Erro */}
                {error && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-sm text-destructive">{error}</p>
                    </div>
                )}

                {/* Mensagem de Sucesso */}
                {success && (
                    <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <p className="text-sm text-emerald-600">{success}</p>
                    </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nome */}
                    <div>
                        <Label htmlFor="nome" className="text-sm font-medium text-foreground">
                            Nome
                        </Label>
                        <Input
                            id="nome"
                            type="text"
                            placeholder="Digite seu nome completo"
                            value={formData.nome}
                            onChange={(e) =>
                                setFormData({ ...formData, nome: e.target.value })
                            }
                            className="mt-1"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Campo E-mail */}
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            className="mt-1"
                            disabled={isLoading}
                            required
                        />
                    </div>

                    {/* Campo Senha */}
                    <div>
                        <Label
                            htmlFor="senha"
                            className="text-sm font-medium text-foreground"
                        >
                            Senha
                        </Label>
                        <div className="relative mt-1">
                            <Input
                                id="senha"
                                type={showPassword ? "text" : "password"}
                                placeholder="Crie uma senha"
                                value={formData.senha}
                                onChange={(e) =>
                                    setFormData({ ...formData, senha: e.target.value })
                                }
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
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Botão de Submit */}
                    <Button
                        type="submit"
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </form>
            </div>
        </div>
    );
}