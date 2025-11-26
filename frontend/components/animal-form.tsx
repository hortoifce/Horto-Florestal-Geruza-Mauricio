"use client"

import type React from "react"

import { useState } from "react"
import { Zap, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useSpecies } from "@/contexts/species-context"

export function AnimalForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    nomePopular: "",
    nomeCientifico: "",
    familia: "",
    origem: "",
    alimentacao: "",
    descricao: "",
  })

  const { addSpecies } = useSpecies()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess(false)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newSpecies = {
        id: Date.now(),
        name: formData.nomePopular,
        scientificName: formData.nomeCientifico,
        type: "animal",
        image: "/placeholder.svg?key=animal",
        description: formData.descricao,
        qrCode:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
        family: formData.familia,
        origin: formData.origem,
        diet: formData.alimentacao,
      }

      addSpecies(newSpecies)
      console.log("Animal added to catalog:", newSpecies)
      setSuccess(true)

      setTimeout(() => {
        setFormData({
          nomePopular: "",
          nomeCientifico: "",
          familia: "",
          origem: "",
          alimentacao: "",
          descricao: "",
        })
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Erro ao cadastrar animal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-foreground ">Cadastrar Novo Animal</h2>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg flex items-center gap-3 animate-scale-in">
          <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-700 dark:text-blue-300">Animal cadastrado com sucesso!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="nomePopularAnimal" className="text-sm font-medium text-foreground ">
              Nome Popular *
            </Label>
            <Input
              id="nomePopularAnimal"
              placeholder="Ex: Bem-te-vi"
              value={formData.nomePopular}
              onChange={(e) => setFormData({ ...formData, nomePopular: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}

              required
            />
          </div>

          <div>
            <Label htmlFor="nomeCientificoAnimal" className="text-sm font-medium text-foreground ">
              Nome Científico *
            </Label>
            <Input
              id="nomeCientificoAnimal"
              placeholder="Ex: Pitangus sulphuratus"
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
            <Label htmlFor="familiaAnimal" className="text-sm font-medium text-foreground ">
              Família *
            </Label>
            <Input
              id="familiaAnimal"
              placeholder="Ex: Tyrannidae"
              value={formData.familia}
              onChange={(e) => setFormData({ ...formData, familia: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="origemAnimal" className="text-sm font-medium text-foreground ">
              Origem
            </Label>
            <Input
              id="origemAnimal"
              placeholder="Ex: América do Sul"
              value={formData.origem}
              onChange={(e) => setFormData({ ...formData, origem: e.target.value })}
              className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="alimentacao" className="text-sm font-medium text-foreground ">
            Alimentação
          </Label>
          <Input
            id="alimentacao"
            placeholder="Ex: Insetívoro, frugívoro"
            value={formData.alimentacao}
            onChange={(e) => setFormData({ ...formData, alimentacao: e.target.value })}
            className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label htmlFor="descricaoAnimal" className="text-sm font-medium text-foreground ">
            Descrição
          </Label>
          <Textarea
            id="descricaoAnimal"
            placeholder="Descrição detalhada do animal..."
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            className="mt-1 bg-input text-foreground transition-all duration-300 focus:ring-2 focus:ring-emerald-500/20"
            rows={4}
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-sm font-medium mb-3 text-foreground block">Imagem</Label>
          <div className="border-2 border-dashed text-foreground border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Escolher imagem</p>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Cadastrando..." : "Cadastrar Animal"}
        </Button>
      </form>
    </div>
  )
}
