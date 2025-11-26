// components/animais-form.tsx

"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { Zap, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSpecies, type AnimalFormData } from "@/contexts/species-context"; // Importar tipos e hook
import { TiposAnimais } from "@/contexts/enum";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function AnimalForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados da imagem
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialFormData = {
    nomePopular: "",
    nomeCientifico: "",
    tipoAnimal: "",
    alimentacao: "",
    habitos: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { addAnimal } = useSpecies(); // Usar a nova função do contexto

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSelectChange = (value: string) => {
    // Agora 'value' será "AVES", "MAMIFEROS", etc.
    setFormData((prev) => ({ ...prev, tipoAnimal: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    const payload: AnimalFormData = {
      ...formData,
      imagem: imageFile,
    };

    try {
      await addAnimal(payload); // Chamar a API real
      setSuccess(true);
      setFormData(initialFormData);
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erro ao cadastrar animal:", err);
      setError("Não foi possível cadastrar o animal. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-foreground ">
          Cadastrar Novo Animal
        </h2>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-blue-50 ...">
          <CheckCircle className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-700">Animal cadastrado com sucesso!</p>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 ...">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nome Popular e Científico */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="nomePopularAnimal">Nome Popular *</Label>
            <Input
              id="nomePopularAnimal"
              placeholder="Ex: Bem-te-vi"
              value={formData.nomePopular}
              onChange={(e) =>
                setFormData({ ...formData, nomePopular: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </div>
          <div>
            <Label htmlFor="nomeCientificoAnimal">Nome Científico *</Label>
            <Input
              id="nomeCientificoAnimal"
              placeholder="Ex: Pitangus sulphuratus"
              value={formData.nomeCientifico}
              onChange={(e) =>
                setFormData({ ...formData, nomeCientifico: e.target.value })
              }
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {/* Tipo Animal e alimentacao (conforme API) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="tipoAnimal">Tipo de Animal *</Label>
            <Select
              value={formData.tipoAnimal}
              onValueChange={handleSelectChange}
              disabled={isLoading}
              required
            >
              <SelectTrigger className="bg-background w-full" id="tipoAnimal">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(TiposAnimais).map((key) => (
                  <SelectItem key={key} value={key}>
                    {TiposAnimais[key as keyof typeof TiposAnimais]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="alimentacaoAnimal">Alimentação</Label>
            <Input
              id="alimentacaoAnimal"
              placeholder="Ex: Insetívoro, Frugívoro"
              value={formData.alimentacao}
              onChange={(e) =>
                setFormData({ ...formData, alimentacao: e.target.value })
              }
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Hábitos (em vez de Alimentação) */}
        <div>
          <Label htmlFor="habitos">Hábitos</Label>
          <Input
            id="habitos"
            placeholder="Ex: Insetívoro, frugívoro, diurno"
            value={formData.habitos}
            onChange={(e) =>
              setFormData({ ...formData, habitos: e.target.value })
            }
            disabled={isLoading}
          />
        </div>

        {/* Input de Imagem com Preview */}
        <div>
          <Label className="text-sm font-medium mb-3 text-foreground block">
            Imagem
          </Label>
          <Label
            htmlFor="image-upload-animal"
            className="relative border-2 border-dashed text-foreground border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer block"
          >
            <Input
              id="image-upload-animal"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {imagePreview ? (
              <div className="relative h-32">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-blue-600 ...">Escolher imagem</p>
              </div>
            )}
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 ..."
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Cadastrar Animal"}
        </Button>
      </form>
    </div>
  );
}
