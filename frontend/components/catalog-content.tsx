// components/CatalogContent.tsx (VERSÃO ATUALIZADA)
"use client";

import { useState, useEffect } from "react";
import { Bird, Search, TreePine } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SpeciesCard } from "@/components/species-card";
import { EditTreeModal } from "@/components/edit-tree-modal";
import { DeleteConfirmationModal } from "@/components/delete-confirmation-modal";
import { EditAnimalModal } from "@/components/edit-animal-modal";
import {
  useSpecies, type Species, type PlantaUpdateData,
  type AnimalUpdateData,
} from "@/contexts/species-context";
import { useRouter } from "next/navigation";

export const PaginationButton = ({ children, onClick, disabled }: { children: React.ReactNode, onClick: () => void, disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
  >
    {children}
  </button>
);

export function CatalogContent() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"trees" | "animals">("trees");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [editTreeModalOpen, setEditTreeModalOpen] = useState(false);
  const [editAnimalModalOpen, setEditAnimalModalOpen] = useState(false); // 3. Estado para modal de animal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);

  const { species,
    isLoading,
    error,
    updatePlanta,
    updateAnimal,
    deleteSpecies, } = useSpecies();

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setIsVisible(true);
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsLoggedIn(authStatus === "true");
  }, []);

  // efeito para escutar a paginação
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab]);

  const filteredSpecies = species.filter(
    (s) =>
      (activeTab === "trees" ? s.type === "tree" : s.type === "animal") &&
      (s.nomePopular.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.nomeCientifico.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // --- LÓGICA DE PAGINAÇÃO ---
  const totalPages = Math.ceil(filteredSpecies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedSpecies = filteredSpecies.slice(startIndex, endIndex);

  const handleDetails = (species: Species) => {
    router.push(`/admin/catalog/${species.id}`);
  };

  const handleEdit = (species: Species) => {
    setSelectedSpecies(species);
    if (species.type === "tree") {
      setEditTreeModalOpen(true);
    } else {
      setEditAnimalModalOpen(true);
    }
  };

  const handleDelete = (species: Species) => {
    setSelectedSpecies(species);
    setDeleteModalOpen(true);
  };

  const handleSaveTreeEdit = async (id: string, data: PlantaUpdateData) => {
    await updatePlanta(id, data);
  };

  const handleSaveAnimalEdit = async (id: string, data: AnimalUpdateData) => {
    await updateAnimal(id, data);
  };

  const handleConfirmDelete = async () => {
    if (selectedSpecies) {
      await deleteSpecies(selectedSpecies.id, selectedSpecies.type);
      setSelectedSpecies(null);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Carregando...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  const treeCount = species.filter((s) => s.type === "tree").length;
  const animalCount = species.filter((s) => s.type === "animal").length;

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
              onChange={(e) => setSearchTerm(e.target.value)}
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
              <Bird className="w-5 h-5" />
              Animais ({animalCount})
            </button>
          </div>
        </div>

        {/* Species Grid */}
        <div className="min-h-[350px]">
          {paginatedSpecies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedSpecies.map((s) => (
                <SpeciesCard
                  key={s.id}
                  species={s}
                  isLoggedIn={isLoggedIn}
                  onEdit={() => handleEdit(s)}
                  onDelete={() => handleDelete(s)}
                  onDetails={() => handleDetails(s)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400 py-12">
              <p className="text-lg font-medium">
                Nenhum {activeTab === "trees" ? "registro de árvore" : "animal"} encontrado.
              </p>
              <p className="text-sm">
                {searchTerm
                  ? "Tente ajustar sua busca ou limpar o campo de pesquisa."
                  : "Adicione novas espécies para vê-las aqui."}
              </p>
            </div>
          )}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            Anterior
          </PaginationButton>

          <span className="text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </span>

          <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Próximo
          </PaginationButton>
        </div>
      )}

      {/* Modals */}
      <EditTreeModal
        isOpen={editTreeModalOpen}
        onClose={() => setEditTreeModalOpen(false)}
        species={selectedSpecies}
        onSave={handleSaveTreeEdit}
      />

      <EditAnimalModal
        isOpen={editAnimalModalOpen}
        onClose={() => setEditAnimalModalOpen(false)}
        species={selectedSpecies}
        onSave={handleSaveAnimalEdit}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedSpecies?.nomePopular || ""}
        itemType={selectedSpecies?.type === "tree" ? "árvore" : "animal"}
      />
    </>
  )
}
