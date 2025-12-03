import { Header } from "@/components/header"
import { CatalogContentPublic } from "@/components/catalogo-content-public"

export default function CatalogoPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header
                title="Horto-florestal Geruza Maurício de Andrade"
                subtitle="Explore nossa coleção de flora e fauna com QR codes interativos. Cada card contém informações essenciais e um código QR que leva aos detalhes completos."
            />
            <CatalogContentPublic />
        </div>
    )
}
