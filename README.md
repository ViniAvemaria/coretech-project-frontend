# Core Tech Store

Projeto de e-commerce desenvolvido para simular o funcionamento de uma loja virtual de produtos eletrônicos, contemplando navegação, compra, avaliação de produtos e gestão administrativa.

## 📋 Sobre o Projeto

A aplicação oferece:

- ✅ Registro e autenticação de usuários
- ✅ Catálogo completo de produtos com imagens e descrições detalhadas
- ✅ Pesquisa por nome do produto
- ✅ Filtro por categoria
- ✅ Ordenação por data de cadastro, preço, número de avaliações e nota média
- ✅ Sistema de avaliações com comentários e classificação por estrelas
- ✅ Carrinho de compras com controle de itens
- ✅ Histórico de compras do usuário
- ✅ Dashboard administrativo com CRUD de produtos
- ✅ Gerenciamento completo de pedidos com alteração de status
- ✅ Importação de produtos via arquivo CSV
- ✅ Interface responsiva e experiência otimizada para desktop e mobile

## 🔗 Repositórios Relacionados

- [Backend](https://github.com/ViniAvemaria/coretech-project-backend)

## 🌐 Acesse a Aplicação

A aplicação está disponível em: [Core Tech Store](https://app.coretechstore.dedyn.io/)

O projeto está hospedado em ambiente cloud com a seguinte arquitetura:

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Render](https://render.com/)
- Banco de Dados: [Neon](https://neon.com/)

# Frontend

Camada responsável pela interface e interação com a API. Estruturado por responsabilidade, com gerenciamento global de autenticação, controle de rotas protegidas e renovação automática de sessão via refresh token.

## 🔧 Tecnologias Utilizadas

- **React** – Construção da interface
- **Vite** – Bundler e ambiente de desenvolvimento
- **React Router** – Gerenciamento de rotas
- **Axios** – Requisições HTTP
- **Tailwind CSS** – Estilização
- **React Hook Form** – Gerenciamento de formulários
- **Zod** – Validação de dados
- **React Toastify** – Notificações
- **ESLint** – Padronização e linting

## 🏗️ Arquitetura

A aplicação é organizada por responsabilidade. A pasta `api` centraliza as requisições HTTP. `components` contém elementos reutilizáveis da interface. `pages` define as telas principais.

`contexts` gerencia estado global, como autenticação e carrinho. `hooks` reúne hooks customizados. `routes` controla navegação. `utils` concentra funções auxiliares. `modals` isola componentes de diálogo.

`index.css` centraliza o design system da aplicação, incluindo variáveis de tema, suporte a modo escuro e classes reutilizáveis.

## 📁 Estrutura de Pastas

```
src/
├── api/
├── components/
├── contexts/
├── hooks/
├── modals/
├── pages/
├── routes/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## 🔐 Autenticação e Segurança

O fluxo de autenticação é baseado em confirmação de conta e tokens gerenciados via HTTP-only cookies.

Após o cadastro, o backend envia um e-mail de confirmação. Somente após a validação da conta o usuário pode realizar login.

No login, o backend gera:

- Access Token
- Refresh Token

Ambos são armazenados em HTTP-only cookies, aumentando a segurança contra ataques XSS.

Para verificar se o usuário está autenticado, o frontend realiza uma requisição para `/api/users/me`.
Se a resposta for `204`, os dados do usuário são armazenados no `AuthContext`, estabelecendo o estado autenticado na aplicação.

A aplicação também utiliza um interceptor do Axios para:

- Detectar respostas `401 Unauthorized`
- Acionar automaticamente o endpoint de refresh token
- Repetir a requisição original após renovar o access token

Esse mecanismo permite:

- Renovação automática de sessão
- Melhor experiência do usuário
- Redução de necessidade de login frequente

As validações críticas e regras de segurança são responsabilidade do backend.

## ▶️ Como Executar o Projeto

**1. Clone o repositório**

```bash
git clone https://github.com/ViniAvemaria/coretech-project-frontend
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto com:

```env
VITE_API_URL=http://localhost:8080/api
```

> Altere a porta caso o backend esteja rodando em uma porta diferente.

**4. Execute o projeto**

```bash
npm run dev
```

> Por padrão, o Vite executa na porta 5173. Caso esteja ocupada, uma nova porta será exibida no terminal.

Após iniciar o servidor de desenvolvimento, a aplicação estará disponível em:

```
http://localhost:5173
```

Certifique-se de iniciar o servidor do backend antes de acessar a aplicação.
