// components/adminAuthModal.tsx (NOVO ARQUIVO)
"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, ShieldAlert, Loader2 } from "lucide-react";
import api from "@/lib/api"; // Importar a instância do Axios
import { useRouter } from "next/navigation"

interface AdminAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback para quando a senha for validada
}

const MAX_ATTEMPTS = 3;

export function AdminAuthModal({ isOpen, onClose, onSuccess }: AdminAuthModalProps) {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
    const router = useRouter()

    // Resetar estado quando o modal for fechado/aberto
    useEffect(() => {
        if (isOpen) {
            setPassword("");
            setError(null);
            setAttemptsLeft(MAX_ATTEMPTS);
            setIsLoading(false);
        }
    }, [isOpen]);

    const handleValidate = async () => {
        if (!password || attemptsLeft <= 0) return;

        setIsLoading(true);
        setError(null);

        try {
            // --- !!! IMPORTANTE !!! ---
            // Você PRECISA criar este endpoint no seu backend:
            // Ex: POST /api/auth/validate-admin
            // Body: { password: "senha-digitada" }
            // Resposta Sucesso (200 OK): Indica senha correta
            // Resposta Erro (401 Unauthorized): Indica senha incorreta
            // --------------------------
            await api.post("/auth/validate-admin", { senha: password }); // Enviando como 'senha'

            // Se a API não retornar erro (status 2xx), a senha é válida
            onSuccess(); // Chama o callback de sucesso (que fará o redirect)
            onClose(); // Fecha o modal
        } catch (err: any) {
            console.error("Erro na validação da senha admin:", err);
            const remaining = attemptsLeft - 1;
            setAttemptsLeft(remaining);

            if (remaining <= 0) {
                setError(`Senha incorreta. Tentativas esgotadas.`);
                onClose();
                router.push("/admin")
            } else {
                setError(
                    `Senha incorreta. Você tem mais ${remaining} tentativa(s).`
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        // Limpa o erro ao digitar novamente
        if (error) setError(null);
    };

    const noAttemptsLeft = attemptsLeft <= 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyRound className="w-5 h-5 text-emerald-600" />
                        Autenticação de Administrador
                    </DialogTitle>
                    <DialogDescription>
                        Para acessar o registro, por favor, insira a senha de um
                        administrador já cadastrado.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="admin-password">Senha do Admin</Label>
                        <Input
                            id="admin-password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Digite a senha..."
                            disabled={isLoading || noAttemptsLeft}
                            className={error ? "border-destructive" : ""}
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 text-sm text-destructive">
                            <ShieldAlert className="w-4 h-4" />
                            <span>{error}</span>
                        </div>
                    )}
                    {!error && !noAttemptsLeft && (
                        <p className="text-xs text-muted-foreground">
                            Tentativas restantes: {attemptsLeft}
                        </p>
                    )}
                </div>
                <DialogFooter className="gap-2">
                    {/* Botão Cancelar agora usa DialogClose */}
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isLoading}>
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={handleValidate}
                        disabled={isLoading || noAttemptsLeft || !password}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : null}
                        Validar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}