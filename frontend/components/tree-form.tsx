// components/TreeForm.tsx (VERSÃO ATUALIZADA)
"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image"; // Importar Image para o preview
import { TreePine, Upload, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
// ALTERADO: Importar o tipo de payload correto do contexto
import { useSpecies, type PlantaFormData } from "@/contexts/species-context";

export function TreeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ALTERADO: Adicionado estado para o arquivo de imagem e preview
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const initialFormData = {
    nomePopular: "",
    nomeCientifico: "",
    familia: "",
    origem: "",
    utilidade: "",
    formaPropagacao: "",
    tiposPlanta: {
      ORNAMENTAL: false,
      FRUTIFERA: false,
      MEDICINAL: false,
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const { addPlanta } = useSpecies();

  // ALTERADO: Handler para mudança de imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Criar URL temporária para preview
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    const tiposPlantaArray = Object.entries(formData.tiposPlanta)
      .filter(([, isChecked]) => isChecked)
      .map(([typeName]) => typeName);

    if (tiposPlantaArray.length === 0) {
      setError("Selecione ao menos uma característica.");
      setIsLoading(false);
      return;
    }

    // ALTERADO: Payload agora corresponde a 'PlantaFormData' e inclui o arquivo
    const payload: PlantaFormData = {
      nomePopular: formData.nomePopular,
      nomeCientifico: formData.nomeCientifico,
      familia: formData.familia,
      origem: formData.origem,
      utilidade: formData.utilidade,
      formaPropagacao: formData.formaPropagacao,
      tiposPlanta: tiposPlantaArray,
      imagem: imageFile, // Adiciona o arquivo de imagem
    };

    try {
      await addPlanta(payload);
      setSuccess(true);
      setFormData(initialFormData);
      // ALTERADO: Limpar o estado da imagem
      setImageFile(null);
      setImagePreview(null);
      setTimeout(() => setSuccess(false), 4000);
    } catch (apiError) {
      console.error("Erro ao cadastrar árvore:", apiError);
      setError("Não foi possível cadastrar a árvore. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <TreePine className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold text-foreground ">Cadastrar Nova Árvore</h2>
      </div>

      {/* Mensagem de Sucesso */}
      {success && (
        <div className="mb-6 p-4 bg-emerald-50 ...">
          <CheckCircle className="w-5 h-5 text-emerald-600" />
          <p className="text-sm text-emerald-700">Árvore cadastrada com sucesso!</p>
        </div>
      )}

      {/* ADICIONADO: Mensagem de Erro */}
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* O formulário continua o mesmo... */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="nomePopular" className="text-sm font-medium text-foreground ">
              Nome Popular *
            </Label>
            <Input
              id="nomePopular"
              placeholder="Ex: Ipê Amarelo"
              value={formData.nomePopular}
              onChange={(e) => setFormData({ ...formData, nomePopular: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="nomeCientifico" className="text-sm font-medium text-foreground ">
              Nome Científico *
            </Label>
            <Input
              id="nomeCientifico"
              placeholder="Ex: Handroanthus albus"
              value={formData.nomeCientifico}
              onChange={(e) => setFormData({ ...formData, nomeCientifico: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="familia" className="text-sm font-medium text-foreground ">
              Família *
            </Label>
            <Input
              id="familia"
              placeholder="Ex: Bignoniaceae"
              value={formData.familia}
              onChange={(e) => setFormData({ ...formData, familia: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="origem" className="text-sm font-medium text-foreground ">
              Origem
            </Label>
            <Input
              id="origem"
              placeholder="Ex: Brasil - Cerrado"
              value={formData.origem}
              onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground  mb-3 block">Características</Label>
          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ornamental"
                checked={formData.tiposPlanta.ORNAMENTAL}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    tiposPlanta: { ...formData.tiposPlanta, ORNAMENTAL: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="ornamental" className="text-sm text-foreground">
                Ornamental
              </Label>
            </div>

            {/* CHECKBOX FRUTÍFERA */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="frutifera"
                checked={formData.tiposPlanta.FRUTIFERA}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    tiposPlanta: { ...formData.tiposPlanta, FRUTIFERA: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="frutifera" className="text-sm text-foreground">
                Frutífera
              </Label>
            </div>

            {/* CHECKBOX MEDICINAL */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicinal"
                checked={formData.tiposPlanta.MEDICINAL}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    tiposPlanta: { ...formData.tiposPlanta, MEDICINAL: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="medicinal" className="text-sm text-foreground">
                Medicinal
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="utilidade" className="text-sm font-medium text-foreground ">
              Utilidade
            </Label>
            <Input
              id="utilidade"
              placeholder="Ex: Paisagismo, madeira, sombra"
              value={formData.utilidade}
              onChange={(e) => setFormData({ ...formData, utilidade: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="formaPropagacao" className="text-sm font-medium text-foreground ">
              Forma de Propagação
            </Label>
            <Input
              id="formaPropagacao"
              placeholder="Ex: Sementes, mudas, estacas"
              value={formData.formaPropagacao}
              onChange={(e) => setFormData({ ...formData, formaPropagacao: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground mb-3 block">
            Imagem
          </Label>
          <Label
            htmlFor="image-upload"
            className="relative border-2 border-dashed text-foreground border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer block"
          >
            {/* Input de arquivo real, mas escondido */}
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageChange}
              disabled={isLoading}
            />

            {/* Lógica de Preview */}
            {imagePreview ? (
              <div className="relative h-32">
                <Image
                  src={imagePreview}
                  alt="Preview da imagem"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  Escolher Imagem
                </p>
              </div>
            )}
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Cadastrar Árvore"}
        </Button>
      </form>
    </div>
  )
}
