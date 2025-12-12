# Rotas de Estoques - Frontend

Este documento descreve como o frontend envia e recebe dados para cada rota de estoques.

---

## 1. Listar Estoques

**Rota:** `GET /api/estoques`

**Query Parameters (opcionais):**
- `clienteId` (string): Filtrar por cliente
- `nome` (string): Filtrar por nome
- `endereco` (string): Filtrar por endereço
- `ativo` (boolean): Filtrar por status ativo/inativo
- `page` (number): Número da página
- `size` (number): Tamanho da página

**Request:**
```typescript
// Exemplo de chamada
await estoquesService.listar({
    clienteId: '1',
    ativo: true,
    page: 0,
    size: 10
});
```

**Response esperado (Paginated):**
```json
{
  "content": [
    {
      "id": "1",
      "clienteId": "1",
      "nome": "Estoque Central",
      "endereco": "Rua A, 100",
      "capacidade": 10000,
      "ativo": true,
      "saldos": [],
      "rops": []
    }
  ],
  "totalElements": 5,
  "totalPages": 1,
  "page": 0,
  "size": 10
}
```

**Response esperado (Array direto):**
```json
[
  {
    "id": "1",
    "clienteId": "1",
    "nome": "Estoque Central",
    "endereco": "Rua A, 100",
    "capacidade": 10000,
    "ativo": true,
    "saldos": [],
    "rops": []
  }
]
```

**Tratamento no frontend:**
```typescript
const response = await estoquesService.listar();
const estoquesData = Array.isArray(response) ? response : (response.content || []);
```

---

## 2. Buscar Estoque por ID

**Rota:** `GET /api/estoques/{id}`

**Request:**
```typescript
// Exemplo de chamada
await estoquesService.buscarPorId('1');
```

**URL:** `/api/estoques/1`

**Response esperado:**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Central",
  "endereco": "Rua A, 100",
  "capacidade": 10000,
  "ativo": true,
  "saldos": [
    {
      "produtoId": "1",
      "saldoFisico": 500,
      "saldoReservado": 100,
      "saldoDisponivel": 400
    }
  ],
  "rops": [
    {
      "produtoId": "1",
      "valor": 1350
    }
  ]
}
```

---

## 3. Criar Estoque

**Rota:** `POST /api/estoques`

**Request Body:**
```json
{
  "clienteId": "1",
  "nome": "Estoque Novo",
  "endereco": "Rua B, 200",
  "capacidade": 5000,
  "ativo": true
}
```

**Request TypeScript:**
```typescript
await estoquesService.criar({
    clienteId: '1',
    nome: 'Estoque Novo',
    endereco: 'Rua B, 200',
    capacidade: 5000,
    ativo: true
});
```

**Response esperado (201 Created):**
```json
{
  "id": "5",
  "clienteId": "1",
  "nome": "Estoque Novo",
  "endereco": "Rua B, 200",
  "capacidade": 5000,
  "ativo": true,
  "saldos": [],
  "rops": []
}
```

---

## 4. Atualizar Estoque

**Rota:** `PUT /api/estoques/{id}`

**Request Body:**
```json
{
  "nome": "Estoque Atualizado",
  "endereco": "Rua C, 300",
  "capacidade": 8000,
  "ativo": false
}
```

**Request TypeScript:**
```typescript
await estoquesService.atualizar('1', {
    nome: 'Estoque Atualizado',
    endereco: 'Rua C, 300',
    capacidade: 8000,
    ativo: false
});
```

**URL:** `/api/estoques/1`

**Response esperado (200 OK):**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Atualizado",
  "endereco": "Rua C, 300",
  "capacidade": 8000,
  "ativo": false,
  "saldos": [],
  "rops": []
}
```

**Nota:** O `clienteId` não pode ser alterado na atualização, apenas os campos: `nome`, `endereco`, `capacidade`, `ativo`.

---

## 5. Deletar Estoque

**Rota:** `DELETE /api/estoques/apagar/{id}`

**Request:**
```typescript
// Exemplo de chamada
await estoquesService.deletar('1');
```

**URL:** `/api/estoques/apagar/1`

**Response esperado (204 No Content):**
```
(sem corpo de resposta)
```

**Tratamento no frontend:**
```typescript
// A API retorna null para status 204
await estoquesService.deletar(id);
// Após sucesso, recarrega a lista
await recarregarEstoques();
```

---

## 6. Inativar Estoque

**Rota:** `PATCH /api/estoques/{id}/inativar`

**Request:**
```typescript
await estoquesService.inativar('1');
```

**URL:** `/api/estoques/1/inativar`

**Response esperado (204 No Content):**
```
(sem corpo de resposta)
```

---

## 7. Ativar Estoque

**Rota:** `PATCH /api/estoques/{id}/ativar`

**Request:**
```typescript
await estoquesService.ativar('1');
```

**URL:** `/api/estoques/1/ativar`

**Response esperado (204 No Content):**
```
(sem corpo de resposta)
```

---

## Estrutura de Dados - Estoque

### Interface TypeScript
```typescript
interface Estoque {
    id: EstoqueId;              // string
    clienteId: ClienteId;        // string
    nome: string;
    endereco: string;
    capacidade: number;
    ativo: boolean;
    saldos?: SaldoProduto[];     // opcional
    rops?: ROP[];                // opcional
}
```

### Campos Obrigatórios
- `id`: Identificador único do estoque
- `clienteId`: ID do cliente proprietário
- `nome`: Nome do estoque
- `endereco`: Endereço físico do estoque
- `capacidade`: Capacidade máxima (número)
- `ativo`: Status ativo/inativo (boolean)

### Campos Opcionais
- `saldos`: Array de saldos de produtos no estoque
- `rops`: Array de pontos de reposição (ROP) por produto

---

## Fluxo de Uso no Frontend

### 1. Carregar Lista Inicial
```typescript
useEffect(() => {
    const carregarEstoques = async () => {
        const response = await estoquesService.listar();
        const estoquesData = Array.isArray(response) 
            ? response 
            : (response.content || []);
        setEstoques(estoquesData);
    };
    carregarEstoques();
}, []);
```

### 2. Abrir Modal de Edição
```typescript
const handleEditarEstoque = async (itemId: string) => {
    const estoqueAtualizado = await estoquesService.buscarPorId(itemId);
    setItemEditando(estoqueAtualizado);
    setIsModalOpen(true);
};
```

### 3. Salvar Edição
```typescript
const estoqueAtualizado = await estoquesService.atualizar(estoqueEditando.id, {
    nome: data.nome,
    endereco: data.endereco,
    capacidade: data.capacidade,
    ativo: data.ativo
});
setEstoques(estoques.map(estoque => 
    estoque.id === estoqueEditando.id ? estoqueAtualizado : estoque
));
```

### 4. Deletar Estoque
```typescript
await estoquesService.deletar(itemId);
await recarregarEstoques(); // Recarrega lista do backend
```

---

## Códigos de Status HTTP Esperados

- **200 OK:** Operação bem-sucedida (GET, PUT)
- **201 Created:** Recurso criado com sucesso (POST)
- **204 No Content:** Operação bem-sucedida sem conteúdo (DELETE, PATCH)
- **400 Bad Request:** Erro de validação
- **404 Not Found:** Estoque não encontrado
- **500 Internal Server Error:** Erro interno do servidor

---

## Tratamento de Erros

```typescript
try {
    await estoquesService.deletar(itemId);
    await recarregarEstoques();
} catch (err) {
    console.error('❌ Erro ao deletar estoque:', err);
    alert('Erro ao deletar estoque. Tente novamente.');
}
```

