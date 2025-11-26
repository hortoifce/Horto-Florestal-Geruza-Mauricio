// app/admin/catalog/[id]/page.tsx (VERSÃO ATUALIZADA)
"use client";

import { useParams, useRouter } from "next/navigation";
import { useSpecies } from "../../../../../contexts/species-context";
import Image from "next/image";
import { Button } from "../../../../../components/ui/button";
import {
    ArrowLeft,
    Sprout,
    Dna,
    Leaf,
    Network,
    Trees,
    PawPrint, // <-- MUDANÇA: Ícone animal
    ClipboardList, // <-- MUDANÇA: Ícone animal
    Apple, // <-- MUDANÇA: Ícone animal
} from "lucide-react";

// <-- MUDANÇA: DetailItem atualizado para aceitar 'iconClassName'
const DetailItem = ({
    label,
    value,
    icon: Icon,
    iconClassName, // <-- MUDANÇA
}: {
    label: string;
    value: string | string[] | undefined;
    icon: React.ElementType;
    iconClassName?: string; // <-- MUDANÇA
}) => {
    if (!value) return null;
    const displayValue = Array.isArray(value) ? value.join(", ") : value;

    return (
        <div className="flex items-start gap-4 py-3">
            {/* <-- MUDANÇA: Usa a classe dinâmica ou o padrão */}
            <Icon
                className={
                    iconClassName || "h-5 w-5 text-emerald-600 mt-1 flex-shrink-0"
                }
            />
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-base text-card-foreground">{displayValue}</p>
            </div>
        </div>
    );
};

export default function SpeciesDetailPage() {
    const params = useParams();
    const router = useRouter(); // Funcionalidade de Admin mantida
    const { getSpeciesById, isLoading } = useSpecies();

    const id = params.id as string;
    const species = getSpeciesById(id);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Carregando dados da espécie...
            </div>
        );
    }

    if (!species) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <p className="text-lg">Espécie não encontrada.</p>
                {/* Funcionalidade de Admin mantida: router.back() */}
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
            </div>
        );
    }

    // --- MUDANÇA: LÓGICA DE TEMA DINÂMICO (copiada da pág. pública) ---
    const isTree = species.type === "tree";
    const themeColor = isTree ? "emerald" : "blue";
    const iconClassName = `h-5 w-5 text-${themeColor}-600 dark:text-${themeColor}-400 mt-1 flex-shrink-0`;
    // ---------------------------------

    // Página de Detalhes (Admin)
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            {/* Funcionalidade de Admin mantida: router.back() */}
            <Button onClick={() => router.back()} variant="outline" className="mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
            </Button>

            <div className="flex flex-col gap-8">
                {/* 1. Imagem (Layout mantido) */}
                <div className="w-full">
                    <div className="relative w-full overflow-hidden rounded-lg shadow-xl border aspect-[4/3]">
                        <Image
                            src={species.image || "/placeholder.svg"}
                            alt={species.nomePopular}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* 2. Detalhes (Layout mantido) */}
                <div className="w-full bg-card p-6 rounded-lg border shadow-sm">
                    {/* <-- MUDANÇA: Cores dinâmicas */}
                    <h1
                        className={`text-3xl font-bold text-${themeColor}-600 dark:text-${themeColor}-400`}
                    >
                        Nome Popular: {species.nomePopular}
                    </h1>
                    <p
                        className={`text-xl italic text-${themeColor}-800 dark:text-${themeColor}-600 mb-4 font-medium`}
                    >
                        Nome Científico: {species.nomeCientifico}
                    </p>

                    {/* --- MUDANÇA: LÓGICA CONDICIONAL (copiada da pág. pública) --- */}
                    <div className="divide-y border-t">
                        {/* Campos de Árvore (Plantas) */}
                        {isTree && (
                            <>
                                <DetailItem
                                    label="Utilidade"
                                    value={species.utilidade}
                                    icon={Leaf}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Família"
                                    value={species.familia}
                                    icon={Network}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Origem"
                                    value={species.origem}
                                    icon={Dna}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Forma de Propagação"
                                    value={species.formaPropagacao}
                                    icon={Sprout}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Tipo da Planta"
                                    value={species.tiposPlanta}
                                    icon={Trees}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                            </>
                        )}

                        {/* Campos de Animal */}
                        {!isTree && (
                            <>
                                <DetailItem
                                    label="Alimentação"
                                    value={species.alimentacao}
                                    icon={Apple}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Tipo de Animal"
                                    value={species.tipoAnimal}
                                    icon={PawPrint}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                                <DetailItem
                                    label="Hábitos"
                                    value={species.habitos}
                                    icon={ClipboardList}
                                    iconClassName={iconClassName} // <-- MUDANÇA
                                />
                            </>
                        )}
                    </div>
                    {/* --- FIM DA LÓGICA CONDICIONAL --- */}
                </div>
            </div>
        </div>
    );
}