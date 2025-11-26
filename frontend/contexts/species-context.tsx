"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Species {
  id: number
  name: string
  scientificName: string
  type: string
  image: string
  description: string
  qrCode: string
  family?: string
  origin?: string
  characteristics?: string[]
  utility?: string
  propagation?: string
  diet?: string
}

interface SpeciesContextType {
  species: Species[]
  addSpecies: (species: Species) => void
  updateSpecies: (id: number, updatedSpecies: Species) => void
  deleteSpecies: (id: number) => void
  getSpeciesById: (id: number) => Species | undefined
}

const SpeciesContext = createContext<SpeciesContextType | undefined>(undefined)

const initialSpecies: Species[] = [
  {
    id: 1,
    name: "Ipê Amarelo",
    scientificName: "Handroanthus albus",
    type: "tree",
    image: "/ipe-amarelo-yellow-flowers.png",
    description:
      "O Ipê Amarelo é uma das árvores mais emblemáticas do Brasil, conhecida por suas flores amarelas vibrantes que florescem no inverno e primavera. É amplamente utilizada no paisagismo urbano e possui madeira de alta qualidade.",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
    family: "Bignoniaceae",
    origin: "Brasil - Cerrado",
    characteristics: ["Ornamental", "Medicinal"],
    utility: "Paisagismo, madeira, sombra",
    propagation: "Sementes, mudas",
  },
  {
    id: 2,
    name: "Pau-Brasil",
    scientificName: "Paubrasilia echinata",
    type: "tree",
    image: "/pau-brasil-forest.png",
    description:
      "O Pau-Brasil é a árvore que deu nome ao nosso país. Historicamente explorada pela sua madeira avermelhada usada para tingir tecidos, hoje é uma espécie protegida e símbolo nacional.",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
    family: "Fabaceae",
    origin: "Brasil - Mata Atlântica",
    characteristics: ["Ornamental"],
    utility: "Madeira nobre, corante natural",
    propagation: "Sementes",
  },
  {
    id: 3,
    name: "Jacarandá Mimoso",
    scientificName: "Jacaranda mimosifolia",
    type: "tree",
    image: "/placeholder-n2svy.png",
    description:
      "O Jacarandá Mimoso é amplamente cultivado no mundo todo por suas espetaculares flores roxas que cobrem completamente a copa da árvore durante a floração, criando um espetáculo visual único.",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
    family: "Bignoniaceae",
    origin: "Argentina",
    characteristics: ["Ornamental"],
    utility: "Paisagismo urbano, sombra",
    propagation: "Sementes, mudas",
  },
  {
    id: 4,
    name: "Pássaro bem-te-vi",
    scientificName: "passarus benstivis",
    type: "animal",
    image: "/bentevi.jpg",
    description:
      "Passarin massa",
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyMCIgeT0iMjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
    family: "Passaraiada",
    origin: "Brasil porra",
    diet: "Semente",
  },
]

export function SpeciesProvider({ children }: { children: ReactNode }) {
  const [species, setSpecies] = useState<Species[]>(initialSpecies)

  const addSpecies = (newSpecies: Species) => {
    setSpecies((prev) => [...prev, { ...newSpecies, id: Date.now() }])
  }

  const updateSpecies = (id: number, updatedSpecies: Species) => {
    setSpecies((prev) => prev.map((species) => (species.id === id ? updatedSpecies : species)))
  }

  const deleteSpecies = (id: number) => {
    setSpecies((prev) => prev.filter((species) => species.id !== id))
  }

  const getSpeciesById = (id: number) => {
    return species.find((species) => species.id === id)
  }

  return (
    <SpeciesContext.Provider
      value={{
        species,
        addSpecies,
        updateSpecies,
        deleteSpecies,
        getSpeciesById,
      }}
    >
      {children}
    </SpeciesContext.Provider>
  )
}

export function useSpecies() {
  const context = useContext(SpeciesContext)
  if (!context) {
    throw new Error("useSpecies must be used within a SpeciesProvider")
  }
  return context
}
