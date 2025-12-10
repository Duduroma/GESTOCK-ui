# Análise de Entidades - Frontend vs Backend

## 📊 Resumo Comparativo

### ✅ Entidades Documentadas e Usadas no Frontend

| Entidade Backend | Interface Frontend | Status |
|-----------------|-------------------|--------|
| **Produto** | `Produto` | ✅ Documentado e usado |
| **Estoque** | `Estoque` | ✅ Documentado e usado |
| **Fornecedor** | `Fornecedor` | ✅ Documentado e usado |
| **Pedido** | `Pedido` | ✅ Documentado e usado |
| **Alerta** | `Alerta` | ✅ Documentado e usado |
| **Cotacao** | `Cotacao` | ✅ Documentado e usado |
| **Movimentacao** | `Movimentacao` | ✅ Documentado e usado |
| **Transferencia** | `Transferencia` | ✅ Documentado e usado |
| **ReservaRegistro** | `Reserva` | ✅ Documentado (nome diferente no frontend) |
| **ROP** | `PontoRessuprimento` | ✅ Documentado (nome diferente no frontend) |

---

## ⚠️ Entidades Documentadas no Backend MAS NÃO Usadas no Frontend

### 1. **Cliente**
**Status:** Documentado no backend, mas **NÃO** há interface ou uso no frontend.

**Documentação Backend:**
- `ClienteId id`
- `String nome`
- `String documento` (CPF/CNPJ)
- `String email`
- `List<Estoque> estoques`

**Observação:** O frontend trabalha diretamente com `Estoque`, mas não há tela ou interface para `Cliente`. Isso pode indicar que:
- O cliente é gerenciado em outro sistema
- O frontend ainda não implementou a gestão de clientes
- A relação Cliente-Estoque é implícita

**Recomendação:** Verificar se `Cliente` precisa ser documentado para uso futuro ou se é apenas uma entidade interna do backend.

---

### 2. **ItemPedido**
**Status:** Documentado no backend, mas **NÃO** há interface específica no frontend.

**Documentação Backend:**
- `ProdutoId produtoId`
- `int quantidade`
- `BigDecimal precoUnitario`
- Métodos: `getSubtotal()`, `calcularPesoTotal()`

**Uso no Frontend:**
- O modal `CriarPedidoModal` tem campos para produto, quantidade, mas não há interface `ItemPedido` separada
- A interface `Pedido` no frontend tem apenas `produto: string` e `quantidade: string` (não é uma lista de itens)

**Observação:** O backend suporta múltiplos itens por pedido (`List<ItemPedido>`), mas o frontend parece tratar apenas um produto por pedido.

**Recomendação:** 
- Se o frontend vai suportar múltiplos itens por pedido, criar interface `ItemPedido`
- Se não, documentar que o frontend atualmente suporta apenas 1 item por pedido

---

### 3. **SaldoProduto**
**Status:** Documentado no backend, mas **NÃO** há interface específica no frontend.

**Documentação Backend:**
- `int fisico`
- `int reservado`
- Método calculado: `disponivel()` → `fisico - reservado`

**Uso no Frontend:**
- A interface `Produto` tem `saldo: string` (apenas um valor)
- Não há separação entre saldo físico, reservado e disponível

**Observação:** O frontend mostra apenas um saldo total, enquanto o backend tem saldo físico e reservado separados.

**Recomendação:** 
- Se o frontend precisar mostrar saldo físico vs reservado, criar interface `SaldoProduto`
- Se não, documentar que o frontend atualmente mostra apenas saldo total

---

### 4. **LeadTime**
**Status:** Documentado no backend como Value Object, mas usado como `string` no frontend.

**Documentação Backend:**
- `int dias` (final, imutável)

**Uso no Frontend:**
- `Fornecedor.leadTime: string` (ex: "7 dias")
- `CriarPedidoModal` tem campo `leadTime: string`

**Observação:** O frontend trata `LeadTime` como string, enquanto o backend tem um Value Object.

**Recomendação:** Documentar que o frontend atualmente trata `LeadTime` como string formatada, mas o backend espera um número de dias.

---

### 5. **CustoPedido**
**Status:** Documentado no backend, mas **NÃO** há interface específica no frontend.

**Documentação Backend:**
- `BigDecimal valorItens`
- `BigDecimal frete`
- `BigDecimal custosLogisticos`
- Método: `getValorTotal()`

**Uso no Frontend:**
- A interface `Pedido` não tem campos de custo
- Não há exibição de custos no frontend

**Observação:** O backend calcula e armazena custos detalhados, mas o frontend não exibe.

**Recomendação:** 
- Se o frontend vai exibir custos, criar interface `CustoPedido`
- Se não, documentar que custos são calculados apenas no backend

---

### 6. **LoteValidade**
**Status:** Documentado no backend, mas **NÃO** há interface ou uso no frontend.

**Documentação Backend:**
- `String lote`
- `LocalDate validade`
- Método: `validadeProxima()` → retorna `true` se vence em até 7 dias

**Uso no Frontend:**
- Não há campos de lote ou validade em nenhuma interface
- Não há funcionalidade de gestão de lotes/validade

**Observação:** O backend suporta controle de lotes e validade, mas o frontend não implementa essa funcionalidade.

**Recomendação:** 
- Se o frontend vai implementar gestão de lotes, criar interface `LoteValidade`
- Se não, documentar que é uma funcionalidade apenas do backend

---

### 7. **CodigoProduto**
**Status:** Documentado no backend como Value Object, mas usado como `string` no frontend.

**Documentação Backend:**
- `String valor` (armazenado em maiúsculas e trimado)

**Uso no Frontend:**
- `Produto.codigo: string` (tratado como string simples)

**Observação:** O frontend trata código como string simples, enquanto o backend tem um Value Object com validação/formatação.

**Recomendação:** Documentar que o frontend atualmente trata código como string, mas o backend valida e formata automaticamente.

---

## 🔍 Diferenças de Nomenclatura

### 1. **ReservaRegistro** (Backend) vs **Reserva** (Frontend)
- **Backend:** `ReservaRegistro` com `Tipo` enum (RESERVA ou LIBERACAO)
- **Frontend:** `Reserva` com `status: 'active' | 'released' | 'canceled'`

**Observação:** O frontend usa um modelo mais simples com status, enquanto o backend usa registros de reserva/liberação.

---

### 2. **ROP** (Backend) vs **PontoRessuprimento** (Frontend)
- **Backend:** `ROP` (Reorder Point) - Value Object simples
- **Frontend:** `PontoRessuprimento` - Interface mais completa com histórico

**Campos Backend:**
- `double consumoMedio`
- `int leadTimeDias`
- `int estoqueSeguranca`
- `int valorROP` (calculado)

**Campos Frontend:**
- `consumoMedioDiario: string`
- `consumoMedioDiarioNumero: string`
- `leadTime: string`
- `estoqueSeguranca: string`
- `ropCalculado: string`
- `ropCalculadoFormula: string`
- `saldoAtual: string`
- `status: 'adequate' | 'below'`
- `consumoUltimos90Dias: string[]`

**Observação:** O frontend tem uma interface muito mais rica para exibição, incluindo histórico e status visual.

---

## 📋 Campos Adicionais no Frontend (Não Documentados no Backend)

### 1. **Produto**
- `descricao: string` - Não documentado no backend
- `saldoUnidade: string` - Não documentado no backend
- `fornecedores: string[]` - Não documentado (pode ser relação implícita)

### 2. **Fornecedor**
- `produtosAssociados: number` - Não documentado (pode ser calculado)

### 3. **Estoque**
- `capacidade: string` - Documentado como `int capacidade` no backend

### 4. **Pedido**
- `produto: string` - Backend tem `List<ItemPedido>`, frontend tem apenas 1 produto
- `fornecedor: string` - Documentado como `FornecedorId` no backend

### 5. **Alerta**
- `severidade: 'critical' | 'medium' | 'high'` - Não documentado no backend
- `quantidadeAtual: number` - Não documentado explicitamente
- `deficit: number` - Não documentado explicitamente
- `dataAlerta: string` - Documentado como `LocalDateTime dataGeracao` no backend

### 6. **Cotacao**
- `isMostAdvantageous?: boolean` - Não documentado no backend (campo calculado/derivado)

### 7. **Transferencia**
- `status: 'completed' | 'processing'` - Não documentado no backend

---

## 🎯 Recomendações Finais

### Prioridade Alta
1. **Cliente:** Verificar se precisa ser implementado no frontend ou se é apenas backend
2. **ItemPedido:** Decidir se o frontend vai suportar múltiplos itens por pedido
3. **SaldoProduto:** Decidir se o frontend precisa mostrar saldo físico vs reservado

### Prioridade Média
4. **CustoPedido:** Decidir se o frontend vai exibir custos detalhados
5. **LoteValidade:** Decidir se o frontend vai implementar gestão de lotes

### Prioridade Baixa
6. **LeadTime:** Documentar que é tratado como string no frontend
7. **CodigoProduto:** Documentar que é tratado como string no frontend

---

## 📝 Campos que Precisam ser Documentados no Backend

Se o backend realmente suporta esses campos, eles devem ser adicionados à documentação:

1. **Alerta.severidade** - Enum ou campo de severidade
2. **Alerta.quantidadeAtual** - Campo calculado ou armazenado
3. **Alerta.deficit** - Campo calculado ou armazenado
4. **Produto.descricao** - Campo de descrição do produto
5. **Transferencia.status** - Status da transferência (se existir)

---

## ✅ Conclusão

**Total de Entidades Backend:** 33 classes/records/enums
**Total de Entidades Usadas no Frontend:** 10 interfaces principais
**Entidades Não Usadas no Frontend:** 7 (Cliente, ItemPedido, SaldoProduto, LeadTime, CustoPedido, LoteValidade, CodigoProduto)

**Observação:** Algumas entidades não usadas são Value Objects que são tratados como tipos primitivos no frontend (LeadTime, CodigoProduto), o que é aceitável. Outras podem precisar ser implementadas no futuro (Cliente, ItemPedido, SaldoProduto, CustoPedido, LoteValidade).

