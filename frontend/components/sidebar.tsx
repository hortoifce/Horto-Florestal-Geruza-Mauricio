"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Shield, TreePine } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navigation = [
  {
    name: "Catálogo",
    href: "/catalogo",
    icon: Home,
  },
  {
    name: "Administração",
    href: "/admin",
    icon: Shield,
  },
  {
    name: "Biodiversidade",
    href: "/biodiversidade",
    icon: TreePine,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-colors">
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
          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              href={item.href}
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
          )
        })}
      </nav>

      {/* Biodiversidade Info */}
      <div className="p-4 m-4 bg-sidebar-accent rounded-lg border border-sidebar-border">
        <div className="flex items-center gap-2 mb-2">
          <TreePine className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-sidebar-accent-foreground">Biodiversidade</span>
        </div>
        <p className="text-xs text-sidebar-foreground/70 leading-relaxed">
          Explore e gerencie informações sobre flora e fauna com QR codes interativos.
        </p>
      </div>
    </div>
  )
}
