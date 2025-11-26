import { redirect } from "next/navigation"

export default function HomePage() {
  // Redireciona para o catálogo por padrão
  redirect("/catalogo")
}
