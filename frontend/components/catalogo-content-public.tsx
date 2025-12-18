"use client";

import { useState, useEffect } from "react";
import { Bird, Search, TreePine, ArrowDownAZ, ArrowUpZA } from "lucide-react"; // 1. Ícones novos
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // 2. Import do Button
import { SpeciesCardPublic } from "@/components/species-card-public";
import { useSpecies } from "@/contexts/species-context";
import { PaginationButton } from "./catalog-content";

export function CatalogContentPublic() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<"trees" | "animals">("trees");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 3. Estado da ordem
    const [isVisible, setIsVisible] = useState(false);

    // Estados de paginação
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 3;

    const { species, isLoading, error } = useSpecies();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // efeito para escutar a paginação
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeTab]); // Reseta página ao mudar ordem

    useEffect(() => {
        if (window.innerWidth < 768) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }, [currentPage]);

    // Filtra primeiro
    const filteredSpecies = species.filter(
        (s) =>
            (activeTab === "trees" ? s.type === "tree" : s.type === "animal") &&
            (s.nomePopular.toLowerCase().includes(searchTerm.toLowerCase()) ||
                s.nomeCientifico.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // 4. Ordena depois (Frontend Sort)
    const sortedSpecies = [...filteredSpecies].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.nomePopular.localeCompare(b.nomePopular);
        } else {
            return b.nomePopular.localeCompare(a.nomePopular);
        }
    });

    // --- LÓGICA DE PAGINAÇÃO (Usando sortedSpecies) ---
    const totalPages = Math.ceil(sortedSpecies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedSpecies = sortedSpecies.slice(startIndex, endIndex);

    const treeCount = species.filter((s) => s.type === "tree").length;
    const animalCount = species.filter((s) => s.type === "animal").length;

    // Função para alternar a ordem
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    if (isLoading) {
        return <div className="p-8 text-center">Carregando espécies... 🍃</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>;
    }

    return (
        <>
            <div
                className={`p-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
                {/* Search and Sort Section */}
                <div className="mb-8 animate-slide-up">
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground w-5 h-5 transition-colors" />
                            <Input
                                type="text"
                                placeholder="Buscar espécies..."
                                className="pl-10 border border-input text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* 5. Botão de Ordenação */}
                        <Button
                            variant="outline"
                            onClick={toggleSortOrder}
                            className="flex items-center gap-2 min-w-[140px] justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title={`Ordenar ${sortOrder === "asc" ? "Z-A" : "A-Z"}`}
                        >
                            <span className="text-sm">
                                {sortOrder === "asc" ? "Ordem: A-Z" : "Ordem: Z-A"}
                            </span>
                            {sortOrder === "asc" ? (
                                <ArrowDownAZ className="w-4 h-4 text-emerald-600" />
                            ) : (
                                <ArrowUpZA className="w-4 h-4 text-emerald-600" />
                            )}
                        </Button>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedSpecies.length > 0 ? (
                        paginatedSpecies.map((s, index) => (
                            <div key={s.id} className="animate-fade-in" style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
                                <SpeciesCardPublic species={s} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 animate-fade-in">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    {activeTab === "trees" ? (
                                        <TreePine className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                                    ) : (
                                        <Bird className="w-8 h-8 text-gray-400 dark:text-gray-500" />
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
            </div>
        </>
    )
}