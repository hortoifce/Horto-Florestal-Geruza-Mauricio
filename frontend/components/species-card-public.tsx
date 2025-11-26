// components/species-card-public.tsx (VERSÃO ATUALIZADA)
"use client";

import Image from "next/image";
import Link from "next/link"; // 1. Importar o Link
import { Button } from "@/components/ui/button"; // 2. Importar o Button
import { Eye } from "lucide-react"; // 3. Importar um ícone (opcional)

interface Species {
  id: string;
  nomePopular: string;
  nomeCientifico: string;
  type: string;
  image: string;
}

interface SpeciesCardProps {
  species: Species;
  isLoggedIn?: boolean;
}

export function SpeciesCardPublic({ species }: SpeciesCardProps) {
  return (
    <div className="group bg-card text-card-foreground rounded-lg shadow-sm border border-border overflow-hidden card-hover animate-fade-in h-full flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <Image
          src={species.image || "/placeholder.svg"}
          alt={species.nomePopular}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* 4. Envolver o conteúdo de texto para crescer e empurrar o botão para baixo */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            {species.nomePopular}
          </h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-600 italic mb-3 font-medium">
            Nome Científico: {species.nomeCientifico}
          </p>
        </div>

        {/* 5. ADICIONADO O BOTÃO DE DETALHES */}
        <Link href={`/species/${species.id}`} passHref className="mt-4">
          <Button
            variant="outline"
            className="w-full transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 group-hover:border-emerald-500"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver detalhes
          </Button>
        </Link>
      </div>

      <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}