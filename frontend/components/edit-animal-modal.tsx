"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Zap, Upload, Loader2 } from "lucide-react"

interface Species {
  id: number
  name: string
  scientificName: string
  type: string
  image: string
  description: string
  qrCode: string
  family?: string
  origin?: string
  diet?: string
}

interface EditAnimalModalProps {
  isOpen: boolean
  onClose: () => void
  species: Species | null
  onSave: (updatedSpecies: Species) => void
}

export function EditAnimalModal({ isOpen, onClose, species, onSave }: EditAnimalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    family: "",
    origin: "",
    diet: "",
    description: "",
    image: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (species) {
      setFormData({
        name: species.name || "",
        scientificName: species.scientificName || "",
        family: species.family || "",
        origin: species.origin || "",
        diet: species.diet || "",
        description: species.description || "",
        image: species.image || "",
      })
    }
  }, [species])

  const handleSave = async () => {
    if (!species) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const updatedSpecies: Species = {
      ...species,
      ...formData,
    }

    onSave(updatedSpecies)
    setIsLoading(false)
    onClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      scientificName: "",
      family: "",
      origin: "",
      diet: "",
      description: "",
      image: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
            <Zap className="w-5 h-5" />
            Editar Animal
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Nome Popular e Científico */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Popular *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Bem-te-vi"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Nome Científico *</Label>
              <Input
                id="scientificName"
                value={formData.scientificName}
                onChange={(e) => setFormData((prev) => ({ ...prev, scientificName: e.target.value }))}
                placeholder="Ex: Pitangus sulphuratus"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Família e Origem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="family">Família</Label>
              <Input
                id="family"
                value={formData.family}
                onChange={(e) => setFormData((prev) => ({ ...prev, family: e.target.value }))}
                placeholder="Ex: Tyrannidae"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origem</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => setFormData((prev) => ({ ...prev, origin: e.target.value }))}
                placeholder="Ex: América do Sul"
                className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Alimentação */}
          <div className="space-y-2">
            <Label htmlFor="diet">Alimentação</Label>
            <Input
              id="diet"
              value={formData.diet}
              onChange={(e) => setFormData((prev) => ({ ...prev, diet: e.target.value }))}
              placeholder="Ex: Insetívoro, frugívoro"
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição detalhada do animal..."
              rows={4}
              className="transition-all duration-300 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label>Imagem</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors bg-transparent"
              >
                <Upload className="w-4 h-4" />
                Escolher Imagem
              </Button>
              <span className="text-sm text-muted-foreground">
                {formData.image ? "Imagem selecionada" : "Nenhuma imagem selecionada"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="transition-all duration-300 bg-transparent"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || !formData.name || !formData.scientificName}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
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
  )
}
