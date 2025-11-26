// components/species-card.tsx

"use client"

import Image from "next/image"
import { Edit, Trash2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Species } from "@/contexts/species-context";

interface SpeciesCardProps {
  species: Species
  isLoggedIn?: boolean
  onEdit?: (species: Species) => void
  onDelete?: (species: Species) => void
  onDetails?: (species: Species) => void
}

export function SpeciesCard({ species, isLoggedIn = false, onEdit, onDelete, onDetails }: SpeciesCardProps) {
  return (
    <div className="group bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden card-hover animate-fade-in">
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={species.image || "/placeholder.svg"}
          alt={species.nomePopular}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-t  o-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isLoggedIn && (
          <div className="absolute top-3 left-3 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
            <div className="flex flex-col gap-2">
              <>
                <div className="flex flex-row">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-auto p-0 bg-card/90 hover:bg-muted backdrop-blur-sm"
                    onClick={() => onDetails?.(species)}
                  >
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    Detalhes
                  </Button>
                </div>
                <div className="flex flex-row">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-auto p-0 bg-card/90 hover:bg-muted backdrop-blur-sm"
                    onClick={() => onEdit?.(species)}
                  >
                    <Edit className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    Editar
                  </Button>
                </div>
                <div className="flex flex-row">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-auto p-0 bg-card/90 hover:bg-destructive/10 backdrop-blur-sm"
                    onClick={() => onDelete?.(species)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    Excluir
                  </Button>
                </div>
              </>
            </div>
          </div>
        )}

      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          Nome Popular: {species.nomePopular}
        </h3>
        <p className="text-sm text-emerald-800 dark:text-emerald-600 italic mb-3 font-medium">
          Nome Científico: {species.nomeCientifico}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div >
  )
}
