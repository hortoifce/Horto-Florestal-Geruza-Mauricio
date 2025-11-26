"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  subtitle?: string
  showLogout?: boolean
}

export function Header({ title, subtitle, showLogout }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    router.push("/admin")
  }

  return (
    <div className="bg-background border-b border-border px-8 py-6 transition-colors animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:rotate-3 shadow-lg hover:shadow-emerald-500/25">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            {subtitle && (
              <p
                className="text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {showLogout && (
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="group flex items-center gap-2 transition-all duration-300 transform hover:scale-105 bg-transparen"
            >
              <LogOut className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Sair
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
