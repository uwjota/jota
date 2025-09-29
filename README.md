# uwjota - Frontend Developer

Site pessoal moderno e responsivo desenvolvido com Next.js 15, TypeScript e Tailwind CSS. Apresenta habilidades em desenvolvimento frontend, design e soluções audiovisuais.

> **Desenvolvedor**: João Marcelo Venancio Ribeiro  
> **LinkedIn**: [joao-marcelo-venancio-ribeiro](https://www.linkedin.com/in/joao-marcelo-venancio-ribeiro/)  
> **GitHub**: [uwjota](https://github.com/uwjota)

## 🚀 Características

- **Design Moderno**: Interface limpa e elegante com animações suaves
- **Totalmente Responsivo**: Otimizado para desktop, tablet e mobile
- **Cursor Personalizado**: Cursor customizado com efeitos visuais (apenas desktop)
- **Animações Fluidas**: Transições suaves usando Framer Motion
- **Sistema de Idiomas**: Suporte completo para Português e Inglês
- **Cards Animados**: Skills com animação de scroll horizontal infinito
- **Performance Otimizada**: Carregamento rápido e otimizado para SEO
- **Dark Mode**: Tema escuro elegante com efeitos de glassmorphism
- **Scroll Inteligente**: Navegação por seções com indicadores visuais
- **SEO Avançado**: Metadados completos, dados estruturados e sitemap
- **Segurança**: Headers de segurança, CSP e proteções implementadas
- **PWA Ready**: Manifest e configurações para Progressive Web App
- **Páginas de Erro**: 404 personalizada e tratamento de erros globais

## 🛠️ Stack Tecnológico

### Core Framework
- **Next.js 15.2.4** - Framework React com App Router
- **React 19** - Biblioteca de interface de usuário
- **TypeScript 5** - Tipagem estática para JavaScript
- **Tailwind CSS 3.4** - Framework CSS utilitário

### Animações & Interações
- **Framer Motion 12.23** - Biblioteca de animações avançadas
- **Custom Cursor** - Cursor personalizado com efeitos visuais
- **Scroll Animations** - Animações baseadas em scroll

### UI/UX Components
- **Radix UI** - Componentes acessíveis e primitivos
- **Lucide React** - Ícones modernos e consistentes
- **React Icons** - Biblioteca extensa de ícones
- **Class Variance Authority** - Gerenciamento de variantes de classes

### Desenvolvimento & Qualidade
- **ESLint 9** - Linting e qualidade de código
- **PostCSS** - Processamento de CSS
- **Autoprefixer** - Prefixos CSS automáticos

### Performance & Segurança
- **Headers de Segurança** - X-Frame-Options, CSP, HSTS
- **Otimização de Animações** - Detecção de hardware e throttling
- **Lazy Loading** - Carregamento sob demanda de componentes
- **Code Splitting** - Divisão automática do bundle
- **Compressão** - Gzip/Brotli para assets
- **Cache Otimizado** - Estratégias de cache para performance

## 📱 Seções do Site

1. **Sobre** - Apresentação pessoal com foto e descrição
2. **Especialidades** - 13 tecnologias e habilidades com animação de scroll
3. **Projetos** - Projetos frontend realizados com navegação horizontal
4. **Contato** - Links para redes sociais e formas de contato

### Skills Incluídos
- **Frontend**: JavaScript, TypeScript, React, Next.js, HTML, CSS
- **Ferramentas**: Git, WordPress
- **Design**: UI/UX, Design Gráfico
- **Audiovisual**: Edição de Vídeo
- **Marketing**: Tráfego Pago

## 🎨 Funcionalidades Especiais

### Cursor Personalizado
- Cursor customizado com efeito de inversão de cores
- Apenas em desktop (desabilitado em mobile/tablet)
- Efeito hover que aumenta o tamanho do cursor
- Mix-blend-mode para efeitos visuais únicos

### Sistema de Idiomas
- Suporte completo para Português e Inglês
- Troca de idioma em tempo real
- Persistência da escolha no localStorage
- Tradução de todos os textos e elementos

### Cards Animados de Skills
- 13 cards de tecnologias com scroll horizontal infinito
- Efeito de fade nas bordas para transição suave
- Ícones específicos para cada tecnologia
- Animação contínua e responsiva

### Navegação por Seções
- Navegação vertical com indicadores visuais
- Scroll suave entre seções
- Barra de progresso no topo
- Sistema de snap para melhor UX

### Animações Avançadas
- Animações de entrada para cada seção
- Efeitos hover nos elementos interativos
- Transições suaves entre estados
- Framer Motion para performance otimizada

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd port1
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter

## 🏗️ Estrutura do Projeto

```
port1/
├── app/
│   ├── components/
│   │   ├── ui/                     # Componentes de UI reutilizáveis
│   │   │   ├── animated-background.tsx
│   │   │   ├── background-variants.tsx
│   │   │   ├── button.tsx
│   │   │   ├── language-icons.tsx
│   │   │   └── social-icons.tsx
│   │   ├── constants/
│   │   │   └── sections.tsx        # Configuração das seções
│   │   ├── CustomCursor.tsx        # Cursor personalizado
│   │   ├── LanguageContext.tsx     # Contexto de idiomas
│   │   ├── LandingPage.tsx         # Página principal
│   │   ├── Layout.tsx              # Layout da aplicação
│   │   ├── ScrollToTop.tsx         # Componente de scroll
│   │   └── Section.tsx             # Componente de seção
│   ├── lib/
│   │   └── utils.ts                # Utilitários
│   ├── site/
│   │   ├── page.tsx                # Página principal do site
│   │   └── not-found.tsx           # Página 404 específica do site
│   ├── types/
│   │   └── index.ts                # Definições de tipos
│   ├── globals.css                 # Estilos globais
│   ├── error.tsx                   # Página de erro global
│   ├── layout.tsx                  # Layout raiz
│   ├── not-found.tsx               # Página 404 global
│   ├── page.tsx                    # Página inicial
│   └── sitemap.ts                  # Sitemap automático
├── public/                         # Arquivos estáticos
│   ├── iconj.ico                   # Favicon
│   └── fotojoao.webp               # Foto do perfil
├── components.json                 # Configuração do shadcn/ui
├── eslint.config.mjs               # Configuração do ESLint
├── next.config.ts                  # Configuração do Next.js
├── postcss.config.mjs              # Configuração do PostCSS
├── tailwind.config.ts              # Configuração do Tailwind
├── tsconfig.json                   # Configuração do TypeScript
└── package.json                    # Dependências do projeto
```

## 🔧 Funcionalidades Técnicas

### Sistema de Scroll Inteligente
- **ScrollToTop**: Componente que garante que a página sempre inicie no topo
- **Navegação por Seções**: Sistema de snap com indicadores visuais
- **Barra de Progresso**: Indicador visual do progresso de scroll

### Cursor Personalizado
- **Detecção de Dispositivo**: Automático para desktop, desabilitado em mobile
- **Efeitos Visuais**: Mix-blend-mode para inversão de cores
- **Performance**: Otimizado com event listeners condicionais

### Sistema de Idiomas
- **Context API**: Gerenciamento de estado global do idioma
- **Persistência**: Salva a escolha no localStorage
- **Traduções**: Sistema completo de tradução de todos os textos

### Animações de Skills
- **Scroll Infinito**: Cards passam continuamente pela tela
- **Efeito Fade**: Gradientes nas bordas para transição suave
- **Responsivo**: Adapta-se a diferentes tamanhos de tela

### Páginas de Erro
- **404 Global**: Página personalizada para URLs não encontradas
- **404 Site**: Página específica para seções do site
- **Error Boundary**: Captura e trata erros JavaScript
- **Animações**: Transições suaves e partículas flutuantes
- **Navegação**: Botões para voltar ao início ou tentar novamente

### Estrutura de Navegação
- **Página Inicial** (`/`): Landing page com animação de transição
- **Página Principal** (`/site`): Site completo com todas as seções
- **Navegação Suave**: Transição animada entre páginas

## 🎯 Personalização

### Adicionando Novos Projetos
Edite o arquivo `app/components/constants/sections.tsx` e adicione novos projetos no array `projects`:

```typescript
{
  title: 'Nome do Projeto',
  description: 'Descrição do projeto',
  tech: ['React', 'TypeScript', 'Tailwind'],
  link: 'https://exemplo.com'
}
```

### Modificando Informações Pessoais
Atualize as informações na seção `about` do arquivo `sections.tsx`:

```typescript
{
  id: 'about',
  title: "Seu nome...",
  content: "Sua descrição pessoal",
  // ... outras propriedades
}
```

### Adicionando Novos Skills
Edite o arquivo `app/components/constants/sections.tsx` e adicione novos skills no array `skills`:

```typescript
{
  name: 'Nome da Tecnologia',
  icon: 'nome-do-icone'
}
```

E adicione o ícone correspondente em `app/components/ui/language-icons.tsx`:

```typescript
import { SiNovaTecnologia } from 'react-icons/si'

const iconMap = {
  // ... outros ícones
  'nome-do-icone': <SiNovaTecnologia className={className} />
}
```

### Alterando Redes Sociais
Modifique o array `socialLinks` na seção `contact`:

```typescript
{
  name: 'Nome da Rede',
  url: 'https://link.com',
  icon: 'NomeDoIcone'
}
```

### Adicionando Novos Idiomas
Para adicionar um novo idioma, edite `app/components/LanguageContext.tsx`:

```typescript
const translations = {
  pt: { /* traduções em português */ },
  en: { /* traduções em inglês */ },
  // Adicione novos idiomas aqui
}
```

## 🚀 Deploy

### Vercel (Recomendado) ⭐

#### Deploy Automático via GitHub
1. **Fork/Clone** este repositório
2. **Conecte ao Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu repositório GitHub
3. **Configurações automáticas**:
   - Framework: Next.js (detectado automaticamente)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. **Deploy**: Clique em "Deploy" e aguarde
5. **Domínio personalizado** (opcional):
   - Vá em Settings > Domains
   - Adicione seu domínio personalizado

#### Deploy Manual via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel

# Deploy de produção
vercel --prod
```

### Netlify
```bash
# Build do projeto
npm run build

# Deploy via Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=.next
```

### Railway
1. Conecte seu repositório GitHub
2. Railway detectará automaticamente o Next.js
3. Deploy automático configurado

### Docker (Para qualquer plataforma)
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variáveis de Ambiente
Crie um arquivo `.env.local` (não commitado):
```env
# Opcional: Google Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Opcional: Google Search Console
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### Scripts de Deploy
```bash
# Build de produção
npm run build

# Testar build localmente
npm run start

# Lint antes do deploy
npm run lint

# Build + Start (para produção)
npm run build && npm run start
```

## 📄 Licença

Este projeto é de uso pessoal. Todos os direitos reservados.

## 👨‍💻 Autor

**João (uwjota)**
- GitHub: [@uwjota](https://github.com/uwjota)
- Instagram: [@uwjota](https://www.instagram.com/uwjota/)
- Email: uwjota@gmail.com

---

Desenvolvido por uwjota ⚡