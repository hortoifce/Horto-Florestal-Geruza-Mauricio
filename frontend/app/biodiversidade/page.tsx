import { Header } from "@/components/header"
import { CatalogContent } from "@/components/catalog-content"

export default function BiodiversidadePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Catálogo Biodiversidade"
        subtitle="Explore nossa coleção de flora e fauna com QR codes interativos. Cada card contém informações essenciais e um código QR que leva aos detalhes completos."
      />
      <CatalogContent />
    </div>
  )
}
