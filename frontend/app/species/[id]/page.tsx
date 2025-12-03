// app/species/[id]/page.tsx (VERSÃO ATUALIZADA)
"use client";

import { useParams, useRouter } from "next/navigation";
import { useSpecies } from "@/contexts/species-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    ArrowLeft,
    Sprout,
    Dna,
    Leaf,
    Network,
    Trees,
    PawPrint, // <-- ÍCONE ANIMAL
    ClipboardList, // <-- ÍCONE ANIMAL
    Apple, // <-- ÍCONE ANIMAL
} from "lucide-react";


export const metadata = {
    title: "Espécies de Plantas/Animais – Lista Completa | Horto Florestal Geruza & Maurício",
    description:
        "Explore nossa lista de espécies disponíveis no horto. Informações sobre nome científico, uso ornamental, características e muito mais.",
};

// ATUALIZADO: DetailItem agora aceita 'iconClassName' para cor dinâmica
const DetailItem = ({
    label,
    value,
    icon: Icon,
    iconClassName, // <-- NOVO
}: {
    label: string;
    value: string | string[] | undefined;
    icon: React.ElementType;
    iconClassName?: string; // <-- NOVO
}) => {
    if (!value) return null;
    const displayValue = Array.isArray(value) ? value.join(", ") : value;

    return (
        <div className="flex items-start gap-4 py-3">
            {/* ATUALIZADO: Usa a classe dinâmica ou o padrão */}
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

export default function PublicSpeciesDetailPage() {
    const params = useParams();
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
                <Link href="/catalogo-publico">
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
                    </Button>
                </Link>
            </div>
        );
    }

    // --- LÓGICA DE TEMA DINÂMICO ---
    const isTree = species.type === "tree";
    const themeColor = isTree ? "emerald" : "blue";
    const iconClassName = `h-5 w-5 text-${themeColor}-600 dark:text-${themeColor}-400 mt-1 flex-shrink-0`;
    // ---------------------------------

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8">
            {/* O Link para /catalogo-publico estava correto */}
            <Link href="/catalogo-publico" passHref>
                <Button variant="outline" className="mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Catálogo
                </Button>
            </Link>

            <div className="flex flex-col gap-8">
                {/* 1. Imagem */}
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

                {/* 2. Detalhes */}
                <div className="w-full bg-card p-6 rounded-lg border shadow-sm">
                    {/* ATUALIZADO: Cores dinâmicas */}
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

                    {/* --- ATUALIZADO: LÓGICA CONDICIONAL --- */}
                    <div className="divide-y border-t">
                        {/* Campos de Árvore (Plantas) */}
                        {isTree && (
                            <>
                                <DetailItem
                                    label="Utilidade"
                                    value={species.utilidade}
                                    icon={Leaf}
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Família"
                                    value={species.familia}
                                    icon={Network}
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Origem"
                                    value={species.origem}
                                    icon={Dna}
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Forma de Propagação"
                                    value={species.formaPropagacao}
                                    icon={Sprout}
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Tipo da Planta"
                                    value={species.tiposPlanta}
                                    icon={Trees}
                                    iconClassName={iconClassName}
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
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Tipo de Animal"
                                    value={species.tipoAnimal} // TODO: Mapear a chave para o valor do Enum se desejar
                                    icon={PawPrint}
                                    iconClassName={iconClassName}
                                />
                                <DetailItem
                                    label="Hábitos"
                                    value={species.habitos}
                                    icon={ClipboardList}
                                    iconClassName={iconClassName}
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