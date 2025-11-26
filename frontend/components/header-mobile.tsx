// components/header-mobile.tsx
"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderMobileProps {
    onMenuClick: () => void
}

export function HeaderMobile({ onMenuClick }: HeaderMobileProps) {
    return (
        <header className="md:hidden sticky top-0 z-10 flex items-center h-16 px-4 bg-background border-b">
            <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
            >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Abrir menu</span>
            </Button>
        </header>
    )
}