// components/alert-notoken-modal.tsx (VERSÃO CORRIGIDA)
"use client"

import { useState } from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    // AlertDialogCancel, // Removido - não queremos que o usuário cancele
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Loader2, TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation";

interface RedirectingConfirmationModalProps {
    isOpen: boolean
    // onConfirm removido - o modal agora é autônomo
}

export function RedirectingLoginModal({
    isOpen,
}: RedirectingConfirmationModalProps) {
    const router = useRouter();
    // Corrigido: 'isRedirecting' agora é controlado corretamente
    const [isRedirecting, setIsRedirecting] = useState(false)

    // Renomeado para handleRedirect
    const handleRedirect = async () => {
        // 1. Ativa o estado de loading
        setIsRedirecting(true);

        try {
            // 2. Limpa o localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");

            // Opcional: pequeno delay para o usuário ler a mensagem
            await new Promise(resolve => setTimeout(resolve, 500));

            // 3. Redireciona para a página de login
            router.replace("/admin")
        } catch (err) {
            console.error("Falha ao redirecionar:", err)
            // Mesmo se falhar, tenta redirecionar
            router.replace("/admin")
        }
        // Não é necessário setar 'isRedirecting' para false,
        // pois o componente será desmontado.
    }

    return (
        // Adicionamos onOpenChange para lidar com cliques fora do modal (overlay)
        <AlertDialog open={isOpen} onOpenChange={(open) => {
            // Se o usuário tentar fechar (clicando fora), redireciona
            if (!open && !isRedirecting) {
                handleRedirect();
            }
        }}>
            <AlertDialogContent className="animate-scale-in">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-yellow-700 dark:text-yellow-400">
                        <TriangleAlert className="w-5 h-5" />
                        Sessão expirada
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
                        Seu token de autenticação expirou! Você será redirecionado para tela de login novamente.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={handleRedirect} // Ação de clique chama o redirect
                        disabled={isRedirecting} // Desabilita o botão durante o redirect
                        className="bg-gray-600 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                    >
                        {isRedirecting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Redirecionando...
                            </>
                        ) : (
                            // 4. Texto do botão corrigido
                            "OK"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}