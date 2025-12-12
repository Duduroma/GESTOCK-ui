# Rotas Completas do Frontend - Documentação

Este documento descreve TODAS as rotas usadas no frontend, incluindo filtros, cadastros, edições, deleções e ações especiais.

---

## 📦 ESTOQUES

### 1. Listar Estoques (com filtros)

**Rota:** `GET /api/estoques`

**Query Parameters (filtros):**
```typescript
{
    clienteId?: string;      // Filtrar por cliente
    nome?: string;           // Filtrar por nome
    endereco?: string;       // Filtrar por endereço
    ativo?: boolean;         // Filtrar por status (true/false)
    page?: number;           // Paginação
    size?: number;           // Tamanho da página
}
```

**Request:**
```typescript
await estoquesService.listar({
    clienteId: '1',
    ativo: true,
    page: 0,
    size: 10
});
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "clienteId": "1",
      "nome": "Estoque Central",
      "endereco": "Rua A, 100",
      "capacidade": 10000,
      "ativo": true
    }
  ],
  "totalElements": 5,
  "totalPages": 1
}
```

---

### 2. Buscar Estoque por ID

**Rota:** `GET /api/estoques/{id}`

**Request:**
```typescript
await estoquesService.buscarPorId('1');
```

**Response esperado:**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Central",
  "endereco": "Rua A, 100",
  "capacidade": 10000,
  "ativo": true
}
```

---

### 3. Cadastrar Estoque

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

**Campos obrigatórios:**
- `clienteId` (string): ID do cliente
- `nome` (string): Nome do estoque
- `endereco` (string): Endereço
- `capacidade` (number): Capacidade máxima
- `ativo` (boolean): Status ativo/inativo

**Response esperado (201):**
```json
{
  "id": "5",
  "clienteId": "1",
  "nome": "Estoque Novo",
  "endereco": "Rua B, 200",
  "capacidade": 5000,
  "ativo": true
}
```

---

### 4. Editar Estoque

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

**Campos editáveis (todos opcionais):**
- `nome` (string)
- `endereco` (string)
- `capacidade` (number)
- `ativo` (boolean)

**Nota:** `clienteId` NÃO pode ser alterado.

**Response esperado (200):**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Atualizado",
  "endereco": "Rua C, 300",
  "capacidade": 8000,
  "ativo": false
}
```

---

### 5. Deletar Estoque

**Rota:** `DELETE /api/estoques/apagar/{id}`

**Request:**
```typescript
await estoquesService.deletar('1');
```

**Response esperado (204):** Sem corpo

---

### 6. Inativar Estoque

**Rota:** `PATCH /api/estoques/{id}/inativar`

**Request:**
```typescript
await estoquesService.inativar('1');
```

**Response esperado (204):** Sem corpo

---

### 7. Ativar Estoque

**Rota:** `PATCH /api/estoques/{id}/ativar`

**Request:**
```typescript
await estoquesService.ativar('1');
```

**Response esperado (204):** Sem corpo

---

## 📦 PRODUTOS

### 1. Listar Produtos (com filtros)

**Rota:** `GET /api/produtos`

**Query Parameters (filtros):**
```typescript
{
    codigo?: string;         // Filtrar por código
    nome?: string;           // Filtrar por nome
    ativo?: boolean;         // Filtrar por status
    estoqueId?: string;      // Filtrar por estoque vinculado
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "codigo": "PROD001",
      "nome": "Produto A",
      "unidadePeso": "kg",
      "peso": 1.5,
      "perecivel": true,
      "ativo": true
    }
  ]
}
```

---

### 2. Buscar Produto por ID

**Rota:** `GET /api/produtos/{id}`

**Response esperado:**
```json
{
  "id": "1",
  "codigo": "PROD001",
  "nome": "Produto A",
  "unidadePeso": "kg",
  "peso": 1.5,
  "perecivel": true,
  "ativo": true
}
```

---

### 3. Cadastrar Produto

**Rota:** `POST /api/produtos`

**Request Body:**
```json
{
  "codigo": "PROD002",
  "nome": "Produto B",
  "unidadePeso": "kg",
  "peso": 2.0,
  "perecivel": false,
  "ativo": true,
  "estoquesVinculados": ["1", "2"]
}
```

**Campos obrigatórios:**
- `codigo` (string)
- `nome` (string)
- `unidadePeso` (string): "kg", "g", "l", "ml", etc.
- `peso` (number)
- `perecivel` (boolean)
- `ativo` (boolean)
- `estoquesVinculados` (string[]): Array de IDs de estoques

**Response esperado (201):**
```json
{
  "id": "2",
  "codigo": "PROD002",
  "nome": "Produto B",
  "unidadePeso": "kg",
  "peso": 2.0,
  "perecivel": false,
  "ativo": true
}
```

---

### 4. Editar Produto

**Rota:** `PUT /api/produtos/{id}`

**Request Body:**
```json
{
  "nome": "Produto B Atualizado",
  "unidadePeso": "g",
  "peso": 2000,
  "perecivel": true,
  "ativo": false,
  "estoquesVinculados": ["1", "3"]
}
```

**Campos editáveis (todos opcionais):**
- `nome` (string)
- `unidadePeso` (string)
- `peso` (number)
- `perecivel` (boolean)
- `ativo` (boolean)
- `estoquesVinculados` (string[])

**Nota:** `codigo` NÃO pode ser alterado.

---

### 5. Deletar Produto

**Rota:** `DELETE /api/produtos/{id}`

**Response esperado (204):** Sem corpo

---

### 6. Inativar Produto

**Rota:** `PATCH /api/produtos/{id}/inativar`

**Response esperado (204):** Sem corpo

---

### 7. Ativar Produto

**Rota:** `PATCH /api/produtos/{id}/ativar`

**Response esperado (204):** Sem corpo

---

### 8. Vincular Estoques ao Produto

**Rota:** `POST /api/produtos/{id}/estoques`

**Request Body:**
```json
{
  "estoqueIds": ["1", "2", "3"]
}
```

**Response esperado (204):** Sem corpo

---

### 9. Listar Cotações de um Produto

**Rota:** `GET /api/produtos/{produtoId}/cotacoes`

**Query Parameters:**
```typescript
{
    validadeAtiva?: boolean;    // Filtrar por validade
    fornecedorAtivo?: boolean;  // Filtrar fornecedores ativos
}
```

**Response esperado:**
```json
[
  {
    "id": "1",
    "fornecedorId": "1",
    "produtoId": "1",
    "preco": 10.50,
    "prazoDias": 7,
    "validadeAtiva": true
  }
]
```

---

### 10. Obter Melhor Cotação de um Produto

**Rota:** `GET /api/produtos/{produtoId}/cotacoes/melhor`

**Response esperado:**
```json
{
  "id": "1",
  "fornecedorId": "1",
  "produtoId": "1",
  "preco": 10.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

---

## 🏢 FORNECEDORES

### 1. Listar Fornecedores (com filtros)

**Rota:** `GET /api/fornecedores`

**Query Parameters:**
```typescript
{
    ativo?: boolean;
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "nome": "Fornecedor ABC",
      "cnpj": "12.345.678/0001-90",
      "contato": "contato@fornecedor.com",
      "leadTimeMedio": { "dias": 7 },
      "ativo": true
    }
  ]
}
```

---

### 2. Buscar Fornecedor por ID

**Rota:** `GET /api/fornecedores/{id}`

**Response esperado:**
```json
{
  "id": "1",
  "nome": "Fornecedor ABC",
  "cnpj": "12.345.678/0001-90",
  "contato": "contato@fornecedor.com",
  "leadTimeMedio": { "dias": 7 },
  "ativo": true
}
```

---

### 3. Cadastrar Fornecedor

**Rota:** `POST /api/fornecedores`

**Request Body:**
```json
{
  "nome": "Fornecedor XYZ",
  "cnpj": "98.765.432/0001-10",
  "contato": "contato@xyz.com",
  "leadTimeMedio": { "dias": 14 },
  "ativo": true
}
```

**Campos obrigatórios:**
- `nome` (string)
- `cnpj` (string)
- `contato` (string)
- `leadTimeMedio` (object): `{ "dias": number }`
- `ativo` (boolean)

---

### 4. Editar Fornecedor

**Rota:** `PUT /api/fornecedores/{id}`

**Request Body:**
```json
{
  "nome": "Fornecedor XYZ Atualizado",
  "contato": "novo@xyz.com",
  "leadTimeMedio": { "dias": 10 }
}
```

**Campos editáveis (todos opcionais):**
- `nome` (string)
- `contato` (string)
- `leadTimeMedio` (object): `{ "dias": number }`

**Nota:** `cnpj` NÃO pode ser alterado.

---

### 5. Deletar Fornecedor

**Rota:** `DELETE /api/fornecedores/{id}`

**Response esperado (204):** Sem corpo

---

### 6. Inativar Fornecedor

**Rota:** `PATCH /api/fornecedores/{id}/inativar`

**Response esperado (204):** Sem corpo

---

### 7. Ativar Fornecedor

**Rota:** `PATCH /api/fornecedores/{id}/ativar`

**Response esperado (204):** Sem corpo

---

### 8. Registrar Cotação (Ação Especial)

**Rota:** `POST /api/fornecedores/{fornecedorId}/cotacoes`

**Request Body:**
```json
{
  "produtoId": "1",
  "preco": 10.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `preco` (number)
- `prazoDias` (number)
- `validadeAtiva` (boolean)

**Response esperado (201):**
```json
{
  "id": "1",
  "produtoId": "1",
  "preco": 10.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

---

### 9. Atualizar Cotação

**Rota:** `PUT /api/fornecedores/{fornecedorId}/cotacoes/{cotacaoId}`

**Request Body:**
```json
{
  "preco": 9.50,
  "prazoDias": 5,
  "validadeAtiva": true
}
```

**Campos editáveis (todos opcionais):**
- `preco` (number)
- `prazoDias` (number)
- `validadeAtiva` (boolean)

---

### 10. Remover Cotação

**Rota:** `DELETE /api/fornecedores/{fornecedorId}/cotacoes/{cotacaoId}`

**Response esperado (204):** Sem corpo

---

### 11. Obter Melhor Cotação (Ação Especial)

**Rota:** `GET /api/fornecedores/melhor-cotacao/{produtoId}`

**Response esperado:**
```json
{
  "id": "1",
  "fornecedorId": "1",
  "produtoId": "1",
  "preco": 10.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

---

## 🛒 PEDIDOS

### 1. Listar Pedidos (com filtros)

**Rota:** `GET /api/pedidos`

**Query Parameters:**
```typescript
{
    clienteId?: string;
    fornecedorId?: string;
    status?: string;         // CRIADO, ENVIADO, EM_TRANSPORTE, RECEBIDO, CANCELADO, CONCLUIDO
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "clienteId": "1",
      "fornecedorId": "1",
      "dataCriacao": "2025-01-15T10:00:00Z",
      "dataPrevistaEntrega": "2025-01-22T10:00:00Z",
      "estoqueId": "1",
      "itens": [
        {
          "produtoId": "1",
          "quantidade": 100,
          "precoUnitario": 10.50
        }
      ],
      "status": "CRIADO"
    }
  ]
}
```

---

### 2. Buscar Pedido por ID

**Rota:** `GET /api/pedidos/{id}`

**Response esperado:**
```json
{
  "id": "1",
  "clienteId": "1",
  "fornecedorId": "1",
  "dataCriacao": "2025-01-15T10:00:00Z",
  "dataPrevistaEntrega": "2025-01-22T10:00:00Z",
  "estoqueId": "1",
  "itens": [
    {
      "produtoId": "1",
      "quantidade": 100,
      "precoUnitario": 10.50
    }
  ],
  "status": "CRIADO"
}
```

---

### 3. Criar Pedido

**Rota:** `POST /api/pedidos`

**Request Body:**
```json
{
  "clienteId": "1",
  "fornecedorId": "1",
  "estoqueId": "1",
  "itens": [
    {
      "produtoId": "1",
      "quantidade": 100,
      "precoUnitario": 10.50
    },
    {
      "produtoId": "2",
      "quantidade": 50,
      "precoUnitario": 5.00
    }
  ],
  "dataPrevistaEntrega": "2025-01-22T10:00:00Z"
}
```

**Campos obrigatórios:**
- `clienteId` (string)
- `fornecedorId` (string)
- `estoqueId` (string)
- `itens` (array): Array de `ItemPedido`
  - `produtoId` (string)
  - `quantidade` (number)
  - `precoUnitario` (number)
- `dataPrevistaEntrega` (string, opcional): ISO 8601

**Ações automáticas:**
- Cria reserva de estoque automaticamente
- Status inicial: `CRIADO`

**Response esperado (201):**
```json
{
  "id": "1",
  "clienteId": "1",
  "fornecedorId": "1",
  "dataCriacao": "2025-01-15T10:00:00Z",
  "dataPrevistaEntrega": "2025-01-22T10:00:00Z",
  "estoqueId": "1",
  "itens": [...],
  "status": "CRIADO"
}
```

---

### 4. Adicionar Item ao Pedido (Ação Especial)

**Rota:** `POST /api/pedidos/{id}/itens`

**Request Body:**
```json
{
  "produtoId": "3",
  "quantidade": 25,
  "precoUnitario": 8.00
}
```

**Response esperado (204):** Sem corpo

---

### 5. Enviar Pedido (Ação Especial - Botão)

**Rota:** `PATCH /api/pedidos/{id}/enviar`

**Request:**
```typescript
await pedidosService.enviar('1');
```

**Ações automáticas:**
- Status muda para `ENVIADO`

**Response esperado (204):** Sem corpo

---

### 6. Iniciar Transporte (Ação Especial - Botão)

**Rota:** `PATCH /api/pedidos/{id}/iniciar-transporte`

**Request:**
```typescript
await pedidosService.iniciarTransporte('1');
```

**Ações automáticas:**
- Status muda para `EM_TRANSPORTE`

**Response esperado (204):** Sem corpo

---

### 7. Confirmar Recebimento (Ação Especial - Botão)

**Rota:** `PATCH /api/pedidos/{id}/confirmar-recebimento`

**Request:**
```typescript
await pedidosService.confirmarRecebimento('1');
```

**Ações automáticas:**
- Status muda para `RECEBIDO`
- Movimentação de ENTRADA é registrada
- Reserva de estoque é liberada

**Response esperado (204):** Sem corpo

---

### 8. Cancelar Pedido (Ação Especial - Botão)

**Rota:** `PATCH /api/pedidos/{id}/cancelar`

**Request:**
```typescript
await pedidosService.cancelar('1');
```

**Ações automáticas:**
- Status muda para `CANCELADO`
- Reserva de estoque é liberada

**Response esperado (204):** Sem corpo

**Validação:** Não pode cancelar se status for `EM_TRANSPORTE` ou `RECEBIDO`

---

### 9. Concluir Pedido (Ação Especial)

**Rota:** `PATCH /api/pedidos/{id}/concluir`

**Request:**
```typescript
await pedidosService.concluir('1');
```

**Ações automáticas:**
- Status muda para `CONCLUIDO`

**Response esperado (204):** Sem corpo

---

### 10. Registrar Custo do Pedido (Ação Especial)

**Rota:** `POST /api/pedidos/{id}/custo`

**Request Body:**
```json
{
  "valorItens": 1000.00,
  "frete": 50.00,
  "custosLogisticos": 25.00
}
```

**Campos obrigatórios:**
- `valorItens` (number)
- `frete` (number)
- `custosLogisticos` (number)

**Response esperado:**
```json
{
  "valorItens": 1000.00,
  "frete": 50.00,
  "custosLogisticos": 25.00,
  "valorTotal": 1075.00
}
```

---

## 🚨 ALERTAS

### 1. Listar Alertas (com filtros)

**Rota:** `GET /api/alertas`

**Query Parameters:**
```typescript
{
    ativo?: boolean;
    produtoId?: string;
    estoqueId?: string;
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "produtoId": "1",
      "estoqueId": "1",
      "dataGeracao": "2025-01-15T10:00:00Z",
      "fornecedorSugerido": "1",
      "ativo": true
    }
  ]
}
```

---

### 2. Buscar Alerta por ID

**Rota:** `GET /api/alertas/{id}`

**Response esperado:**
```json
{
  "id": "1",
  "produtoId": "1",
  "estoqueId": "1",
  "dataGeracao": "2025-01-15T10:00:00Z",
  "fornecedorSugerido": "1",
  "ativo": true
}
```

---

### 3. Gerar Alerta

**Rota:** `POST /api/alertas`

**Request Body:**
```json
{
  "produtoId": "1",
  "estoqueId": "1"
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `estoqueId` (string)

**Ações automáticas:**
- Alerta é gerado quando produto atinge ROP
- Fornecedor sugerido é calculado (melhor cotação)

**Response esperado (201):**
```json
{
  "id": "1",
  "produtoId": "1",
  "estoqueId": "1",
  "dataGeracao": "2025-01-15T10:00:00Z",
  "fornecedorSugerido": "1",
  "ativo": true
}
```

---

### 4. Desativar Alerta

**Rota:** `PATCH /api/alertas/{id}/desativar`

**Request:**
```typescript
await alertasService.desativar('1');
```

**Response esperado (204):** Sem corpo

---

### 5. Atualizar Fornecedor Sugerido (Ação Especial)

**Rota:** `PATCH /api/alertas/{id}/fornecedor-sugerido`

**Request Body:**
```json
{
  "fornecedorSugerido": "2"
}
```

**Campos obrigatórios:**
- `fornecedorSugerido` (string): ID do fornecedor

**Response esperado (204):** Sem corpo

---

### 6. Gerar Pedido a partir de Alerta (Ação Especial - Botão)

**Rota:** `POST /api/alertas/{id}/gerar-pedido`

**Request:**
```typescript
await alertasService.gerarPedido('1');
```

**Request Body:**
```json
{}
```

**Ações automáticas:**
- Cria pedido com base no alerta
- Usa fornecedor sugerido
- Usa quantidade baseada no ROP

**Response esperado (201):**
```json
{
  "id": "1"
}
```

---

## 📊 MOVIMENTAÇÕES

### 1. Listar Movimentações (com filtros)

**Rota:** `GET /api/estoques/{estoqueId}/movimentacoes`

**Query Parameters:**
```typescript
{
    tipo?: string;           // ENTRADA ou SAIDA
    produtoId?: string;
    dataInicio?: string;     // ISO 8601
    dataFim?: string;        // ISO 8601
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": 1,
      "tipo": "ENTRADA",
      "produtoId": "1",
      "quantidade": 100,
      "dataHora": "2025-01-15T10:00:00Z",
      "meta": {}
    }
  ]
}
```

---

### 2. Buscar Movimentação por ID

**Rota:** `GET /api/movimentacoes/{id}`

**Response esperado:**
```json
{
  "id": 1,
  "tipo": "ENTRADA",
  "produtoId": "1",
  "quantidade": 100,
  "dataHora": "2025-01-15T10:00:00Z",
  "meta": {}
}
```

---

### 3. Registrar Entrada (Ação Especial)

**Rota:** `POST /api/estoques/{estoqueId}/movimentacoes/entrada`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 100,
  "responsavel": "João Silva",
  "motivo": "Recebimento de pedido",
  "meta": {
    "pedidoId": "1"
  }
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `quantidade` (number)
- `responsavel` (string)
- `motivo` (string)
- `meta` (object, opcional): Metadados adicionais

**Ações automáticas:**
- Saldo físico é atualizado
- Saldo disponível é atualizado

**Response esperado (201):**
```json
{
  "id": 1,
  "tipo": "ENTRADA",
  "produtoId": "1",
  "quantidade": 100,
  "dataHora": "2025-01-15T10:00:00Z",
  "meta": {
    "pedidoId": "1"
  }
}
```

---

### 4. Registrar Saída (Ação Especial)

**Rota:** `POST /api/estoques/{estoqueId}/movimentacoes/saida`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 50,
  "responsavel": "Maria Santos",
  "motivo": "Venda",
  "meta": {
    "vendaId": "1"
  }
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `quantidade` (number)
- `responsavel` (string)
- `motivo` (string)
- `meta` (object, opcional)

**Ações automáticas:**
- Saldo físico é atualizado
- Saldo disponível é atualizado
- Verifica se há saldo suficiente

**Response esperado (201):**
```json
{
  "id": 2,
  "tipo": "SAIDA",
  "produtoId": "1",
  "quantidade": 50,
  "dataHora": "2025-01-15T11:00:00Z",
  "meta": {
    "vendaId": "1"
  }
}
```

---

## 🔄 TRANSFERÊNCIAS

### 1. Listar Transferências (com filtros)

**Rota:** `GET /api/transferencias`

**Query Parameters:**
```typescript
{
    estoqueOrigemId?: string;
    estoqueDestinoId?: string;
    produtoId?: string;
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": 1,
      "produtoId": "1",
      "estoqueOrigemId": "1",
      "estoqueDestinoId": "2",
      "quantidade": 50,
      "dataHora": "2025-01-15T10:00:00Z",
      "motivo": "Reorganização de estoque"
    }
  ]
}
```

---

### 2. Buscar Transferência por ID

**Rota:** `GET /api/transferencias/{id}`

**Response esperado:**
```json
{
  "id": 1,
  "produtoId": "1",
  "estoqueOrigemId": "1",
  "estoqueDestinoId": "2",
  "quantidade": 50,
  "dataHora": "2025-01-15T10:00:00Z",
  "motivo": "Reorganização de estoque"
}
```

---

### 3. Criar Transferência

**Rota:** `POST /api/transferencias`

**Request Body:**
```json
{
  "produtoId": "1",
  "estoqueOrigemId": "1",
  "estoqueDestinoId": "2",
  "quantidade": 50,
  "responsavel": "João Silva",
  "motivo": "Reorganização de estoque"
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `estoqueOrigemId` (string)
- `estoqueDestinoId` (string)
- `quantidade` (number)
- `responsavel` (string)
- `motivo` (string)

**Ações automáticas:**
- Movimentação de SAÍDA no estoque origem
- Movimentação de ENTRADA no estoque destino
- Saldos atualizados em ambos os estoques

**Response esperado (201):**
```json
{
  "id": 1,
  "produtoId": "1",
  "estoqueOrigemId": "1",
  "estoqueDestinoId": "2",
  "quantidade": 50,
  "dataHora": "2025-01-15T10:00:00Z",
  "motivo": "Reorganização de estoque"
}
```

---

## 🔒 RESERVAS

### 1. Listar Reservas (com filtros)

**Rota:** `GET /api/estoques/{estoqueId}/reservas`

**Query Parameters:**
```typescript
{
    tipo?: string;           // RESERVA ou LIBERACAO
    produtoId?: string;
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "produtoId": "1",
      "quantidade": 100,
      "dataHora": "2025-01-15T10:00:00Z",
      "tipo": "RESERVA"
    }
  ]
}
```

---

### 2. Reservar Estoque (Ação Especial)

**Rota:** `POST /api/estoques/{estoqueId}/reservas`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 100
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `quantidade` (number)

**Ações automáticas:**
- Saldo reservado é atualizado
- Saldo disponível é atualizado
- Verifica se há saldo disponível suficiente

**Response esperado (201):**
```json
{
  "produtoId": "1",
  "quantidade": 100,
  "dataHora": "2025-01-15T10:00:00Z",
  "tipo": "RESERVA"
}
```

---

### 3. Liberar Reserva (Ação Especial)

**Rota:** `POST /api/estoques/{estoqueId}/reservas/liberar`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 100
}
```

**Campos obrigatórios:**
- `produtoId` (string)
- `quantidade` (number)

**Ações automáticas:**
- Saldo reservado é reduzido
- Saldo disponível é aumentado

**Response esperado (201):**
```json
{
  "produtoId": "1",
  "quantidade": 100,
  "dataHora": "2025-01-15T10:00:00Z",
  "tipo": "LIBERACAO"
}
```

---

## 💰 COTAÇÕES

### 1. Aprovar Cotação (Ação Especial - Botão)

**Rota:** `PATCH /api/cotacoes/{id}/aprovar`

**Request Body:**
```json
{
  "aprovada": true
}
```

**Campos obrigatórios:**
- `aprovada` (boolean)

**Response esperado:**
```json
{
  "id": "1",
  "produtoId": "1",
  "preco": 10.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

---

## 👥 CLIENTES

### 1. Listar Clientes (com filtros)

**Rota:** `GET /api/clientes`

**Query Parameters:**
```typescript
{
    nome?: string;
    documento?: string;
    page?: number;
    size?: number;
}
```

**Response esperado:**
```json
{
  "content": [
    {
      "id": "1",
      "nome": "Cliente ABC",
      "documento": "12.345.678/0001-90",
      "email": "contato@cliente.com"
    }
  ]
}
```

---

### 2. Buscar Cliente por ID

**Rota:** `GET /api/clientes/{id}`

**Response esperado:**
```json
{
  "id": "1",
  "nome": "Cliente ABC",
  "documento": "12.345.678/0001-90",
  "email": "contato@cliente.com",
  "estoques": []
}
```

---

### 3. Cadastrar Cliente

**Rota:** `POST /api/clientes`

**Request Body:**
```json
{
  "nome": "Cliente XYZ",
  "documento": "98.765.432/0001-10",
  "email": "contato@xyz.com"
}
```

**Campos obrigatórios:**
- `nome` (string)
- `documento` (string): CNPJ único
- `email` (string): Email válido

**Response esperado (201):**
```json
{
  "id": "2",
  "nome": "Cliente XYZ",
  "documento": "98.765.432/0001-10",
  "email": "contato@xyz.com"
}
```

---

### 4. Editar Cliente

**Rota:** `PUT /api/clientes/{id}`

**Request Body:**
```json
{
  "nome": "Cliente XYZ Atualizado",
  "email": "novo@xyz.com"
}
```

**Campos editáveis (todos opcionais):**
- `nome` (string)
- `email` (string)

**Nota:** `documento` NÃO pode ser alterado.

**Response esperado (200):**
```json
{
  "id": "2",
  "nome": "Cliente XYZ Atualizado",
  "documento": "98.765.432/0001-10",
  "email": "novo@xyz.com"
}
```

---

## 📈 ROP (Ponto de Ressuprimento)

### 1. Calcular ROP (Ação Especial)

**Rota:** `POST /api/estoques/{estoqueId}/produtos/{produtoId}/rop`

**Request Body:**
```json
{
  "consumoMedio": 150.5,
  "leadTimeDias": 7,
  "estoqueSeguranca": 200
}
```

**Campos obrigatórios:**
- `consumoMedio` (number): Consumo médio diário
- `leadTimeDias` (number): Lead time em dias
- `estoqueSeguranca` (number): Estoque de segurança

**Response esperado:**
```json
{
  "produtoId": "1",
  "valor": 1350
}
```

---

### 2. Obter ROP

**Rota:** `GET /api/estoques/{estoqueId}/produtos/{produtoId}/rop`

**Response esperado:**
```json
{
  "produtoId": "1",
  "valor": 1350
}
```

---

### 3. Listar ROPs de um Estoque

**Rota:** `GET /api/estoques/{estoqueId}/rops`

**Response esperado:**
```json
{
  "1": {
    "produtoId": "1",
    "valor": 1350
  },
  "2": {
    "produtoId": "2",
    "valor": 800
  }
}
```

---

### 4. Obter Consumo Médio

**Rota:** `GET /api/estoques/{estoqueId}/produtos/{produtoId}/consumo-medio`

**Response esperado:**
```json
{
  "consumoMedio": 150.5,
  "periodoDias": 90,
  "totalConsumido": 13545
}
```

---

### 5. Obter Histórico de Consumo

**Rota:** `GET /api/estoques/{estoqueId}/produtos/{produtoId}/historico-consumo`

**Response esperado:**
```json
{
  "periodoDias": 90,
  "consumoTotal": 13545,
  "consumoMedioDiario": 150.5,
  "movimentacoes": [
    {
      "data": "2025-01-15",
      "tipo": "SAIDA",
      "quantidade": 350
    }
  ]
}
```

---

## 📋 RESUMO DE AÇÕES ESPECIAIS (BOTÕES)

### Pedidos
- **Enviar Pedido:** `PATCH /api/pedidos/{id}/enviar`
- **Iniciar Transporte:** `PATCH /api/pedidos/{id}/iniciar-transporte`
- **Confirmar Recebimento:** `PATCH /api/pedidos/{id}/confirmar-recebimento`
- **Cancelar Pedido:** `PATCH /api/pedidos/{id}/cancelar`

### Alertas
- **Gerar Pedido:** `POST /api/alertas/{id}/gerar-pedido`
- **Atualizar Fornecedor Sugerido:** `PATCH /api/alertas/{id}/fornecedor-sugerido`

### Cotações
- **Aprovar Cotação:** `PATCH /api/cotacoes/{id}/aprovar`

### Movimentações
- **Registrar Entrada:** `POST /api/estoques/{estoqueId}/movimentacoes/entrada`
- **Registrar Saída:** `POST /api/estoques/{estoqueId}/movimentacoes/saida`

### Reservas
- **Reservar Estoque:** `POST /api/estoques/{estoqueId}/reservas`
- **Liberar Reserva:** `POST /api/estoques/{estoqueId}/reservas/liberar`

---

## 🔄 AÇÕES AUTOMÁTICAS DO SISTEMA

### Ao Criar Pedido:
1. Valida cotação válida para cada produto
2. Cria reserva de estoque automaticamente
3. Status inicial: `CRIADO`

### Ao Confirmar Recebimento:
1. Status muda para `RECEBIDO`
2. Movimentação de ENTRADA é registrada
3. Reserva de estoque é liberada

### Ao Cancelar Pedido:
1. Status muda para `CANCELADO`
2. Reserva de estoque é liberada

### Ao Realizar Transferência:
1. Movimentação de SAÍDA no estoque origem
2. Movimentação de ENTRADA no estoque destino
3. Saldos atualizados em ambos

### Ao Gerar Alerta:
1. Alerta é gerado quando produto atinge ROP
2. Fornecedor sugerido é calculado (melhor cotação)

### Ao Receber Pedido de Alerta:
1. Alerta é desativado automaticamente

---

## 📊 CÓDIGOS DE STATUS HTTP

- **200 OK:** Operação bem-sucedida (GET, PUT)
- **201 Created:** Recurso criado com sucesso (POST)
- **204 No Content:** Operação bem-sucedida sem conteúdo (DELETE, PATCH)
- **400 Bad Request:** Erro de validação ou regra de negócio
- **401 Unauthorized:** Não autenticado
- **403 Forbidden:** Não autorizado
- **404 Not Found:** Recurso não encontrado
- **500 Internal Server Error:** Erro interno do servidor

---

## 🔐 AUTENTICAÇÃO

Todas as requisições devem incluir o header:
```
Authorization: Bearer {token}
```

O token é obtido do `localStorage.getItem('authToken')` e enviado automaticamente pelo serviço de API.

