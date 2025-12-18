# Horto Florestal - Frontend

Este repositório contém o código-fonte do **Frontend** para o sistema de gerenciamento do Horto Florestal Geruza Maurício. A aplicação tem como objetivo facilitar o controle e a catalogação de espécies (plantas e animais), oferecendo uma interface pública para visualização e um painel administrativo para gestão dos dados.

O projeto foi desenvolvido com foco em performance, acessibilidade e usabilidade, utilizando tecnologias modernas do ecossistema React.

## 👨‍💻 Equipe de Desenvolvimento

Este projeto foi desenvolvido por:

* **Adrian Sousa Bezerra**
* **Daniel Vitor Mano de Oliveira**
* **Hermeson Daniel Lima de Sousa**
* **Liandro da Silva Chaves**

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma stack tecnológica robusta para garantir escalabilidade e manutenção:

- **[Next.js](https://nextjs.org/)** (App Router): Framework React para renderização híbrida e otimizada.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática, aumentando a segurança do código.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilitários para estilização rápida e responsiva.
- **[Shadcn/UI](https://ui.shadcn.com/)**: Biblioteca de componentes de interface reutilizáveis e acessíveis.
- **[Axios](https://axios-http.com/)**: Cliente HTTP baseado em Promises para comunicação com o Backend.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones moderna e leve.
- **Context API**: Solução nativa do React para gerenciamento de estado global.

## ⚙️ Funcionalidades

### Área Pública

- **Catálogo Digital:** Visualização detalhada de árvores e animais presentes no Horto.
- **Sistema de Busca:** Pesquisa em tempo real por nome popular ou científico.
- **Filtros de Categoria:** Alternância rápida entre visualização de plantas e animais.
- **Paginação:** Navegação otimizada entre grandes volumes de dados.
- **Design Responsivo:** Interface adaptável para dispositivos móveis (smartphones e tablets) e desktops.

### Área Administrativa (Dashboard)

- **Autenticação:** Acesso restrito e seguro para administradores.
- **Controle de Acesso:** Solicitação de senha para cadastro de outro usuário administrador
- **Gestão de Conteúdo (CRUD):** Funcionalidades completas para Criar, Ler, Atualizar e Excluir registros de espécies.
- **Upload de Imagens:** Integração para envio e gerenciamento de fotos das espécies.

## 🛠️ Instalação e Execução

Pré-requisitos: Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em seu ambiente.

1. **Clonar o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
   cd frontend
   ```
2. **Instalar dependências:**
   Recomendamos o uso do `npm` para manter a consistência com o `package-lock.json`:

   ```bash
   npm install
   ```
3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto e defina a URL da API (Backend):

   ```env
   NEXT_PUBLIC_API_URL=[https://backend-horto.onrender.com](https://backend-horto.onrender.com)
   ```
4. **Executar o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```
5. **Acesso:**
   A aplicação estará disponível em `http://localhost:3000`.

## 📂 Estrutura do Projeto

A organização de pastas segue as melhores práticas do Next.js (App Router):

- `app/`: Contém as rotas, páginas e layouts da aplicação.
- `components/`: Componentes visuais reutilizáveis (Botões, Modais, Cards).
  - `ui/`: Componentes base da biblioteca Shadcn/UI.
- `contexts/`: Provedores de contexto para gerenciamento de estado (ex: `SpeciesContext`).
- `lib/`: Configurações de utilitários e clientes externos (ex: instância do Axios).
- `public/`: Ativos estáticos como imagens e ícones.

---
