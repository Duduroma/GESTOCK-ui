# Plano de Migração - Frontend para Backend

## 📋 Resumo Executivo

Este documento detalha todas as mudanças necessárias no frontend para alinhar com as entidades e estruturas do backend documentadas em `src/readmeApi.md`.

---

## 🎯 Estratégia de Migração

### 1. Criar Tipos Centralizados
✅ **Arquivo criado:** `src/types/entities.ts`
- Todas as interfaces alinhadas ao backend
- Enums para StatusPedido, TipoMovimentacao, TipoReservaRegistro
- Type aliases para IDs

### 2. Migração Gradual
- Manter compatibilidade durante a migração
- Atualizar views uma por uma
- Testar cada mudança antes de prosseguir

---

## 📝 Mudanças por Entidade

### 1. **Produto**

#### ❌ Interface Atual (Frontend)
```typescript
interface Produto {
    id: string;
    codigo: string;
    nome: string;
    descricao: string;  // ❌ Não existe no backend
    saldo: string;      // ❌ Não existe (é calculado via SaldoProduto)
    saldoUnidade: string; // ❌ Não existe
    estoque: string;    // ❌ Não existe (relação é via Estoque.saldos)
    status: 'active' | 'inactive';
    fornecedores: string[]; // ❌ Não existe (relação é via Cotacao)
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Produto {
    id: ProdutoId;
    codigo: string;
    nome: string;
    unidadePeso: string;  // ✅ Novo campo
    peso: number;         // ✅ Novo campo
    perecivel: boolean;   // ✅ Novo campo
    ativo: boolean;       // ✅ Mudar de status para ativo
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Produtos/Produtos.tsx`

1. **Importar tipos:**
```typescript
import { Produto, ProdutoId } from '../../types/entities';
```

2. **Remover campos:**
- `descricao` (não existe no backend)
- `saldo` (usar `SaldoProduto` via Estoque)
- `saldoUnidade` (usar `unidadePeso`)
- `estoque` (relação é via Estoque.saldos)
- `fornecedores` (relação é via Fornecedor.cotacoes)

3. **Adicionar campos:**
- `unidadePeso: string`
- `peso: number`
- `perecivel: boolean`
- `ativo: boolean` (substituir `status`)

4. **Ajustar exibição:**
- Remover coluna "Descrição"
- Remover coluna "Saldo" (será exibida via tela de Estoque)
- Remover coluna "Estoque" (será exibida via tela de Estoque)
- Remover coluna "Fornecedores" (será exibida via tela de Cotações)
- Adicionar coluna "Unidade Peso"
- Adicionar coluna "Peso"
- Adicionar coluna "Perecível" (badge sim/não)

5. **Ajustar modal:**
- `CadastrarProdutoModal` precisa incluir:
  - Campo `unidadePeso` (select: kg, g, L, mL, etc.)
  - Campo `peso` (number)
  - Campo `perecivel` (checkbox)
  - Remover `descricao`
  - Remover `saldo`
  - Remover `estoqueVinculado`

---

### 2. **Estoque**

#### ❌ Interface Atual (Frontend)
```typescript
interface Estoque {
    id: string;
    nome: string;
    endereco: string;
    capacidade: string;  // ❌ Deveria ser number
    status: 'active' | 'inactive';
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Estoque {
    id: EstoqueId;
    clienteId: ClienteId;  // ✅ Novo campo obrigatório
    nome: string;
    endereco: string;
    capacidade: number;    // ✅ Mudar de string para number
    ativo: boolean;        // ✅ Mudar de status para ativo
    saldos?: Record<ProdutoId, SaldoProduto>;  // ✅ Novo campo
    rops?: Record<ProdutoId, ROP>;             // ✅ Novo campo
    movimentacoes?: Movimentacao[];            // ✅ Novo campo
    reservas?: ReservaRegistro[];              // ✅ Novo campo
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Estoques/Estoques.tsx`

1. **Importar tipos:**
```typescript
import { Estoque, EstoqueId, ClienteId, SaldoProduto, ROP } from '../../types/entities';
```

2. **Adicionar campos:**
- `clienteId: ClienteId` (obrigatório)
- `capacidade: number` (mudar de string)
- `ativo: boolean` (substituir `status`)
- `saldos?: Record<ProdutoId, SaldoProduto>` (opcional)
- `rops?: Record<ProdutoId, ROP>` (opcional)
- `movimentacoes?: Movimentacao[]` (opcional)
- `reservas?: ReservaRegistro[]` (opcional)

3. **Ajustar exibição:**
- Adicionar coluna "Cliente" (buscar nome do cliente via clienteId)
- Mudar tipo da coluna "Capacidade" para number
- Mudar badge de `status` para `ativo`

4. **Ajustar modal:**
- `CadastrarEstoqueModal` precisa incluir:
  - Campo `clienteId` (select de clientes, obrigatório)
  - Campo `capacidade` (number, não string)
  - Campo `ativo` (checkbox, substituir status)

---

### 3. **Fornecedor**

#### ❌ Interface Atual (Frontend)
```typescript
interface Fornecedor {
    id: string;
    nome: string;
    contato: string;
    leadTime: string;  // ❌ Deveria ser LeadTime (number)
    produtosAssociados: number;  // ❌ Não existe (é calculado)
    status: 'active' | 'inactive';
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Fornecedor {
    id: FornecedorId;
    nome: string;
    cnpj: string;  // ✅ Novo campo obrigatório
    contato: string;
    leadTimeMedio: LeadTime;  // ✅ Mudar de string para LeadTime
    ativo: boolean;           // ✅ Mudar de status para ativo
    cotacoes?: Record<ProdutoId, Cotacao>;  // ✅ Novo campo
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Fornecedores/Fornecedores.tsx`

1. **Importar tipos:**
```typescript
import { Fornecedor, FornecedorId, LeadTime, Cotacao } from '../../types/entities';
```

2. **Adicionar campos:**
- `cnpj: string` (obrigatório)
- `leadTimeMedio: LeadTime` (mudar de string para objeto com `dias: number`)
- `ativo: boolean` (substituir `status`)
- `cotacoes?: Record<ProdutoId, Cotacao>` (opcional)

3. **Remover campos:**
- `produtosAssociados` (calcular via `cotacoes`)

4. **Ajustar exibição:**
- Adicionar coluna "CNPJ"
- Mudar coluna "Lead Time" para exibir `leadTimeMedio.dias` dias
- Mudar badge de `status` para `ativo`
- Remover coluna "Produtos Associados" (ou calcular dinamicamente)

5. **Ajustar modal:**
- `CadastrarFornecedorModal` precisa incluir:
  - Campo `cnpj` (text, obrigatório, com máscara)
  - Campo `leadTimeMedio` (number, em dias)
  - Campo `ativo` (checkbox, substituir status)

---

### 4. **Pedido**

#### ❌ Interface Atual (Frontend)
```typescript
interface Pedido {
    id: string;
    produto: string;  // ❌ Deveria ser ItemPedido[]
    fornecedor: string;  // ❌ Deveria ser FornecedorId
    quantidade: string;  // ❌ Deveria ser number em ItemPedido[]
    dataPrevista: string;
    status: 'pending' | 'received' | 'canceled';  // ❌ Deveria ser StatusPedido enum
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Pedido {
    id: PedidoId;
    clienteId: ClienteId;  // ✅ Novo campo obrigatório
    fornecedorId: FornecedorId;  // ✅ Mudar de string para FornecedorId
    dataCriacao: string;  // ✅ Novo campo obrigatório
    dataPrevistaEntrega: string;  // ✅ Renomear de dataPrevista
    estoqueId?: EstoqueId;  // ✅ Novo campo opcional
    itens: ItemPedido[];  // ✅ Mudar de produto único para lista
    custo?: CustoPedido;  // ✅ Novo campo opcional
    status: StatusPedido;  // ✅ Mudar para enum
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Pedidos/Pedidos.tsx`

1. **Importar tipos:**
```typescript
import { Pedido, PedidoId, StatusPedido, ItemPedido, CustoPedido, ClienteId, FornecedorId, EstoqueId } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `produto: string` → `itens: ItemPedido[]` (múltiplos itens)
- `fornecedor: string` → `fornecedorId: FornecedorId`
- `quantidade: string` → removido (está em `ItemPedido.quantidade`)
- `dataPrevista: string` → `dataPrevistaEntrega: string`
- `status: string` → `status: StatusPedido` (enum)

3. **Adicionar campos:**
- `clienteId: ClienteId` (obrigatório)
- `dataCriacao: string` (obrigatório)
- `estoqueId?: EstoqueId` (opcional)
- `custo?: CustoPedido` (opcional)

4. **Ajustar exibição:**
- Mudar coluna "Produto" para "Itens" (exibir lista de itens)
- Mudar coluna "Fornecedor" para buscar nome via `fornecedorId`
- Adicionar coluna "Cliente" (buscar nome via `clienteId`)
- Adicionar coluna "Data Criação"
- Adicionar coluna "Estoque" (se `estoqueId` existir)
- Adicionar coluna "Custo Total" (se `custo` existir)
- Mudar coluna "Status" para usar enum `StatusPedido`

5. **Ajustar modal:**
- `CriarPedidoModal` precisa ser completamente refatorado:
  - Campo `clienteId` (select, obrigatório)
  - Campo `fornecedorId` (select, obrigatório)
  - Campo `estoqueId` (select, opcional)
  - Lista de `ItemPedido[]` (permite adicionar múltiplos itens)
    - Para cada item: `produtoId`, `quantidade`, `precoUnitario`
  - Campo `dataPrevistaEntrega` (date)
  - Remover campos antigos: `produto`, `quantidade`, `leadTime`

6. **Ajustar ações:**
- `handleConfirmRecebimento` → mudar status para `StatusPedido.RECEBIDO`
- `handleCancelar` → mudar status para `StatusPedido.CANCELADO`
- Adicionar ações para outros status: `ENVIADO`, `EM_TRANSPORTE`, `CONCLUIDO`

---

### 5. **Alerta**

#### ❌ Interface Atual (Frontend)
```typescript
interface Alerta {
    id: string;
    severidade: 'critical' | 'medium' | 'high';  // ❌ Não existe no backend
    produto: string;  // ❌ Deveria ser ProdutoId
    estoque: string;  // ❌ Deveria ser EstoqueId
    quantidadeAtual: number;  // ❌ Não existe (é calculado)
    rop: number;  // ❌ Não existe (é calculado)
    deficit: number;  // ❌ Não existe (é calculado)
    fornecedorSugerido: string;  // ❌ Deveria ser FornecedorId
    dataAlerta: string;  // ❌ Deveria ser dataGeracao
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Alerta {
    id: AlertaId;
    produtoId: ProdutoId;  // ✅ Mudar de produto para produtoId
    estoqueId: EstoqueId;  // ✅ Mudar de estoque para estoqueId
    dataGeracao: string;   // ✅ Renomear de dataAlerta
    fornecedorSugerido?: FornecedorId;  // ✅ Mudar de string para FornecedorId (opcional)
    ativo: boolean;        // ✅ Novo campo
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Alertas/Alertas.tsx`

1. **Importar tipos:**
```typescript
import { Alerta, AlertaId, ProdutoId, EstoqueId, FornecedorId } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `produto: string` → `produtoId: ProdutoId`
- `estoque: string` → `estoqueId: EstoqueId`
- `fornecedorSugerido: string` → `fornecedorSugerido?: FornecedorId`
- `dataAlerta: string` → `dataGeracao: string`

3. **Remover campos (são calculados):**
- `severidade` (calcular baseado em quantidadeAtual vs ROP)
- `quantidadeAtual` (buscar via Estoque.saldos[produtoId])
- `rop` (buscar via Estoque.rops[produtoId])
- `deficit` (calcular: quantidadeAtual - rop)

4. **Adicionar campos:**
- `ativo: boolean`

5. **Ajustar exibição:**
- Coluna "Severidade": calcular baseado em `quantidadeAtual` vs `rop`
  - Crítico: quantidadeAtual <= 0
  - Alto: quantidadeAtual < rop * 0.5
  - Médio: quantidadeAtual < rop
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Estoque": buscar nome via `estoqueId`
- Coluna "Quantidade Atual": buscar via `Estoque.saldos[produtoId].fisico`
- Coluna "ROP": buscar via `Estoque.rops[produtoId].valorROP`
- Coluna "Déficit": calcular `quantidadeAtual - rop`
- Coluna "Fornecedor Sugerido": buscar nome via `fornecedorSugerido` (se existir)
- Coluna "Data do Alerta": usar `dataGeracao`
- Filtrar apenas alertas com `ativo: true`

6. **Ajustar ações:**
- `handleGerarPedido`: precisa passar `produtoId`, `estoqueId`, `fornecedorSugerido`

---

### 6. **Cotacao**

#### ❌ Interface Atual (Frontend)
```typescript
interface Cotacao {
    id: string;
    produto: string;  // ❌ Deveria ser ProdutoId
    fornecedor: string;  // ❌ Não existe (é via Fornecedor.cotacoes)
    preco: string;  // ❌ Deveria ser number
    leadTime: string;  // ❌ Deveria ser prazoDias (number)
    validade: string;  // ❌ Deveria ser validadeAtiva (boolean) + data calculada
    status: 'pending' | 'approved' | 'expired';  // ❌ Não existe no backend
    isMostAdvantageous?: boolean;  // ❌ Não existe (é calculado)
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Cotacao {
    id: CotacaoId;
    produtoId: ProdutoId;  // ✅ Mudar de produto para produtoId
    preco: number;          // ✅ Mudar de string para number
    prazoDias: number;      // ✅ Mudar de leadTime string para prazoDias number
    validadeAtiva: boolean; // ✅ Mudar de validade string para validadeAtiva boolean
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Cotacoes/Cotacoes.tsx`

1. **Importar tipos:**
```typescript
import { Cotacao, CotacaoId, ProdutoId, Fornecedor } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `produto: string` → `produtoId: ProdutoId`
- `fornecedor: string` → remover (buscar via `Fornecedor.cotacoes`)
- `preco: string` → `preco: number`
- `leadTime: string` → `prazoDias: number`
- `validade: string` → `validadeAtiva: boolean` (calcular data de validade baseado em prazo)
- `status: string` → remover (não existe no backend)
- `isMostAdvantageous?: boolean` → remover (calcular dinamicamente)

3. **Ajustar exibição:**
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Fornecedor": buscar via `Fornecedor.cotacoes[produtoId]` (precisa iterar fornecedores)
- Coluna "Preço": formatar `preco` como moeda (R$)
- Coluna "Lead Time": exibir `prazoDias` dias
- Coluna "Validade": calcular e exibir data baseado em `validadeAtiva` e `prazoDias`
- Coluna "Status": remover (não existe no backend)
- Badge "Mais Vantajosa": calcular dinamicamente comparando preços de todas as cotações do mesmo produto

4. **Ajustar ações:**
- `handleApprove`: remover (não existe no backend)
- Botão "Aprovar Cotação": remover ou mudar para "Usar Cotação" (criar pedido)

5. **Lógica de busca:**
- Cotações são acessadas via `Fornecedor.cotacoes[produtoId]`
- Para listar todas as cotações de um produto, iterar todos os fornecedores e buscar `cotacoes[produtoId]`

---

### 7. **Movimentacao**

#### ❌ Interface Atual (Frontend)
```typescript
interface Movimentacao {
    id: string;
    data: string;
    produto: string;  // ❌ Deveria ser ProdutoId
    tipo: 'entrada' | 'saida';  // ❌ Deveria ser TipoMovimentacao enum
    quantidade: string;  // ❌ Deveria ser number
    motivo: string;
    responsavel: string;
    estoque: string;  // ❌ Não existe (é via Estoque.movimentacoes)
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Movimentacao {
    id: number;  // ✅ Mudar de string para number
    tipo: TipoMovimentacao;  // ✅ Mudar para enum
    produtoId: ProdutoId;  // ✅ Mudar de produto para produtoId
    quantidade: number;  // ✅ Mudar de string para number
    dataHora: string;  // ✅ Renomear de data para dataHora
    responsavel: string;
    motivo: string;
    meta?: Record<string, string>;  // ✅ Novo campo opcional
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Movimentacoes/Movimentacoes.tsx`

1. **Importar tipos:**
```typescript
import { Movimentacao, TipoMovimentacao, ProdutoId } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `id: string` → `id: number`
- `produto: string` → `produtoId: ProdutoId`
- `tipo: string` → `tipo: TipoMovimentacao` (enum)
- `quantidade: string` → `quantidade: number`
- `data: string` → `dataHora: string`
- `estoque: string` → remover (buscar via `Estoque.movimentacoes`)

3. **Adicionar campos:**
- `meta?: Record<string, string>` (opcional)

4. **Ajustar exibição:**
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Tipo": usar enum `TipoMovimentacao.ENTRADA` ou `TipoMovimentacao.SAIDA`
- Coluna "Quantidade": exibir como number
- Coluna "Data": usar `dataHora`
- Coluna "Estoque": remover (ou buscar via contexto de qual estoque está sendo visualizado)

5. **Ajustar modal:**
- `RegistrarMovimentacaoModal` precisa ajustar:
  - Campo `produtoId` (select, obrigatório)
  - Campo `tipo` (select: ENTRADA ou SAIDA, usar enum)
  - Campo `quantidade` (number, não string)
  - Campo `dataHora` (datetime, não apenas date)
  - Campo `meta` (opcional, objeto chave-valor)
  - Remover campo `estoque` (será definido pelo contexto)

---

### 8. **ReservaRegistro (Reserva no Frontend)**

#### ❌ Interface Atual (Frontend)
```typescript
interface Reserva {
    id: string;
    produto: string;  // ❌ Deveria ser ProdutoId
    pedido: string;  // ❌ Não existe (é calculado via Pedido)
    quantidadeReservada: string;  // ❌ Deveria ser quantidade (number)
    dataReserva: string;  // ❌ Deveria ser dataHora
    status: 'active' | 'released' | 'canceled';  // ❌ Deveria ser tipo (RESERVA ou LIBERACAO)
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface ReservaRegistro {
    produtoId: ProdutoId;  // ✅ Mudar de produto para produtoId
    quantidade: number;   // ✅ Mudar de quantidadeReservada string para quantidade number
    dataHora: string;     // ✅ Renomear de dataReserva para dataHora
    tipo: TipoReservaRegistro;  // ✅ Mudar de status para tipo (enum)
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Reservas/Reservas.tsx`

1. **Importar tipos:**
```typescript
import { ReservaRegistro, TipoReservaRegistro, ProdutoId } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `id: string` → remover (não existe no backend)
- `produto: string` → `produtoId: ProdutoId`
- `pedido: string` → remover (buscar via `Pedido` que gerou a reserva)
- `quantidadeReservada: string` → `quantidade: number`
- `dataReserva: string` → `dataHora: string`
- `status: string` → `tipo: TipoReservaRegistro` (enum: RESERVA ou LIBERACAO)

3. **Ajustar exibição:**
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Pedido": buscar via `Pedido` que contém reserva para este `produtoId`
- Coluna "Quantidade Reservada": exibir `quantidade` como number
- Coluna "Data da Reserva": usar `dataHora`
- Coluna "Status": usar `tipo` (RESERVA = Ativa, LIBERACAO = Liberada)
- Filtrar por `tipo === TipoReservaRegistro.RESERVA` para "Ativas"
- Filtrar por `tipo === TipoReservaRegistro.LIBERACAO` para "Liberadas"

4. **Ajustar ações:**
- `handleLiberarReserva`: criar novo `ReservaRegistro` com `tipo: TipoReservaRegistro.LIBERACAO`

---

### 9. **Transferencia**

#### ❌ Interface Atual (Frontend)
```typescript
interface Transferencia {
    id: string;
    data: string;
    produto: string;  // ❌ Deveria ser ProdutoId
    quantidade: string;  // ❌ Deveria ser number
    origem: string;  // ❌ Deveria ser EstoqueId
    destino: string;  // ❌ Deveria ser EstoqueId
    responsavel: string;
    status: 'completed' | 'processing';  // ❌ Não existe no backend
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface Transferencia {
    id: number;  // ✅ Mudar de string para number
    produtoId: ProdutoId;  // ✅ Mudar de produto para produtoId
    estoqueOrigemId: EstoqueId;  // ✅ Mudar de origem para estoqueOrigemId
    estoqueDestinoId: EstoqueId;  // ✅ Mudar de destino para estoqueDestinoId
    quantidade: number;  // ✅ Mudar de string para number
    dataHora: string;  // ✅ Renomear de data para dataHora
    responsavel: string;
    motivo: string;  // ✅ Novo campo obrigatório
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/Transferencias/Transferencias.tsx`

1. **Importar tipos:**
```typescript
import { Transferencia, ProdutoId, EstoqueId } from '../../types/entities';
```

2. **Mudanças estruturais:**
- `id: string` → `id: number`
- `produto: string` → `produtoId: ProdutoId`
- `origem: string` → `estoqueOrigemId: EstoqueId`
- `destino: string` → `estoqueDestinoId: EstoqueId`
- `quantidade: string` → `quantidade: number`
- `data: string` → `dataHora: string`
- `status: string` → remover (não existe no backend)

3. **Adicionar campos:**
- `motivo: string` (obrigatório)

4. **Ajustar exibição:**
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Quantidade": exibir como number
- Coluna "Origem": buscar nome via `estoqueOrigemId`
- Coluna "Destino": buscar nome via `estoqueDestinoId`
- Coluna "Data": usar `dataHora`
- Coluna "Status": remover (não existe no backend)
- Adicionar coluna "Motivo"

5. **Ajustar modal:**
- `NovaTransferenciaModal` precisa ajustar:
  - Campo `produtoId` (select, obrigatório)
  - Campo `estoqueOrigemId` (select, obrigatório)
  - Campo `estoqueDestinoId` (select, obrigatório)
  - Campo `quantidade` (number, não string)
  - Campo `responsavel` (text, obrigatório)
  - Campo `motivo` (textarea, obrigatório) - ✅ Novo campo
  - Remover campo `status`

---

### 10. **PontoRessuprimento (ROP no Backend)**

#### ❌ Interface Atual (Frontend)
```typescript
interface PontoRessuprimento {
    id: string;
    produto: string;  // ❌ Deveria ser ProdutoId
    consumoMedioDiario: string;  // ❌ Deveria ser consumoMedio (number)
    consumoMedioDiarioNumero: string;  // ❌ Não existe
    leadTime: string;  // ❌ Deveria ser leadTimeDias (number)
    estoqueSeguranca: string;  // ❌ Deveria ser number
    ropCalculado: string;  // ❌ Deveria ser valorROP (number)
    ropCalculadoFormula: string;  // ❌ Não existe (é calculado)
    saldoAtual: string;  // ❌ Não existe (é via Estoque.saldos)
    status: 'adequate' | 'below';  // ❌ Não existe (é calculado)
    consumoUltimos90Dias: string[];  // ❌ Não existe (é calculado)
}
```

#### ✅ Interface Correta (Backend)
```typescript
interface ROP {
    consumoMedio: number;  // ✅ Mudar de consumoMedioDiario string para consumoMedio number
    leadTimeDias: number;  // ✅ Mudar de leadTime string para leadTimeDias number
    estoqueSeguranca: number;  // ✅ Mudar de string para number
    valorROP: number;  // ✅ Mudar de ropCalculado string para valorROP number (calculado)
}
```

#### 🔧 Mudanças Necessárias

**Arquivo:** `src/views/PontoRessuprimento/PontoRessuprimento.tsx`

1. **Importar tipos:**
```typescript
import { ROP, ProdutoId, EstoqueId, Estoque } from '../../types/entities';
```

2. **Mudanças estruturais:**
- ROP não tem `id` próprio, está em `Estoque.rops[produtoId]`
- `produto: string` → buscar via chave do map `Estoque.rops`
- `consumoMedioDiario: string` → `consumoMedio: number`
- `leadTime: string` → `leadTimeDias: number`
- `estoqueSeguranca: string` → `estoqueSeguranca: number`
- `ropCalculado: string` → `valorROP: number`
- Remover `ropCalculadoFormula` (calcular dinamicamente)
- Remover `saldoAtual` (buscar via `Estoque.saldos[produtoId].fisico`)
- Remover `status` (calcular: `saldoAtual < valorROP`)
- Remover `consumoUltimos90Dias` (buscar via histórico de movimentações)

3. **Ajustar lógica:**
- Para cada `Estoque`, iterar `rops` (Record<ProdutoId, ROP>)
- Para cada ROP, buscar:
  - Produto via `produtoId`
  - Saldo atual via `Estoque.saldos[produtoId]`
  - Histórico via `Estoque.movimentacoes` (filtrar por `produtoId` e últimos 90 dias)

4. **Ajustar exibição:**
- Coluna "Produto": buscar nome via `produtoId`
- Coluna "Consumo Médio Diário": exibir `consumoMedio` unidades/dia
- Coluna "Lead Time": exibir `leadTimeDias` dias
- Coluna "Estoque de Segurança": exibir `estoqueSeguranca`
- Coluna "ROP Calculado": exibir `valorROP` (com fórmula calculada dinamicamente)
- Coluna "Saldo Atual": buscar via `Estoque.saldos[produtoId].fisico`
- Coluna "Status": calcular `saldoAtual < valorROP ? 'Abaixo do ROP' : 'Adequado'`
- Histórico de consumo: calcular via `Estoque.movimentacoes` (últimos 90 dias)

---

## 🔄 Mudanças em Componentes

### 1. **Modals**

#### `CadastrarProdutoModal`
- ✅ Adicionar: `unidadePeso`, `peso`, `perecivel`
- ❌ Remover: `descricao`, `saldo`, `estoqueVinculado`

#### `CadastrarEstoqueModal`
- ✅ Adicionar: `clienteId` (select obrigatório)
- ✅ Mudar: `capacidade` de string para number
- ✅ Mudar: `status` para `ativo` (checkbox)

#### `CadastrarFornecedorModal`
- ✅ Adicionar: `cnpj` (text com máscara)
- ✅ Mudar: `leadTime` de string para number (dias)
- ✅ Mudar: `status` para `ativo` (checkbox)

#### `CriarPedidoModal`
- 🔄 **Refatoração completa:**
  - ✅ Adicionar: `clienteId` (select)
  - ✅ Adicionar: `fornecedorId` (select)
  - ✅ Adicionar: `estoqueId` (select, opcional)
  - ✅ Adicionar: Lista de `ItemPedido[]` (permite adicionar múltiplos)
    - Para cada item: `produtoId`, `quantidade`, `precoUnitario`
  - ✅ Adicionar: `dataPrevistaEntrega` (date)
  - ❌ Remover: `produto`, `quantidade`, `leadTime`

#### `RegistrarMovimentacaoModal`
- ✅ Mudar: `produto` para `produtoId`
- ✅ Mudar: `tipo` para usar enum `TipoMovimentacao`
- ✅ Mudar: `quantidade` de string para number
- ✅ Mudar: `data` para `dataHora` (datetime)
- ✅ Adicionar: `meta` (opcional, objeto chave-valor)
- ❌ Remover: `estoque` (será definido pelo contexto)

#### `NovaTransferenciaModal`
- ✅ Mudar: `produto` para `produtoId`
- ✅ Mudar: `estoqueOrigem` para `estoqueOrigemId`
- ✅ Mudar: `estoqueDestino` para `estoqueDestinoId`
- ✅ Mudar: `quantidade` de string para number
- ✅ Adicionar: `motivo` (textarea obrigatório)

---

## 📦 Novos Arquivos Necessários

### 1. **Tipos Centralizados**
✅ `src/types/entities.ts` - Criado

### 2. **Utilitários**
- `src/utils/dateFormatters.ts` - Formatadores de data
- `src/utils/currencyFormatters.ts` - Formatadores de moeda
- `src/utils/calculators.ts` - Funções de cálculo (ROP, saldo, etc.)

### 3. **Hooks**
- `src/hooks/useCliente.ts` - Buscar cliente por ID
- `src/hooks/useProduto.ts` - Buscar produto por ID
- `src/hooks/useEstoque.ts` - Buscar estoque por ID
- `src/hooks/useFornecedor.ts` - Buscar fornecedor por ID

---

## 🚀 Ordem de Implementação Recomendada

1. ✅ **Criar tipos centralizados** (`src/types/entities.ts`)
2. **Atualizar Produto** (mais simples, menos dependências)
3. **Atualizar Fornecedor** (depende de Produto para cotações)
4. **Atualizar Estoque** (depende de Cliente, Produto, ROP)
5. **Atualizar Movimentacao** (depende de Estoque, Produto)
6. **Atualizar ReservaRegistro** (depende de Estoque, Produto, Pedido)
7. **Atualizar Transferencia** (depende de Estoque, Produto)
8. **Atualizar PontoRessuprimento** (depende de Estoque, ROP)
9. **Atualizar Cotacao** (depende de Fornecedor, Produto)
10. **Atualizar Pedido** (depende de Cliente, Fornecedor, Estoque, ItemPedido)
11. **Atualizar Alerta** (depende de Produto, Estoque, Fornecedor, ROP)

---

## ⚠️ Pontos de Atenção

1. **IDs como strings:** Manter IDs como strings no frontend (mesmo que sejam Long no backend) para facilitar integração com APIs REST
2. **Datas:** Backend usa `LocalDate` e `LocalDateTime`, frontend deve usar strings ISO 8601
3. **Números:** Backend usa `BigDecimal` para preços, frontend pode usar `number` (perda de precisão em valores muito grandes)
4. **Relacionamentos:** Muitas relações são via Maps/Records, não arrays diretos
5. **Campos calculados:** Vários campos no frontend são calculados (severidade, status, etc.), não vêm do backend
6. **Enums:** Usar enums TypeScript para StatusPedido, TipoMovimentacao, TipoReservaRegistro

---

## 📝 Checklist de Migração

- [ ] Criar `src/types/entities.ts` ✅
- [ ] Atualizar `src/views/Produtos/Produtos.tsx`
- [ ] Atualizar `src/components/Modals/CadastrarProdutoModal.tsx`
- [ ] Atualizar `src/views/Fornecedores/Fornecedores.tsx`
- [ ] Atualizar `src/components/Modals/CadastrarFornecedorModal.tsx`
- [ ] Atualizar `src/views/Estoques/Estoques.tsx`
- [ ] Atualizar `src/components/Modals/CadastrarEstoqueModal.tsx`
- [ ] Atualizar `src/views/Movimentacoes/Movimentacoes.tsx`
- [ ] Atualizar `src/components/Modals/RegistrarMovimentacaoModal.tsx`
- [ ] Atualizar `src/views/Reservas/Reservas.tsx`
- [ ] Atualizar `src/views/Transferencias/Transferencias.tsx`
- [ ] Atualizar `src/components/Modals/NovaTransferenciaModal.tsx`
- [ ] Atualizar `src/views/PontoRessuprimento/PontoRessuprimento.tsx`
- [ ] Atualizar `src/views/Cotacoes/Cotacoes.tsx`
- [ ] Atualizar `src/views/Pedidos/Pedidos.tsx`
- [ ] Atualizar `src/components/Modals/CriarPedidoModal.tsx`
- [ ] Atualizar `src/views/Alertas/Alertas.tsx`
- [ ] Criar utilitários (dateFormatters, currencyFormatters, calculators)
- [ ] Criar hooks (useCliente, useProduto, useEstoque, useFornecedor)
- [ ] Testar todas as views após migração

---

## 🎯 Próximos Passos

1. Revisar este documento com a equipe
2. Priorizar quais entidades migrar primeiro
3. Criar branch de migração
4. Implementar mudanças gradualmente
5. Testar cada mudança antes de prosseguir
6. Atualizar documentação conforme necessário

