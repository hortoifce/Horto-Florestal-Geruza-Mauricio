"use client"

import Image from "next/image"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Species {
  id: number
  name: string
  scientificName: string
  type: string
  image: string
  description: string
  qrCode: string
}

interface SpeciesCardProps {
  species: Species
  isLoggedIn?: boolean
  onEdit?: (species: Species) => void
  onDelete?: (species: Species) => void
}

export function SpeciesCard({ species, isLoggedIn = false, onEdit, onDelete }: SpeciesCardProps) {
  return (
    <div className="group bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden card-hover animate-fade-in">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={species.image || "/placeholder.svg"}
          alt={species.name}
          fill
          className="object-fit transition-transform duration-500 group-hover:scale-110"
        />

        {/* QR Code
        <div className="absolute top-3 right-3 transform transition-all duration-300 group-hover:scale-110">
          <div className="bg-card p-2 rounded-lg shadow-sm border border-border">
            <Image
              src={species.qrCode || "/placeholder.svg"}
              alt={`QR Code para ${species.name}`}
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
        </div> */}

        {/* Admin Actions - Only visible when logged in */}
        {isLoggedIn && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-card/90 hover:bg-muted backdrop-blur-sm"
                onClick={() => onEdit?.(species)}
              >
                <Edit className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-card/90 hover:bg-destructive/10 backdrop-blur-sm"
                onClick={() => onDelete?.(species)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        )}

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
          {species.name}
        </h3>
        <p className="text-sm text-emerald-600 dark:text-emerald-400 italic mb-3 font-medium">
          {species.scientificName}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{species.description}</p>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}
