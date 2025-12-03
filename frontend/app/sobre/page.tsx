import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const metadata = {
    title: "Sobre o Horto Florestal Geruza & Maurício | Tabuleiro – Fortaleza/CE",
    description:
        "Conheça a história e o trabalho do Horto Florestal Geruza & Maurício, localizado no bairro Tabuleiro em Fortaleza/CE. Produção de mudas, paisagismo e conservação ambiental.",
};

export default function SobrePage() {
    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <Card className="p-4 rounded-xl bg-card text-card-foreground border border-border shadow-sm card-hover animate-fade-in">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold">Sobre</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 text-foreground/80 leading-relaxed">

                    <h2 className="text-3xl font-semibold">Horto Florestal</h2>

                    <p>
                        O Horto Florestal Geruza & Maurício está localizado em Tabuleiro do Norte,
                        em Fortaleza/CE. É uma Área de Proteção Ambiental (APA), destinada à
                        conservação dos atributos bióticos (fauna e flora), estéticos (beleza) e
                        culturais ali existentes, essenciais para a qualidade de vida da população
                        local e para a proteção dos ecossistemas regionais. Foi fundado pela FEMAJE
                        (Fundação de Educação e Defesa do Meio Ambiente do Jaguaribe), garantindo
                        sua atuação desde 2008.
                    </p>

                    <h2 className="text-3xl font-semibold">Horto Florestal de Tabuleiro</h2>

                    <p>
                        O horto florestal de Tabuleiro do Norte nasceu em terreno escolhido pelo
                        ambientalista Jesus Moreira de Andrade nos anos de 1995. A área, com
                        aproximadamente quatro hectares, oferecia além do espaço a ser reflorestado,
                        um lago às margens da CE-377.
                    </p>

                    <p>
                        A Fundação Femaje recebeu esse patrimônio inicial, hoje totalmente
                        arborizado, que foi batizado com o nome da companheira e primeira presidenta
                        da organização: Geruza Maurício de Andrade, referência na educação ambiental.
                    </p>

                    <p>
                        Em 2008, o horto foi reconhecido dentro das exigências ambientais para
                        certificação do Selo Município Verde, categoria B — uma conquista para
                        Tabuleiro do Norte. Atualmente, cumpre sua vocação como berçário da fauna e
                        flora, ampliando sua função socioambiental para a ecologia urbana.
                    </p>

                    <h2 className="text-3xl font-semibold">
                        O que o Horto Florestal de Tabuleiro oferece aos seus frequentadores?
                    </h2>

                    <ul className="list-disc pl-6 space-y-1">
                        <li>Café Compartilhado</li>
                        <li>Saraus literários</li>
                        <li>Rodas de conversa com temas geradores</li>
                        <li>Oficinas variadas</li>
                        <li>Encontros orientados por psicólogo</li>
                        <li>Aulas de campo do Instituto Federal de Tabuleiro</li>
                        <li>Encontros festivos de instituições públicas e privadas</li>
                        <li>Apresentações de companhias de dança</li>
                        <li>Visitas livres de grupos e famílias</li>
                        <li>Trabalhos fotográficos</li>
                        <li>Reuniões da Fundação Femaje com instituições ambientais</li>
                    </ul>

                    <h2 className="text-3xl font-semibold">
                        Trabalhos realizados pelos membros da Fundação Femaje
                    </h2>

                    <ul className="list-disc pl-6 space-y-1">
                        <li>Mutirões de cuidado com a área</li>
                        <li>Inventário das espécies da fauna e flora presentes</li>
                        <li>Podas das árvores</li>
                        <li>Produção de mudas com sementes do próprio horto</li>
                        <li>Produção de mudas com sementes nativas de outras áreas</li>
                        <li>Limpeza do entorno para controle de lixo descartado por transeuntes</li>
                        <li>Grupos de estudos</li>
                        <li>Observação de pássaros</li>
                        <li>Observação do pôr do sol</li>
                        <li>Palestras e participações em escolas</li>
                        <li>Intercâmbio com unidades de conservação do Vale do Jaguaribe</li>
                        <li>Permuta de sementes e mudas</li>
                        <li>Participação em conselhos municipais e comissões de defesa da Caatinga</li>
                        <li>Manutenção de redes sociais</li>
                    </ul>

                </CardContent>
            </Card>
        </div>
    );
}