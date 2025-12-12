# Rotas da API - Sistema Gestock

## 📋 Base URL
```
http://localhost:3000/api
```

---

## 🔐 Autenticação
Todas as rotas (exceto login) requerem autenticação via token JWT no header:
```
Authorization: Bearer <token>
```

---

## 1. Gerenciar Estoques

### 1.1. Listar Estoques
**GET** `/estoques`

**Query Parameters:**
- `clienteId` (opcional): Filtrar por cliente
- `nome` (opcional): Buscar por nome
- `endereco` (opcional): Buscar por endereço
- `ativo` (opcional): Filtrar por status (true/false)
- `page` (opcional): Número da página (default: 0)
- `size` (opcional): Tamanho da página (default: 20)

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "clienteId": "1",
      "nome": "Estoque Central",
      "endereco": "Rua A, 100 - São Paulo",
      "capacidade": 10000,
      "ativo": true,
      "saldos": {},
      "rops": {},
      "movimentacoes": [],
      "reservas": []
    }
  ],
  "totalElements": 10,
  "totalPages": 1,
  "page": 0,
  "size": 20
}
```

---

### 1.2. Buscar Estoque por ID
**GET** `/estoques/{id}`

**Response 200:**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Central",
  "endereco": "Rua A, 100 - São Paulo",
  "capacidade": 10000,
  "ativo": true,
  "saldos": {
    "1": {
      "fisico": 5000,
      "reservado": 0,
      "disponivel": 5000
    }
  },
  "rops": {
    "1": {
      "consumoMedio": 150,
      "leadTimeDias": 7,
      "estoqueSeguranca": 300,
      "valorROP": 1350
    }
  },
  "movimentacoes": [],
  "reservas": []
}
```

---

### 1.3. Criar Estoque
**POST** `/estoques`

**Request Body:**
```json
{
  "clienteId": "1",
  "nome": "Estoque Central",
  "endereco": "Rua A, 100 - São Paulo",
  "capacidade": 10000,
  "ativo": true
}
```

**Validações:**
- `clienteId` obrigatório
- `nome` obrigatório e único
- `endereco` obrigatório e único
- `capacidade` obrigatório e > 0

**Response 201:**
```json
{
  "id": "1",
  "clienteId": "1",
  "nome": "Estoque Central",
  "endereco": "Rua A, 100 - São Paulo",
  "capacidade": 10000,
  "ativo": true
}
```

**Response 400:** Validação falhou (nome duplicado, endereço duplicado, etc.)

---

### 1.4. Atualizar Estoque
**PUT** `/estoques/{id}`

**Request Body:**
```json
{
  "nome": "Estoque Central Atualizado",
  "endereco": "Rua A, 100 - São Paulo",
  "capacidade": 12000,
  "ativo": true
}
```

**Validações:**
- Não pode diminuir capacidade se ocupada
- `nome` deve ser único
- `endereco` deve ser único

**Response 200:** Estoque atualizado

**Response 400:** Validação falhou

---

### 1.5. Inativar Estoque
**PATCH** `/estoques/{id}/inativar`

**Validações:**
- Estoque não pode ter produtos
- Estoque não pode ter pedidos alocados em andamento

**Response 200:** Estoque inativado

**Response 400:** Não pode inativar (tem produtos ou pedidos)

---

### 1.6. Ativar Estoque
**PATCH** `/estoques/{id}/ativar`

**Response 200:** Estoque ativado

---

### 1.7. Deletar Estoque
**DELETE** `/estoques/{id}`

**Validações:**
- Estoque não pode ter produtos
- Estoque não pode ter pedidos alocados

**Response 204:** Estoque deletado

**Response 400:** Não pode deletar (tem produtos ou pedidos)

---

## 2. Gerenciar Fornecedores

### 2.1. Listar Fornecedores
**GET** `/fornecedores`

**Query Parameters:**
- `ativo` (opcional): Filtrar por status
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "nome": "Fornecedor ABC",
      "cnpj": "12.345.678/0001-90",
      "contato": "(11) 99999-9999",
      "leadTimeMedio": {
        "dias": 7
      },
      "ativo": true,
      "cotacoes": {}
    }
  ],
  "totalElements": 5,
  "totalPages": 1
}
```

---

### 2.2. Buscar Fornecedor por ID
**GET** `/fornecedores/{id}`

**Response 200:**
```json
{
  "id": "1",
  "nome": "Fornecedor ABC",
  "cnpj": "12.345.678/0001-90",
  "contato": "(11) 99999-9999",
  "leadTimeMedio": {
    "dias": 7
  },
  "ativo": true,
  "cotacoes": {
    "1": {
      "id": "1",
      "produtoId": "1",
      "preco": 0.50,
      "prazoDias": 7,
      "validadeAtiva": true
    }
  }
}
```

---

### 2.3. Criar Fornecedor
**POST** `/fornecedores`

**Request Body:**
```json
{
  "nome": "Fornecedor ABC",
  "cnpj": "12.345.678/0001-90",
  "contato": "(11) 99999-9999",
  "leadTimeMedio": {
    "dias": 7
  },
  "ativo": true
}
```

**Validações:**
- `cnpj` obrigatório e válido
- `leadTimeMedio.dias` obrigatório e > 0

**Response 201:** Fornecedor criado

---

### 2.4. Atualizar Fornecedor
**PUT** `/fornecedores/{id}`

**Request Body:**
```json
{
  "nome": "Fornecedor ABC Atualizado",
  "contato": "(11) 88888-8888",
  "leadTimeMedio": {
    "dias": 10
  }
}
```

**Validações:**
- Alterar Lead Time recalcula ROP dos produtos associados

**Response 200:** Fornecedor atualizado

---

### 2.5. Inativar Fornecedor
**PATCH** `/fornecedores/{id}/inativar`

**Validações:**
- Não pode inativar se houver pedidos pendentes

**Response 200:** Fornecedor inativado

**Response 400:** Não pode inativar (tem pedidos pendentes)

---

### 2.6. Ativar Fornecedor
**PATCH** `/fornecedores/{id}/ativar`

**Response 200:** Fornecedor ativado

---

### 2.7. Registrar Cotação
**POST** `/fornecedores/{fornecedorId}/cotacoes`

**Request Body:**
```json
{
  "produtoId": "1",
  "preco": 0.50,
  "prazoDias": 7,
  "validadeAtiva": true
}
```

**Validações:**
- `produtoId` obrigatório
- `preco` obrigatório e > 0
- `prazoDias` obrigatório e > 0

**Response 201:** Cotação registrada

---

### 2.8. Atualizar Cotação
**PUT** `/fornecedores/{fornecedorId}/cotacoes/{cotacaoId}`

**Request Body:**
```json
{
  "preco": 0.45,
  "prazoDias": 5,
  "validadeAtiva": true
}
```

**Response 200:** Cotação atualizada

---

### 2.9. Remover Cotação
**DELETE** `/fornecedores/{fornecedorId}/cotacoes/{cotacaoId}`

**Response 204:** Cotação removida

---

### 2.10. Obter Melhor Cotação para Produto
**GET** `/fornecedores/melhor-cotacao/{produtoId}`

**Response 200:**
```json
{
  "id": "2",
  "fornecedorId": "2",
  "produtoId": "1",
  "preco": 0.45,
  "prazoDias": 5,
  "validadeAtiva": true
}
```

---

## 3. Gerenciar Produtos

### 3.1. Listar Produtos
**GET** `/produtos`

**Query Parameters:**
- `codigo` (opcional): Buscar por código
- `nome` (opcional): Buscar por nome
- `ativo` (opcional): Filtrar por status
- `estoqueId` (opcional): Filtrar produtos vinculados a estoque
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "codigo": "PROD001",
      "nome": "Parafuso M6",
      "unidadePeso": "g",
      "peso": 5.2,
      "perecivel": false,
      "ativo": true
    }
  ],
  "totalElements": 20,
  "totalPages": 2
}
```

---

### 3.2. Buscar Produto por ID
**GET** `/produtos/{id}`

**Response 200:**
```json
{
  "id": "1",
  "codigo": "PROD001",
  "nome": "Parafuso M6",
  "unidadePeso": "g",
      "peso": 5.2,
      "perecivel": false,
      "ativo": true
}
```

---

### 3.3. Criar Produto
**POST** `/produtos`

**Request Body:**
```json
{
  "codigo": "PROD001",
  "nome": "Parafuso M6",
  "unidadePeso": "g",
  "peso": 5.2,
  "perecivel": false,
  "ativo": true,
  "estoquesVinculados": ["1", "2"]
}
```

**Validações:**
- `codigo` obrigatório e único
- `nome` obrigatório
- `unidadePeso` obrigatório
- `peso` obrigatório e > 0
- `estoquesVinculados` obrigatório e não vazio
- Todos os estoques devem estar ativos

**Response 201:** Produto criado

**Response 400:** Validação falhou (código duplicado, estoque inativo, etc.)

---

### 3.4. Atualizar Produto
**PUT** `/produtos/{id}`

**Request Body:**
```json
{
  "nome": "Parafuso M6 Atualizado",
  "unidadePeso": "g",
  "peso": 5.5,
  "perecivel": false,
  "ativo": true,
  "estoquesVinculados": ["1", "2"]
}
```

**Validações:**
- Alterações não afetam cotações existentes
- Deve manter pelo menos um estoque vinculado ativo

**Response 200:** Produto atualizado

---

### 3.5. Inativar Produto
**PATCH** `/produtos/{id}/inativar`

**Validações:**
- Não pode inativar se houver saldo positivo em qualquer estoque
- Não pode inativar se houver pedidos em andamento

**Response 200:** Produto inativado

**Response 400:** Não pode inativar (tem saldo ou pedidos)

---

### 3.6. Ativar Produto
**PATCH** `/produtos/{id}/ativar`

**Response 200:** Produto ativado

---

### 3.7. Vincular Produto a Estoques
**POST** `/produtos/{id}/estoques`

**Request Body:**
```json
{
  "estoqueIds": ["1", "2"]
}
```

**Validações:**
- Todos os estoques devem estar ativos
- Pelo menos um estoque deve ser vinculado

**Response 200:** Produto vinculado aos estoques

---

## 4. Gerenciar Pedidos

### 4.1. Listar Pedidos
**GET** `/pedidos`

**Query Parameters:**
- `clienteId` (opcional): Filtrar por cliente
- `fornecedorId` (opcional): Filtrar por fornecedor
- `status` (opcional): Filtrar por status (CRIADO, ENVIADO, EM_TRANSPORTE, RECEBIDO, CANCELADO, CONCLUIDO)
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "clienteId": "1",
      "fornecedorId": "2",
      "dataCriacao": "2025-10-15",
      "dataPrevistaEntrega": "2025-10-21",
      "estoqueId": "1",
      "itens": [
        {
          "produtoId": "1",
          "quantidade": 10000,
          "precoUnitario": 0.50
        }
      ],
      "custo": {
        "valorItens": 5000.00,
        "frete": 200.00,
        "custosLogisticos": 100.00,
        "valorTotal": 5300.00
      },
      "status": "RECEBIDO"
    }
  ],
  "totalElements": 15,
  "totalPages": 2
}
```

---

### 4.2. Buscar Pedido por ID
**GET** `/pedidos/{id}`

**Response 200:**
```json
{
  "id": "1",
  "clienteId": "1",
  "fornecedorId": "2",
  "dataCriacao": "2025-10-15",
  "dataPrevistaEntrega": "2025-10-21",
  "estoqueId": "1",
  "itens": [
    {
      "produtoId": "1",
      "quantidade": 10000,
      "precoUnitario": 0.50
    }
  ],
  "custo": {
    "valorItens": 5000.00,
    "frete": 200.00,
    "custosLogisticos": 100.00,
    "valorTotal": 5300.00
  },
  "status": "RECEBIDO"
}
```

---

### 4.3. Criar Pedido
**POST** `/pedidos`

**Request Body:**
```json
{
  "clienteId": "1",
  "fornecedorId": "2",
  "estoqueId": "1",
  "itens": [
    {
      "produtoId": "1",
      "quantidade": 10000,
      "precoUnitario": 0.50
    }
  ],
  "dataPrevistaEntrega": "2025-10-21"
}
```

**Validações:**
- Deve existir cotação válida para cada produto
- Fornecedor deve estar ativo
- Produtos devem estar ativos
- Estoque deve estar ativo
- Data prevista deve ser calculada baseada no Lead Time (pode ser sobrescrita)

**Ações Automáticas:**
- Reserva de estoque é criada automaticamente
- Status inicial: CRIADO

**Response 201:** Pedido criado

**Response 400:** Validação falhou (sem cotação válida, etc.)

---

### 4.4. Adicionar Item ao Pedido
**POST** `/pedidos/{id}/itens`

**Request Body:**
```json
{
  "produtoId": "2",
  "quantidade": 50,
  "precoUnitario": 85.00
}
```

**Validações:**
- Deve existir cotação válida para o produto
- Pedido deve estar em status CRIADO

**Response 200:** Item adicionado

---

### 4.5. Enviar Pedido
**PATCH** `/pedidos/{id}/enviar`

**Validações:**
- Pedido deve estar em status CRIADO

**Ações:**
- Status muda para ENVIADO

**Response 200:** Pedido enviado

---

### 4.6. Iniciar Transporte
**PATCH** `/pedidos/{id}/iniciar-transporte`

**Validações:**
- Pedido deve estar em status ENVIADO

**Ações:**
- Status muda para EM_TRANSPORTE

**Response 200:** Transporte iniciado

---

### 4.7. Confirmar Recebimento
**PATCH** `/pedidos/{id}/confirmar-recebimento`

**Validações:**
- Pedido não pode estar CANCELADO ou já RECEBIDO

**Ações Automáticas:**
- Status muda para RECEBIDO
- Movimentação de ENTRADA é registrada automaticamente
- Reserva de estoque é liberada automaticamente

**Response 200:** Recebimento confirmado

---

### 4.8. Cancelar Pedido
**PATCH** `/pedidos/{id}/cancelar`

**Validações:**
- Pedido não pode estar em status EM_TRANSPORTE
- Pedido não pode estar RECEBIDO ou CANCELADO

**Ações Automáticas:**
- Status muda para CANCELADO
- Reserva de estoque é liberada automaticamente

**Response 200:** Pedido cancelado

**Response 400:** Não pode cancelar (em transporte)

---

### 4.9. Concluir Pedido
**PATCH** `/pedidos/{id}/concluir`

**Validações:**
- Pedido deve estar em status RECEBIDO

**Ações:**
- Status muda para CONCLUIDO

**Response 200:** Pedido concluído

---

### 4.10. Registrar Custo do Pedido
**POST** `/pedidos/{id}/custo`

**Request Body:**
```json
{
  "valorItens": 5000.00,
  "frete": 200.00,
  "custosLogisticos": 100.00
}
```

**Response 200:** Custo registrado

---

## 5. Calcular Ponto de Ressuprimento (ROP)

### 5.1. Calcular ROP para Produto em Estoque
**POST** `/estoques/{estoqueId}/produtos/{produtoId}/rop`

**Request Body:**
```json
{
  "consumoMedio": 150,
  "leadTimeDias": 7,
  "estoqueSeguranca": 300
}
```

**Response 200:**
```json
{
  "consumoMedio": 150,
  "leadTimeDias": 7,
  "estoqueSeguranca": 300,
  "valorROP": 1350
}
```

---

### 5.2. Obter ROP Calculado
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/rop`

**Response 200:**
```json
{
  "consumoMedio": 150,
  "leadTimeDias": 7,
  "estoqueSeguranca": 300,
  "valorROP": 1350
}
```

---

### 5.3. Listar ROPs de um Estoque
**GET** `/estoques/{estoqueId}/rops`

**Response 200:**
```json
{
  "1": {
    "consumoMedio": 150,
    "leadTimeDias": 7,
    "estoqueSeguranca": 300,
    "valorROP": 1350
  },
  "2": {
    "consumoMedio": 5,
    "leadTimeDias": 10,
    "estoqueSeguranca": 20,
    "valorROP": 70
  }
}
```

---

### 5.4. Calcular Consumo Médio (Últimos 90 dias)
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/consumo-medio`

**Response 200:**
```json
{
  "consumoMedio": 150.5,
  "periodoDias": 90,
  "totalConsumido": 13545
}
```

---

## 6. Emitir Alertas de Estoque Baixo

### 6.1. Listar Alertas Ativos
**GET** `/alertas`

**Query Parameters:**
- `ativo` (opcional): Filtrar por status (default: true)
- `produtoId` (opcional): Filtrar por produto
- `estoqueId` (opcional): Filtrar por estoque
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "produtoId": "1",
      "estoqueId": "2",
      "dataGeracao": "2025-10-18T10:00:00",
      "fornecedorSugerido": "3",
      "ativo": true
    }
  ],
  "totalElements": 5,
  "totalPages": 1
}
```

---

### 6.2. Buscar Alerta por ID
**GET** `/alertas/{id}`

**Response 200:**
```json
{
  "id": "1",
  "produtoId": "1",
  "estoqueId": "2",
  "dataGeracao": "2025-10-18T10:00:00",
  "fornecedorSugerido": "3",
  "ativo": true
}
```

---

### 6.3. Gerar Alerta Manualmente
**POST** `/alertas`

**Request Body:**
```json
{
  "produtoId": "1",
  "estoqueId": "2"
}
```

**Validações:**
- Produto deve estar abaixo do ROP
- Fornecedor sugerido é calculado automaticamente (melhor cotação)

**Response 201:** Alerta gerado

---

### 6.4. Desativar Alerta
**PATCH** `/alertas/{id}/desativar`

**Ações:**
- Alerta é desativado automaticamente após recebimento do pedido

**Response 200:** Alerta desativado

---

### 6.5. Atualizar Fornecedor Sugerido
**PATCH** `/alertas/{id}/fornecedor-sugerido`

**Request Body:**
```json
{
  "fornecedorSugerido": "2"
}
```

**Response 200:** Fornecedor sugerido atualizado

---

### 6.6. Gerar Pedido a partir de Alerta
**POST** `/alertas/{id}/gerar-pedido`

**Ações Automáticas:**
- Cria pedido com base no alerta
- Usa fornecedor sugerido
- Usa quantidade baseada no ROP

**Response 201:** Pedido gerado

---

## 7. Selecionar Cotação Mais Vantajosa

### 7.1. Listar Cotações de um Produto
**GET** `/produtos/{produtoId}/cotacoes`

**Query Parameters:**
- `validadeAtiva` (opcional): Filtrar por validade (true/false)
- `fornecedorAtivo` (opcional): Filtrar apenas fornecedores ativos (default: true)

**Response 200:**
```json
[
  {
    "id": "1",
    "fornecedorId": "1",
    "produtoId": "1",
    "preco": 0.50,
    "prazoDias": 7,
    "validadeAtiva": true
  },
  {
    "id": "2",
    "fornecedorId": "2",
    "produtoId": "1",
    "preco": 0.45,
    "prazoDias": 5,
    "validadeAtiva": true
  }
]
```

---

### 7.2. Obter Cotação Mais Vantajosa
**GET** `/produtos/{produtoId}/cotacoes/melhor`

**Response 200:**
```json
{
  "id": "2",
  "fornecedorId": "2",
  "produtoId": "1",
  "preco": 0.45,
  "prazoDias": 5,
  "validadeAtiva": true
}
```

**Critérios:**
1. Menor preço entre cotações válidas
2. Em caso de empate, menor Lead Time

---

### 7.3. Aprovar/Selecionar Cotação
**PATCH** `/cotacoes/{id}/aprovar`

**Request Body:**
```json
{
  "aprovada": true
}
```

**Response 200:** Cotação aprovada

---

## 8. Registrar Movimentações de Estoque

### 8.1. Listar Movimentações
**GET** `/estoques/{estoqueId}/movimentacoes`

**Query Parameters:**
- `tipo` (opcional): Filtrar por tipo (ENTRADA, SAIDA)
- `produtoId` (opcional): Filtrar por produto
- `dataInicio` (opcional): Filtrar a partir de data (ISO 8601)
- `dataFim` (opcional): Filtrar até data (ISO 8601)
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": 1,
      "tipo": "ENTRADA",
      "produtoId": "1",
      "quantidade": 3500,
      "dataHora": "2025-10-22T10:00:00",
      "responsavel": "Carlos Mendes",
      "motivo": "Recebimento de Pedido #12",
      "meta": {}
    }
  ],
  "totalElements": 50,
  "totalPages": 3
}
```

---

### 8.2. Registrar Movimentação de Entrada
**POST** `/estoques/{estoqueId}/movimentacoes/entrada`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 3500,
  "responsavel": "Carlos Mendes",
  "motivo": "Recebimento de Pedido #12",
  "meta": {
    "pedidoId": "12",
    "lote": "LOTE001"
  }
}
```

**Validações:**
- `produtoId` obrigatório
- `quantidade` obrigatório e > 0
- `responsavel` obrigatório
- `motivo` obrigatório

**Ações Automáticas:**
- Saldo físico é atualizado
- Saldo disponível é recalculado

**Response 201:** Movimentação registrada

---

### 8.3. Registrar Movimentação de Saída
**POST** `/estoques/{estoqueId}/movimentacoes/saida`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 850,
  "responsavel": "Ana Paula",
  "motivo": "Venda ao Cliente",
  "meta": {
    "vendaId": "V001"
  }
}
```

**Validações:**
- `produtoId` obrigatório
- `quantidade` obrigatório e > 0
- `responsavel` obrigatório
- `motivo` obrigatório
- Saldo disponível deve ser suficiente

**Ações Automáticas:**
- Saldo físico é atualizado
- Saldo disponível é recalculado

**Response 201:** Movimentação registrada

**Response 400:** Saldo insuficiente

---

### 8.4. Buscar Movimentação por ID
**GET** `/movimentacoes/{id}`

**Response 200:**
```json
{
  "id": 1,
  "tipo": "ENTRADA",
  "produtoId": "1",
  "quantidade": 3500,
  "dataHora": "2025-10-22T10:00:00",
  "responsavel": "Carlos Mendes",
  "motivo": "Recebimento de Pedido #12",
  "meta": {
    "pedidoId": "12",
    "lote": "LOTE001"
  }
}
```

---

## 9. Transferir Produtos entre Estoques

### 9.1. Listar Transferências
**GET** `/transferencias`

**Query Parameters:**
- `estoqueOrigemId` (opcional): Filtrar por estoque de origem
- `estoqueDestinoId` (opcional): Filtrar por estoque de destino
- `produtoId` (opcional): Filtrar por produto
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": 1,
      "produtoId": "1",
      "estoqueOrigemId": "1",
      "estoqueDestinoId": "2",
      "quantidade": 1800,
      "dataHora": "2025-10-22T10:00:00",
      "responsavel": "Roberto Alves",
      "motivo": "Transferência entre filiais"
    }
  ],
  "totalElements": 10,
  "totalPages": 1
}
```

---

### 9.2. Criar Transferência
**POST** `/transferencias`

**Request Body:**
```json
{
  "produtoId": "1",
  "estoqueOrigemId": "1",
  "estoqueDestinoId": "2",
  "quantidade": 1800,
  "responsavel": "Roberto Alves",
  "motivo": "Transferência entre filiais"
}
```

**Validações:**
- `produtoId` obrigatório
- `estoqueOrigemId` obrigatório
- `estoqueDestinoId` obrigatório
- `quantidade` obrigatório e > 0
- `responsavel` obrigatório
- `motivo` obrigatório
- Estoques devem pertencer ao mesmo cliente
- Estoque origem deve ter saldo disponível suficiente

**Ações Automáticas:**
- Movimentação de SAÍDA registrada no estoque origem
- Movimentação de ENTRADA registrada no estoque destino
- Saldos são atualizados em ambos os estoques

**Response 201:** Transferência criada

**Response 400:** Validação falhou (estoques diferentes, saldo insuficiente)

---

### 9.3. Buscar Transferência por ID
**GET** `/transferencias/{id}`

**Response 200:**
```json
{
  "id": 1,
  "produtoId": "1",
  "estoqueOrigemId": "1",
  "estoqueDestinoId": "2",
  "quantidade": 1800,
  "dataHora": "2025-10-22T10:00:00",
  "responsavel": "Roberto Alves",
  "motivo": "Transferência entre filiais"
}
```

---

## 10. Reservar Estoque para Pedidos Pendentes

### 10.1. Listar Reservas de um Estoque
**GET** `/estoques/{estoqueId}/reservas`

**Query Parameters:**
- `tipo` (opcional): Filtrar por tipo (RESERVA, LIBERACAO)
- `produtoId` (opcional): Filtrar por produto
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "produtoId": "1",
      "quantidade": 8500,
      "dataHora": "2025-10-17T10:00:00",
      "tipo": "RESERVA"
    },
    {
      "produtoId": "1",
      "quantidade": 8500,
      "dataHora": "2025-10-20T14:00:00",
      "tipo": "LIBERACAO"
    }
  ],
  "totalElements": 20,
  "totalPages": 2
}
```

---

### 10.2. Reservar Estoque
**POST** `/estoques/{estoqueId}/reservas`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 8500
}
```

**Validações:**
- `produtoId` obrigatório
- `quantidade` obrigatório e > 0
- Saldo disponível deve ser suficiente

**Ações Automáticas:**
- Saldo reservado é atualizado
- Saldo disponível é recalculado
- Registro de RESERVA é criado

**Response 201:** Reserva criada

**Response 400:** Saldo disponível insuficiente

---

### 10.3. Liberar Reserva
**POST** `/estoques/{estoqueId}/reservas/liberar`

**Request Body:**
```json
{
  "produtoId": "1",
  "quantidade": 8500
}
```

**Validações:**
- `produtoId` obrigatório
- `quantidade` obrigatório e > 0
- Deve haver reserva suficiente

**Ações Automáticas:**
- Saldo reservado é atualizado
- Saldo disponível é recalculado
- Registro de LIBERACAO é criado

**Response 201:** Reserva liberada

**Response 400:** Quantidade de reserva insuficiente

---

### 10.4. Obter Saldo de Produto
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/saldo`

**Response 200:**
```json
{
  "fisico": 5000,
  "reservado": 8500,
  "disponivel": -3500
}
```

---

### 10.5. Obter Saldo Físico
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/saldo-fisico`

**Response 200:**
```json
{
  "saldoFisico": 5000
}
```

---

### 10.6. Obter Saldo Reservado
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/saldo-reservado`

**Response 200:**
```json
{
  "saldoReservado": 8500
}
```

---

### 10.7. Obter Saldo Disponível
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/saldo-disponivel`

**Response 200:**
```json
{
  "saldoDisponivel": -3500
}
```

---

## 11. Gerenciar Clientes

### 11.1. Listar Clientes
**GET** `/clientes`

**Query Parameters:**
- `nome` (opcional): Buscar por nome
- `documento` (opcional): Buscar por documento
- `page` (opcional): Número da página
- `size` (opcional): Tamanho da página

**Response 200:**
```json
{
  "content": [
    {
      "id": "1",
      "nome": "Cliente ABC",
      "documento": "12.345.678/0001-90",
      "email": "contato@clienteabc.com.br",
      "estoques": []
    }
  ],
  "totalElements": 5,
  "totalPages": 1
}
```

---

### 11.2. Buscar Cliente por ID
**GET** `/clientes/{id}`

**Response 200:**
```json
{
  "id": "1",
  "nome": "Cliente ABC",
  "documento": "12.345.678/0001-90",
  "email": "contato@clienteabc.com.br",
  "estoques": [
    {
      "id": "1",
      "nome": "Estoque Central",
      "endereco": "Rua A, 100",
      "capacidade": 10000,
      "ativo": true
    }
  ]
}
```

---

### 11.3. Criar Cliente
**POST** `/clientes`

**Request Body:**
```json
{
  "nome": "Cliente ABC",
  "documento": "12.345.678/0001-90",
  "email": "contato@clienteabc.com.br"
}
```

**Validações:**
- `nome` obrigatório
- `documento` obrigatório e único
- `email` obrigatório e válido

**Response 201:** Cliente criado

---

### 11.4. Atualizar Cliente
**PUT** `/clientes/{id}`

**Request Body:**
```json
{
  "nome": "Cliente ABC Atualizado",
  "email": "novoemail@clienteabc.com.br"
}
```

**Response 200:** Cliente atualizado

---

## 12. Relatórios e Consultas

### 12.1. Verificar se Produto Atingiu ROP
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/atingiu-rop`

**Response 200:**
```json
{
  "atingiuROP": true,
  "saldoAtual": 500,
  "valorROP": 1350,
  "deficit": -850
}
```

---

### 12.2. Listar Produtos Abaixo do ROP
**GET** `/estoques/{estoqueId}/produtos/abaixo-rop`

**Response 200:**
```json
[
  {
    "produtoId": "1",
    "saldoAtual": 500,
    "valorROP": 1350,
    "deficit": -850
  }
]
```

---

### 12.3. Histórico de Consumo (Últimos 90 dias)
**GET** `/estoques/{estoqueId}/produtos/{produtoId}/historico-consumo`

**Response 200:**
```json
{
  "periodoDias": 90,
  "consumoTotal": 13545,
  "consumoMedioDiario": 150.5,
  "movimentacoes": [
    {
      "data": "2025-10-22",
      "tipo": "SAIDA",
      "quantidade": 350
    }
  ]
}
```

---

## 📝 Códigos de Status HTTP

- **200 OK:** Operação bem-sucedida
- **201 Created:** Recurso criado com sucesso
- **204 No Content:** Operação bem-sucedida sem conteúdo de retorno
- **400 Bad Request:** Erro de validação ou regra de negócio
- **401 Unauthorized:** Não autenticado
- **403 Forbidden:** Não autorizado
- **404 Not Found:** Recurso não encontrado
- **500 Internal Server Error:** Erro interno do servidor

---

## 🔄 Ações Automáticas do Sistema

### Ao Criar Pedido:
1. Valida cotação válida para cada produto
2. Cria reserva de estoque automaticamente
3. Status inicial: CRIADO

### Ao Confirmar Recebimento:
1. Status muda para RECEBIDO
2. Movimentação de ENTRADA é registrada
3. Reserva de estoque é liberada

### Ao Cancelar Pedido:
1. Status muda para CANCELADO
2. Reserva de estoque é liberada

### Ao Realizar Transferência:
1. Movimentação de SAÍDA no estoque origem
2. Movimentação de ENTRADA no estoque destino
3. Saldos atualizados em ambos

### Ao Alterar Lead Time do Fornecedor:
1. ROP de todos os produtos associados é recalculado

### Ao Produto Atingir ROP:
1. Alerta é gerado automaticamente
2. Fornecedor sugerido é calculado (melhor cotação)

### Ao Receber Pedido de Alerta:
1. Alerta é desativado automaticamente

---

## 📊 Resumo de Endpoints

| Método | Endpoint | Funcionalidade |
|--------|----------|----------------|
| GET | `/estoques` | Listar estoques |
| GET | `/estoques/{id}` | Buscar estoque |
| POST | `/estoques` | Criar estoque |
| PUT | `/estoques/{id}` | Atualizar estoque |
| PATCH | `/estoques/{id}/inativar` | Inativar estoque |
| DELETE | `/estoques/{id}` | Deletar estoque |
| GET | `/fornecedores` | Listar fornecedores |
| GET | `/fornecedores/{id}` | Buscar fornecedor |
| POST | `/fornecedores` | Criar fornecedor |
| PUT | `/fornecedores/{id}` | Atualizar fornecedor |
| PATCH | `/fornecedores/{id}/inativar` | Inativar fornecedor |
| POST | `/fornecedores/{id}/cotacoes` | Registrar cotação |
| GET | `/produtos` | Listar produtos |
| GET | `/produtos/{id}` | Buscar produto |
| POST | `/produtos` | Criar produto |
| PUT | `/produtos/{id}` | Atualizar produto |
| PATCH | `/produtos/{id}/inativar` | Inativar produto |
| GET | `/pedidos` | Listar pedidos |
| GET | `/pedidos/{id}` | Buscar pedido |
| POST | `/pedidos` | Criar pedido |
| PATCH | `/pedidos/{id}/enviar` | Enviar pedido |
| PATCH | `/pedidos/{id}/confirmar-recebimento` | Confirmar recebimento |
| PATCH | `/pedidos/{id}/cancelar` | Cancelar pedido |
| GET | `/alertas` | Listar alertas |
| POST | `/alertas/{id}/gerar-pedido` | Gerar pedido de alerta |
| GET | `/estoques/{id}/movimentacoes` | Listar movimentações |
| POST | `/estoques/{id}/movimentacoes/entrada` | Registrar entrada |
| POST | `/estoques/{id}/movimentacoes/saida` | Registrar saída |
| GET | `/transferencias` | Listar transferências |
| POST | `/transferencias` | Criar transferência |
| GET | `/estoques/{id}/reservas` | Listar reservas |
| POST | `/estoques/{id}/reservas` | Reservar estoque |
| POST | `/estoques/{id}/reservas/liberar` | Liberar reserva |

**Total:** 40+ endpoints principais

