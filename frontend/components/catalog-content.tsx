"use client"

import { useState, useEffect } from "react"
import { Search, TreePine, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SpeciesCard } from "@/components/species-card"
import { EditTreeModal } from "@/components/edit-tree-modal"
import { EditAnimalModal } from "@/components/edit-animal-modal"
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal"
import { useSpecies } from "@/contexts/species-context"

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

export function CatalogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"trees" | "animals">("trees")
  const [isVisible, setIsVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Modal states
  const [editTreeModalOpen, setEditTreeModalOpen] = useState(false)
  const [editAnimalModalOpen, setEditAnimalModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null)

  const { species, updateSpecies, deleteSpecies } = useSpecies()

  useEffect(() => {
    setIsVisible(true)
    // Check if user is logged in
    const authStatus = localStorage.getItem("isAuthenticated")
    setIsLoggedIn(authStatus === "true")
  }, [])

  const filteredSpecies = species.filter(
    (species) =>
      (activeTab === "trees" ? species.type === "tree" : species.type === "animal") &&
      (species.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        species.scientificName.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleEdit = (species: Species) => {
    setSelectedSpecies(species)
    if (species.type === "tree") {
      setEditTreeModalOpen(true)
    } else {
      setEditAnimalModalOpen(true)
    }
  }

  const handleDelete = (species: Species) => {
    setSelectedSpecies(species)
    setDeleteModalOpen(true)
  }

  const handleSaveEdit = (updatedSpecies: Species) => {
    updateSpecies(updatedSpecies.id, updatedSpecies)
  }

  const handleConfirmDelete = () => {
    if (selectedSpecies) {
      deleteSpecies(selectedSpecies.id)
      setSelectedSpecies(null)
    }
  }

  const treeCount = species.filter((s) => s.type === "tree").length
  const animalCount = species.filter((s) => s.type === "animal").length

  return (
    <>
      <div
        className={`p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Search */}
        <div className="mb-8 animate-slide-up">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-5 h-5 transition-colors" />
            <Input
              type="text"
              placeholder="Buscar espécies..."
              className="pl-10 border border-input  text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />

          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("trees")}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "trees"
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              <TreePine className="w-5 h-5" />
              Árvores ({treeCount})
            </button>
            <button
              onClick={() => setActiveTab("animals")}
              className={`flex items-center gap-2 pb-2 border-b-2 transition-all duration-300 transform hover:scale-105 ${activeTab === "animals"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
            >
              <Zap className="w-5 h-5" />
              Animais ({animalCount})
            </button>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecies.length > 0 ? (
            filteredSpecies.map((species, index) => (
              <div key={species.id} className="animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                <SpeciesCard
                  species={species}
                  isLoggedIn={isLoggedIn}
                  onEdit={() => handleEdit(species)}
                  onDelete={() => handleDelete(species)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {activeTab === "trees" ? (
                    <TreePine className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  ) : (
                    <Zap className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                  {activeTab === "trees" ? "Nenhuma árvore encontrada" : "Nenhum animal encontrado"}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  {searchTerm
                    ? "Tente ajustar sua busca ou limpar o filtro"
                    : `Use o painel administrativo para adicionar ${activeTab === "trees" ? "árvores" : "animais"} ao catálogo`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EditTreeModal
        isOpen={editTreeModalOpen}
        onClose={() => {
          setEditTreeModalOpen(false)
          setSelectedSpecies(null)
        }}
        species={selectedSpecies}
        onSave={handleSaveEdit}
      />

      <EditAnimalModal
        isOpen={editAnimalModalOpen}
        onClose={() => {
          setEditAnimalModalOpen(false)
          setSelectedSpecies(null)
        }}
        species={selectedSpecies}
        onSave={handleSaveEdit}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedSpecies(null)
        }}
        onConfirm={handleConfirmDelete}
        itemName={selectedSpecies?.name || ""}
        itemType={selectedSpecies?.type === "tree" ? "árvore" : "animal"}
      />
    </>
  )
}
