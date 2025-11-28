"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import api from "@/lib/api";

// 1. INTERFACE UNIFICADA
export interface Species {
  id: string;
  nomePopular: string;
  nomeCientifico: string;
  type: "tree" | "animal";
  image: string;
  utilidade?: string;
  // Campos de Planta
  familia?: string;
  origem?: string;
  formaPropagacao?: string;
  tiposPlanta?: string[];
  // Campos de Animal
  tipoAnimal?: string;
  habitos?: string;
  alimentacao?: string;
}

// 2. TIPOS DE FORMULÁRIO
export type PlantaFormData = {
  nomePopular: string;
  nomeCientifico: string;
  familia: string;
  origem: string;
  utilidade: string;
  formaPropagacao: string;
  tiposPlanta: string[];
  imagem?: File | null;
};
export type PlantaUpdateData = PlantaFormData;

export type AnimalFormData = {
  nomePopular: string;
  nomeCientifico: string;
  tipoAnimal: string;
  alimentacao: string;
  habitos: string;
  imagem?: File | null;
};
export type AnimalUpdateData = AnimalFormData;

// 3. CONTEXT TYPE
interface SpeciesContextType {
  species: Species[];
  isLoading: boolean;
  error: string | null;
  addPlanta: (data: PlantaFormData) => Promise<void>;
  addAnimal: (data: AnimalFormData) => Promise<void>;
  updatePlanta: (id: string, data: PlantaUpdateData) => Promise<void>;
  updateAnimal: (id: string, data: AnimalUpdateData) => Promise<void>;
  deleteSpecies: (id: string, type: "tree" | "animal") => Promise<void>;
  getSpeciesById: (id: string) => Species | undefined;
}

const SpeciesContext = createContext<SpeciesContextType | undefined>(undefined);

const BACKEND_URL = "https://backend-horto.onrender.com";

const getAbsoluteImageUrl = (imagemUrl: string | null | undefined) => {
  if (!imagemUrl) return "/placeholder.svg";
  if (imagemUrl.startsWith("http")) return imagemUrl;
  return `${BACKEND_URL}${imagemUrl}`;
};

const getOriginalId = (compositeId: string) => {
  return compositeId.split('_')[1];
}

export function SpeciesProvider({ children }: { children: ReactNode }) {
  const [species, setSpecies] = useState<Species[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 4. FETCH (GET)
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        setIsLoading(true);

        const [plantasResult, animaisResult] = await Promise.allSettled([
          api.get("/plantas"),
          api.get("/animais"),
        ]);

        let adaptedPlantas: Species[] = [];
        if (plantasResult.status === "fulfilled") {
          adaptedPlantas = plantasResult.value.data.map((planta: any) => ({
            ...planta,
            id: `tree_${planta.id.toString()}`,
            type: "tree",
            image: getAbsoluteImageUrl(planta.imagemUrl),
          }));
        } else {
          console.error("Erro ao buscar plantas:", plantasResult.reason);
        }

        let adaptedAnimais: Species[] = [];
        if (animaisResult.status === "fulfilled") {
          adaptedAnimais = animaisResult.value.data.map((animal: any) => ({
            ...animal,
            id: `animal_${animal.id.toString()}`,
            type: "animal",
            image: getAbsoluteImageUrl(animal.imagemUrl),
          }));
        } else {
          console.error("Erro ao buscar animais:", animaisResult.reason);
        }

        setSpecies([...adaptedPlantas, ...adaptedAnimais]);
      } catch (err) {
        console.error("Erro ao buscar espécies:", err);
        setError("Não foi possível carregar os dados.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  // 5. FUNÇÕES DE PLANTAS
  const addPlanta = async (data: PlantaFormData) => {
    try {
      const formData = new FormData();
      formData.append("nomePopular", data.nomePopular);
      formData.append("nomeCientifico", data.nomeCientifico);
      formData.append("familia", data.familia);
      formData.append("origem", data.origem);
      formData.append("utilidade", data.utilidade);
      formData.append("formaPropagacao", data.formaPropagacao);
      data.tiposPlanta.forEach((tipo) => formData.append("tiposPlanta", tipo));
      if (data.imagem) formData.append("imagem", data.imagem);

      const response = await api.post("/plantas", formData);

      const newPlantFromApi = response.data;
      const adaptedNewPlant: Species = {
        ...newPlantFromApi,
        id: `tree_${newPlantFromApi.id.toString()}`,
        type: "tree",
        image: getAbsoluteImageUrl(newPlantFromApi.imagemUrl),
      };
      setSpecies((prev) => [...prev, adaptedNewPlant]);
    } catch (err) {
      console.error("Erro ao adicionar planta:", err);
      throw err;
    }
  };

  const updatePlanta = async (id: string, data: PlantaUpdateData) => {
    try {
      const originalId = getOriginalId(id);

      const formData = new FormData();
      formData.append("nomePopular", data.nomePopular);
      formData.append("nomeCientifico", data.nomeCientifico);
      formData.append("familia", data.familia);
      formData.append("origem", data.origem);
      formData.append("utilidade", data.utilidade);
      formData.append("formaPropagacao", data.formaPropagacao);
      data.tiposPlanta.forEach((tipo) => formData.append("tiposPlanta", tipo));
      if (data.imagem) formData.append("imagem", data.imagem);

      // TÉCNICA DE SPOOFING: Envia como POST, mas avisa que é PATCH
      formData.append("_method", "PATCH");

      // Usamos POST porque o CORS do seu servidor aceita POST
      const response = await api.post(`/plantas/${originalId}`, formData);

      const updatedPlantFromApi = response.data;

      const adaptedUpdatedPlant: Species = (updatedPlantFromApi && updatedPlantFromApi.id) ? {
        ...updatedPlantFromApi,
        id: `tree_${updatedPlantFromApi.id.toString()}`,
        type: "tree",
        image: getAbsoluteImageUrl(updatedPlantFromApi.imagemUrl),
      } : {
        ...getSpeciesById(id)!,
        ...data,
      };

      setSpecies((prev) =>
        prev.map((s) => (s.id === id ? adaptedUpdatedPlant : s))
      );
    } catch (err) {
      console.error("Erro ao atualizar planta:", err);
      throw err;
    }
  };

  // 6. FUNÇÕES DE ANIMAIS
  const addAnimal = async (data: AnimalFormData) => {
    try {
      const formData = new FormData();
      formData.append("nomePopular", data.nomePopular);
      formData.append("nomeCientifico", data.nomeCientifico);
      formData.append("tipoAnimal", data.tipoAnimal);
      if (data.alimentacao) formData.append("alimentacao", data.alimentacao);
      if (data.habitos) formData.append("habitos", data.habitos);
      if (data.imagem) formData.append("imagem", data.imagem);

      const response = await api.post("/animais", formData);

      const newAnimalFromApi = response.data;
      const adaptedNewAnimal: Species = {
        ...newAnimalFromApi,
        id: `animal_${newAnimalFromApi.id.toString()}`,
        type: "animal",
        image: getAbsoluteImageUrl(newAnimalFromApi.imagemUrl),
      };
      setSpecies((prev) => [...prev, adaptedNewAnimal]);
    } catch (err) {
      console.error("Erro ao adicionar animal:", err);
      throw err;
    }
  };

  const updateAnimal = async (id: string, data: AnimalUpdateData) => {
    try {
      const originalId = getOriginalId(id);

      const formData = new FormData();
      formData.append("nomePopular", data.nomePopular);
      formData.append("nomeCientifico", data.nomeCientifico);
      formData.append("tipoAnimal", data.tipoAnimal);
      formData.append("alimentacao", data.alimentacao);
      formData.append("habitos", data.habitos);
      if (data.imagem) formData.append("imagem", data.imagem);

      // TÉCNICA DE SPOOFING
      formData.append("_method", "POST");

      // Usamos POST para evitar bloqueio de CORS
      const response = await api.post(`/animais/${originalId}`, formData);

      const updatedAnimalFromApi = response.data;

      const adaptedUpdatedAnimal: Species = (updatedAnimalFromApi && updatedAnimalFromApi.id) ? {
        ...updatedAnimalFromApi,
        id: `animal_${updatedAnimalFromApi.id.toString()}`,
        type: "animal",
        image: getAbsoluteImageUrl(updatedAnimalFromApi.imagemUrl),
      } : {
        ...getSpeciesById(id)!,
        ...data,
      };

      setSpecies((prev) =>
        prev.map((s) => (s.id === id ? adaptedUpdatedAnimal : s))
      );
    } catch (err) {
      console.error("Erro ao atualizar animal:", err);
      throw err;
    }
  };

  // 7. FUNÇÃO DELETE
  const deleteSpecies = async (id: string, type: "tree" | "animal") => {
    try {
      const originalId = getOriginalId(id);

      const endpoint = type === "tree"
        ? `/plantas/${originalId}`
        : `/animais/${originalId}`;

      await api.delete(endpoint);

      setSpecies((prevSpecies) => prevSpecies.filter((s) => s.id !== id));
    } catch (err) {
      console.error(`Erro ao excluir ${type}:`, err);
      throw err;
    }
  };

  const getSpeciesById = (id: string) => {
    return species.find((s) => s.id === id);
  };

  return (
    <SpeciesContext.Provider
      value={{
        species,
        isLoading,
        error,
        addPlanta,
        addAnimal,
        updatePlanta,
        updateAnimal,
        deleteSpecies,
        getSpeciesById,
      }}
    >
      {children}
    </SpeciesContext.Provider>
  );
}

export function useSpecies() {
  const context = useContext(SpeciesContext);
  if (!context) {
    throw new Error("useSpecies must be used within a SpeciesProvider");
  }
  return context;
}

export enum TiposAnimais {
  MAMIFEROS = "Mamífero",
  ARTROPODES = "Artrópode",
  REPTEIS = "Réptil",
  PEIXES = "Peixe",
  FUNGOS = "Fungo",
  AVES = "Ave",
}