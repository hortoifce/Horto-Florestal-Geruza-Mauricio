// components/layout-wrapper.tsx
"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { HeaderMobile } from "./header-mobile"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-background transition-colors">
            {/* A Sidebar agora recebe o estado e a função para fechar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex-1 flex flex-col">
                {/* O Header mobile que contém o botão "hambúrguer" */}
                <HeaderMobile onMenuClick={() => setSidebarOpen(true)} />

                {/* O conteúdo da sua página */}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}