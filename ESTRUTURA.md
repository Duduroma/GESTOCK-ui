# Estrutura do Projeto GESTOCK (TypeScript)

## 📁 Organização de Pastas

```
src/
├── views/          # Páginas da aplicação
│   └── Home.tsx    # Exemplo de página
│
├── components/     # Componentes reutilizáveis
│   └── Button.tsx  # Exemplo de componente
│
├── services/       # Conexão com backend
│   └── api.ts      # Configuração e funções da API
│
├── utils/          # Funções utilitárias
│   └── helpers.ts  # Funções auxiliares
│
├── types/          # Definições de tipos TypeScript
│   └── global.d.ts # Tipos globais
│
└── main.tsx        # Arquivo principal da aplicação
```

## 📝 Como Usar

### 1. Views (Páginas)
Crie suas páginas em `src/views/`. Cada arquivo representa uma página.

**Exemplo:**
```tsx
// src/views/Produtos.tsx
declare const React: any;

function Produtos(): JSX.Element {
    return <div>Lista de Produtos</div>;
}

if (typeof window !== 'undefined') {
    (window as any).Produtos = Produtos;
}

export default Produtos;
```

### 2. Services (Backend)
Use `src/services/api.ts` para fazer chamadas ao backend.

**Exemplo:**
```tsx
import { api } from './services/api';

// GET
const produtos = await api.get('/produtos');

// POST
await api.post('/produtos', { nome: 'Produto 1' });
```

### 3. Components (Componentes)
Componentes reutilizáveis ficam em `src/components/`.

**Exemplo:**
```tsx
// src/components/Button.tsx
declare const React: any;

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

function Button({ children, onClick }: ButtonProps): JSX.Element {
    return <button onClick={onClick}>{children}</button>;
}

export default Button;
```

### 4. Utils (Utilitários)
Funções auxiliares em `src/utils/`.

### 5. Types (Tipos)
Definições de tipos TypeScript em `src/types/`.

## 🚀 Comandos Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run type-check` - Verifica erros de tipo TypeScript

## 📝 Adicionar Nova Página

1. Crie o arquivo em `src/views/NovaPagina.tsx`
2. Exporte para `window.NovaPagina`
3. Adicione o script no `index.html` antes do `main.tsx`
4. Use no `main.tsx` ou em outras views

## ⚙️ TypeScript

O projeto está configurado com TypeScript. Todos os arquivos devem usar extensão `.ts` ou `.tsx`.

- `tsconfig.json` - Configuração do TypeScript
- `src/types/global.d.ts` - Tipos globais para React (via CDN)