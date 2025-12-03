import { redirect } from "next/navigation"

export const metadata = {
  title: "Horto Florestal Geruza & Maurício – Mudas, Plantas e Paisagismo",
  description:
    "Horto localizado no Tabuleiro, Fortaleza/CE. Venda de mudas, plantas ornamentais, frutíferas, nativas, adubos e serviços de paisagismo.",
};

export default function HomePage() {
  redirect("/catalogo-publico")
}
