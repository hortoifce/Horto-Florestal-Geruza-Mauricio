"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { TreePine, Upload, Loader2 } from "lucide-react"

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
  characteristics?: string[]
  utility?: string
  propagation?: string
}

interface EditTreeModalProps {
  isOpen: boolean
  onClose: () => void
  species: Species | null
  onSave: (updatedSpecies: Species) => void
}

export function EditTreeModal({ isOpen, onClose, species, onSave }: EditTreeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    scientificName: "",
    family: "",
    origin: "",
    characteristics: [] as string[],
    utility: "",
    propagation: "",
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
        characteristics: species.characteristics || [],
        utility: species.utility || "",
        propagation: species.propagation || "",
        description: species.description || "",
        image: species.image || "",
      })
    }
  }, [species])

  const handleCharacteristicChange = (characteristic: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      characteristics: checked
        ? [...prev.characteristics, characteristic]
        : prev.characteristics.filter((c) => c !== characteristic),
    }))
  }

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
      characteristics: [],
      utility: "",
      propagation: "",
      description: "",
      image: "",
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <TreePine className="w-5 h-5" />
            Editar Árvore
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
                placeholder="Ex: Ipê Amarelo"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scientificName">Nome Científico *</Label>
              <Input
                id="scientificName"
                value={formData.scientificName}
                onChange={(e) => setFormData((prev) => ({ ...prev, scientificName: e.target.value }))}
                placeholder="Ex: Handroanthus albus"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
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
                placeholder="Ex: Bignoniaceae"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin">Origem</Label>
              <Input
                id="origin"
                value={formData.origin}
                onChange={(e) => setFormData((prev) => ({ ...prev, origin: e.target.value }))}
                placeholder="Ex: Brasil - Cerrado"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-3">
            <Label>Características</Label>
            <div className="flex flex-wrap gap-4">
              {["Ornamental", "Frutífera", "Medicinal"].map((characteristic) => (
                <div key={characteristic} className="flex items-center space-x-2">
                  <Checkbox
                    id={characteristic}
                    checked={formData.characteristics.includes(characteristic)}
                    onCheckedChange={(checked) => handleCharacteristicChange(characteristic, checked as boolean)}
                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                  />
                  <Label htmlFor={characteristic} className="text-sm font-normal">
                    {characteristic}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Utilidade e Propagação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="utility">Utilidade</Label>
              <Input
                id="utility"
                value={formData.utility}
                onChange={(e) => setFormData((prev) => ({ ...prev, utility: e.target.value }))}
                placeholder="Ex: Paisagismo, madeira, sombra"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="propagation">Forma de Propagação</Label>
              <Input
                id="propagation"
                value={formData.propagation}
                onChange={(e) => setFormData((prev) => ({ ...prev, propagation: e.target.value }))}
                placeholder="Ex: Sementes, mudas, estacas"
                className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição detalhada da espécie..."
              rows={4}
              className="transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20 resize-none"
            />
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label>Imagem</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors bg-transparent"
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
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 transition-all duration-300 transform hover:scale-105"
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
