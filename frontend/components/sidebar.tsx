// components/sidebar.tsx (versão modificada)
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, Shield, TreePine, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"

const navigation = [
  { name: "Catálogo", href: "/catalogo-publico", icon: Home },
  { name: "Administração", href: "/admin/dashboard", icon: Shield },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Verifica o status de login no lado do cliente
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsLoggedIn(authStatus === "true")
  }, [pathname]) // Re-verifica quando a rota muda

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    router.push("/catalogo-publico")
  }

  return (
    <>
      {/* Overlay para fechar o menu em mobile */}
      <div
        className={cn(
          "fixed inset-0 bg-black/60 z-30 md:hidden",
          isOpen ? "block" : "hidden",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full md:h-auto w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out z-40",
          "md:relative md:translate-x-0", // Estilos para telas maiores
          isOpen ? "translate-x-0" : "-translate-x-full", // Animação para mobile
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <TreePine className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">EcoCatalog</h1>
                <p className="text-sm text-emerald-600">Flora & Fauna</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);

            // 👇 CONDIÇÃO PARA DESABILITAR O BOTÃO ADMIN 👇
            const isAdminPageAndLoggedIn = item.name === "Administração" && isLoggedIn && isActive;

            // Se for o botão de admin, logado e já na página, renderiza um div não clicável
            if (isAdminPageAndLoggedIn) {
              return (
                <div
                  key={item.name}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                    // Estilos para parecer ativo, mas sem hover e com cursor diferente
                    "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border cursor-not-allowed opacity-75"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </div>
              );
            }

            // Lógica original para todos os outros casos
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Botão de Logout (condicional) */}
        {isLoggedIn && (
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Sair
            </Button>
          </div>
        )}

        {/* Biodiversidade Info */}
        <div className="p-4 m-4 bg-sidebar-accent rounded-lg border border-sidebar-border">
          <div className="flex items-center gap-2 mb-2">
            <TreePine className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-sidebar-accent-foreground">Biodiversidade</span>
          </div>
          <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
            Explore e gerencie informações sobre flora e fauna.
          </p>
        </div>
      </div>
    </>
  )
}