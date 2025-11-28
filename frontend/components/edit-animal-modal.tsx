"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // <--- IMPORTANTE: Adicionado
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Upload, Loader2 } from "lucide-react";
import { type Species, type AnimalUpdateData } from "@/contexts/species-context";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TiposAnimais } from "@/contexts/enum";

interface EditAnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  species: Species | null;
  onSave: (id: string, data: AnimalUpdateData) => Promise<void>;
}

export function EditAnimalModal({
  isOpen,
  onClose,
  species,
  onSave,
}: EditAnimalModalProps) {
  const [formData, setFormData] = useState({
    nomePopular: "",
    nomeCientifico: "",
    tipoAnimal: "",
    alimentacao: "",
    habitos: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (species) {
      setFormData({
        nomePopular: species.nomePopular || "",
        nomeCientifico: species.nomeCientifico || "",
        tipoAnimal: species.tipoAnimal || "",
        alimentacao: species.alimentacao || "",
        habitos: species.habitos || "",
      });
      setImagePreview(species.image || null);
      setImageFile(null);
    }
  }, [species]);

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

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoAnimal: value }));
  };

  const handleSave = async () => {
    if (!species) return;
    setIsLoading(true);

    const payload: AnimalUpdateData = {
      ...formData,
      imagem: imageFile,
    };

    try {
      await onSave(species.id, payload);
      onClose();
    } catch (err) {
      console.error("Falha ao salvar animal:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      nomePopular: "",
      nomeCientifico: "",
      tipoAnimal: "",
      alimentacao: "",
      habitos: "",
    });
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Zap className="w-5 h-5" />
            Editar Animal
          </DialogTitle>
          {/* CORREÇÃO DO ERRO DE ACESSIBILIDADE */}
          <DialogDescription>
            Edite os detalhes do animal selecionado abaixo.
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
                placeholder="Ex: Bem-te-vi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nomeCientifico">Nome Científico *</Label>
              <Input
                id="nomeCientifico"
                value={formData.nomeCientifico}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    nomeCientifico: e.target.value,
                  }))
                }
                placeholder="Ex: Pitangus sulphuratus"
              />
            </div>
          </div>

          {/* Tipo Animal e Alimentação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoAnimal">Tipo de Animal</Label>
              <Select
                value={formData.tipoAnimal}
                onValueChange={handleSelectChange}
                disabled={isLoading}
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

            <div className="space-y-2">
              <Label htmlFor="alimentacao">Alimentação</Label>
              <Input
                id="alimentacao"
                value={formData.alimentacao}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    alimentacao: e.target.value,
                  }))
                }
                placeholder="Ex: Insetívoro, Frugívoro"
              />
            </div>
          </div>

          {/* Hábitos */}
          <div className="space-y-2">
            <Label htmlFor="habitos">Hábitos</Label>
            <Input
              id="habitos"
              value={formData.habitos}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, habitos: e.target.value }))
              }
              placeholder="Ex: Diurno, Noturno"
            />
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image-upload-animal-modal">Imagem</Label>
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
              htmlFor="image-upload-animal-modal"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors"
            >
              <Upload className="w-4 h-4" />
              {imageFile ? "Trocar imagem" : "Escolher nova imagem"}
            </Label>
            <Input
              id="image-upload-animal-modal"
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
            disabled={
              isLoading || !formData.nomePopular || !formData.nomeCientifico
            }
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Salvar Alterações"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}