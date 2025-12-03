import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
    title: "Contato – Horto Florestal Geruza & Maurício | Tabuleiro – Fortaleza/CE",
    description:
        "Entre em contato com o Horto Florestal Geruza & Maurício. Endereço no Tabuleiro, Fortaleza/CE. WhatsApp, telefone e informações para compra de mudas.",
};

export default function ContatoPage() {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Card className="p-4 rounded-xl bg-card text-card-foreground border border-border shadow-sm card-hover animate-fade-in">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">Contato</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
                    <p>
                        <strong className="font-medium">Endereço:</strong>{" "}
                        Taperinha, Tabuleiro do Norte - CE, 62960-000 – Fortaleza/CE. Próximo
                        à Escola Profissionalizante Avelino Magalhães e ao IFCE.
                    </p>

                    <p>
                        <strong className="font-medium">WhatsApp:</strong> (coloque o número do horto)
                    </p>

                    <p>
                        <strong className="font-medium">Horário de funcionamento:</strong>{" "}
                        6:00 às 18:00, de domingo a domingo.
                    </p>

                    <p>
                        Para dúvidas sobre espécies, disponibilidade ou pedidos, fale conosco pelo WhatsApp.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}