"use client"

import type React from "react"

import { useState } from "react"
import { TreePine, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useSpecies } from "@/contexts/species-context"

export function TreeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nomePopular: "",
    nomeCientifico: "",
    familia: "",
    origem: "",
    caracteristicas: {
      ornamental: false,
      frutifera: false,
      medicinal: false,
    },
    utilidade: "",
    formaPropagacao: "",
    descricao: "",
  })

  const { addSpecies } = useSpecies()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const characteristics = []
      if (formData.caracteristicas.ornamental) characteristics.push("Ornamental")
      if (formData.caracteristicas.frutifera) characteristics.push("Frutífera")
      if (formData.caracteristicas.medicinal) characteristics.push("Medicinal")

      const newSpecies = {
        id: Date.now(),
        name: formData.nomePopular,
        scientificName: formData.nomeCientifico,
        type: "tree",
        image: "/solitary-oak.png",
        description: formData.descricao,
        qrCode:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
        family: formData.familia,
        origin: formData.origem,
        characteristics,
        utility: formData.utilidade,
        propagation: formData.formaPropagacao,
      }

      addSpecies(newSpecies)
      console.log("Tree added to catalog:", newSpecies)
      setSuccess(true)

      setTimeout(() => {
        setFormData({
          nomePopular: "",
          nomeCientifico: "",
          familia: "",
          origem: "",
          caracteristicas: {
            ornamental: false,
            frutifera: false,
            medicinal: false,
          },
          utilidade: "",
          formaPropagacao: "",
          descricao: "",
        })
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Erro ao cadastrar árvore:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <TreePine className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold text-foreground ">Cadastrar Nova Árvore</h2>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700 rounded-lg flex items-center gap-3 animate-scale-in">
          <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300">Árvore cadastrada com sucesso!</p>
        </div>
      )}

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
                checked={formData.caracteristicas.ornamental}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    caracteristicas: { ...formData.caracteristicas, ornamental: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="ornamental" className="text-sm text-foreground ">
                Ornamental
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="frutifera"
                checked={formData.caracteristicas.frutifera}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    caracteristicas: { ...formData.caracteristicas, frutifera: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="frutifera" className="text-sm text-foreground ">
                Frutífera
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="medicinal"
                checked={formData.caracteristicas.medicinal}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    caracteristicas: { ...formData.caracteristicas, medicinal: !!checked },
                  })
                }
                disabled={isLoading}
              />
              <Label htmlFor="medicinal" className="text-sm text-foreground ">
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
          <Label htmlFor="descricao" className="text-sm font-medium text-foreground ">
            Descrição
          </Label>
          <Textarea
            id="descricao"
            placeholder="Descrição detalhada da espécie..."
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground  mb-3 block">Imagem</Label>
          <div className="border-2 border-dashed text-foreground border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400  mx-auto mb-2" />
            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Escolher Imagem</p>
          </div>
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
