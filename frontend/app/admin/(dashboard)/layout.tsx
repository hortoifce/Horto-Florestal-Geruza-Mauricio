// app/admin/layout.tsx (VERSÃO COM ALERT)
"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RedirectingLoginModal } from "@/components/alert-notoken-modal";

function AdminLoadingScreen() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated");
      const token = localStorage.getItem("token");

      if (authStatus === "true" && token) {
        setIsVerified(true);
      } else {
        // Se não estiver autenticado, marca para mostrar o modal
        setIsVerified(false);
        setShowRedirectModal(true);
      }
      // Importante: Marcar a checagem como concluída em AMBOS os casos
      setIsCheckingAuth(false);
    };

    checkAuth();
  }, [router]);

  if (isCheckingAuth) {
    return <AdminLoadingScreen />;
  }

  if (showRedirectModal) {
    return <RedirectingLoginModal isOpen={true} />;
  }

  if (isVerified) {
    return <>{children}</>;
  }

  return null;
}