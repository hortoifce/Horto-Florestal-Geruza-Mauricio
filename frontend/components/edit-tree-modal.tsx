"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // <--- IMPORTANTE: Adicionado para corrigir o erro
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { TreePine, Upload, Loader2 } from "lucide-react";
import type { Species, PlantaUpdateData } from "@/contexts/species-context";

interface EditTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  species: Species | null;
  onSave: (id: string, data: PlantaUpdateData) => Promise<void>;
}

export function EditTreeModal({
  isOpen,
  onClose,
  species,
  onSave,
}: EditTreeModalProps) {
  const [formData, setFormData] = useState({
    nomePopular: "",
    nomeCientifico: "",
    familia: "",
    origem: "",
    tiposPlanta: [] as string[],
    utilidade: "",
    formaPropagacao: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (species) {
      setFormData({
        nomePopular: species.nomePopular || "",
        nomeCientifico: species.nomeCientifico || "",
        familia: species.familia || "",
        origem: species.origem || "",
        tiposPlanta: species.tiposPlanta || [],
        utilidade: species.utilidade || "",
        formaPropagacao: species.formaPropagacao || "",
      });
      setImagePreview(species.image || null);
      setImageFile(null);
    }
  }, [species]);

  const handleCharacteristicChange = (
    characteristic: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      tiposPlanta: checked
        ? [...prev.tiposPlanta, characteristic]
        : prev.tiposPlanta.filter((c) => c !== characteristic),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(species?.image || null);
    }
  };

  const handleSave = async () => {
    if (!species) return;
    setIsLoading(true);

    try {
      const payload: PlantaUpdateData = {
        ...formData,
        imagem: imageFile,
      };

      await onSave(species.id, payload);
      onClose();
    } catch (err) {
      console.error("Falha ao salvar:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      nomePopular: "",
      nomeCientifico: "",
      familia: "",
      origem: "",
      tiposPlanta: [],
      utilidade: "",
      formaPropagacao: "",
    });
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <TreePine className="w-5 h-5" />
            Editar Árvore
          </DialogTitle>
          {/* CORREÇÃO DO ERRO DE ACESSIBILIDADE */}
          <DialogDescription>
            Atualize as informações e características da planta abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Nome Popular e Científico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomePopular">Nome Popular *</Label>
              <Input
                id="nomePopular"
                value={formData.nomePopular}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nomePopular: e.target.value }))
                }
                placeholder="Ex: Ipê Amarelo"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeCientifico">Nome Científico *</Label>
              <Input
                id="nomeCientifico"
                value={formData.nomeCientifico}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nomeCientifico: e.target.value }))
                }
                placeholder="Ex: Handroanthus albus"
              />
            </div>
          </div>

          {/* Família e Origem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="familia">Família</Label>
              <Input
                id="familia"
                value={formData.familia}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, familia: e.target.value }))
                }
                placeholder="Ex: Bignoniaceae"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origem">Origem</Label>
              <Input
                id="origem"
                value={formData.origem}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, origem: e.target.value }))
                }
                placeholder="Ex: Brasil - Cerrado"
              />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-3">
            <Label>Características</Label>
            <div className="flex flex-wrap gap-4">
              {[
                { key: "ORNAMENTAL", label: "Ornamental" },
                { key: "FRUTIFERA", label: "Frutífera" },
                { key: "MEDICINAL", label: "Medicinal" },
              ].map((plantType) => (
                <div key={plantType.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={plantType.key}
                    checked={formData.tiposPlanta.includes(plantType.key)}
                    onCheckedChange={(checked) =>
                      handleCharacteristicChange(plantType.key, checked as boolean)
                    }
                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <Label htmlFor={plantType.key} className="text-sm font-normal">
                    {plantType.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Utilidade e Propagação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="utilidade">Utilidade</Label>
              <Input
                id="utilidade"
                value={formData.utilidade}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, utilidade: e.target.value }))
                }
                placeholder="Ex: Paisagismo, madeira"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formaPropagacao">Forma de Propagação</Label>
              <Input
                id="formaPropagacao"
                value={formData.formaPropagacao}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, formaPropagacao: e.target.value }))
                }
                placeholder="Ex: Sementes, mudas"
              />
            </div>
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image-upload-modal">Imagem</Label>
            {imagePreview && (
              <div className="relative h-32 w-full mb-2 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <Label
              htmlFor="image-upload-modal"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
            >
              <Upload className="w-4 h-4" />
              {imageFile ? "Trocar imagem" : "Escolher nova imagem"}
            </Label>
            <Input
              id="image-upload-modal"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !formData.nomePopular || !formData.nomeCientifico}
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}