# Guia de Testes - Sistema GESTOCK

Este documento descreve todas as funcionalidades disponíveis em cada página do sistema para facilitar os testes.

---

## 🔐 Página de Login (`/login`)

### Funcionalidades:
1. **Formulário de Login**
   - Campo de E-mail (obrigatório, validação de formato)
   - Campo de Senha (obrigatório)
   - Botão "Entrar"

2. **Navegação**
   - Ao clicar em "Entrar" → Redireciona para `/estoques` (home)
   - Link "Cadastre-se" → Redireciona para `/cadastro`

### Como Testar:
- Preencha os campos e clique em "Entrar"
- Verifique se é redirecionado para a página de Estoques
- Teste o link de cadastro

---

## 📦 Página de Estoques (`/estoques`)

### Funcionalidades:
1. **Listagem de Estoques**
   - Tabela com: Nome, Endereço, Capacidade, Status, Ações
   - Exibe 4 estoques de exemplo

2. **Filtros e Busca**
   - Campo de busca por nome ou endereço
   - Filtro por Cliente (dropdown)
   - Filtro por Status (Ativo/Inativo)

3. **Ações por Estoque**
   - **"Visualizar Produtos"** → Navega para `/produtos`
   - **"Editar"** (✏️) → Abre modal de edição com dados preenchidos
   - **"Deletar"** (🗑️) → Remove estoque da lista (console.log)

4. **Cadastro de Novo Estoque**
   - Botão "Cadastrar Estoque" abre modal
   - Campos: Cliente, Nome, Endereço, Capacidade, Status (Ativo/Inativo)
   - Validação de campos obrigatórios

### Como Testar:
- Teste os filtros de busca, cliente e status
- Clique em "Visualizar Produtos" e verifique navegação
- Clique em "Editar" e modifique os dados
- Clique em "Deletar" e confirme remoção
- Cadastre um novo estoque

---

## 🛒 Página de Produtos (`/produtos`)

### Funcionalidades:
1. **Listagem de Produtos**
   - Tabela com: Código, Nome, Unidade Peso, Peso, Perecível, Status, Ações
   - Exibe 7 produtos de exemplo

2. **Ações por Produto**
   - **"Ver Cotações"** → Navega para `/cotacoes`
   - **"Editar"** (✏️) → Abre modal de edição com dados preenchidos
   - **"Deletar"** (🗑️) → Remove produto da lista (console.log)

3. **Cadastro de Novo Produto**
   - Botão "Cadastrar Produto" abre modal
   - Campos: Código, Nome, Unidade Peso, Peso, Perecível, Ativo, Estoque Vinculado (obrigatório)
   - Validação de campos obrigatórios

### Como Testar:
- Clique em "Ver Cotações" e verifique navegação
- Edite um produto existente
- Delete um produto
- Cadastre um novo produto (observe que Estoque Vinculado é obrigatório)

---

## 👥 Página de Fornecedores (`/fornecedores`)

### Funcionalidades:
1. **Listagem de Fornecedores**
   - Tabela com: Nome, CNPJ, Contato, Lead Time (dias), Status, Ações
   - Exibe 4 fornecedores de exemplo

2. **Ações por Fornecedor**
   - **"Ver Cotações"** → Navega para `/cotacoes`
   - **"Editar"** (✏️) → Abre modal de edição com dados preenchidos
   - **"Deletar"** (🗑️) → Remove fornecedor da lista (console.log)

3. **Cadastro de Novo Fornecedor**
   - Botão "Cadastrar Fornecedor" abre modal
   - Campos: Nome, CNPJ, Contato, Lead Time Médio (dias), Status (Ativo/Inativo)
   - Validação de campos obrigatórios

### Como Testar:
- Clique em "Ver Cotações" e verifique navegação
- Edite um fornecedor (altere Lead Time e veja impacto)
- Delete um fornecedor
- Cadastre um novo fornecedor

---

## 💰 Página de Cotações (`/cotacoes`)

### Funcionalidades:
1. **Listagem de Cotações**
   - Tabela com: Produto, Preço, Prazo (dias), Validade, Ações
   - Exibe 8 cotações de exemplo
   - Linhas destacadas em verde claro para cotações "Mais Vantajosas"

2. **Identificação de Cotação Mais Vantajosa**
   - Badge "Mais Vantajosa" nas cotações com menor preço
   - Em caso de empate, considera menor Lead Time
   - Apenas cotações com validade ativa são consideradas

3. **Aprovação de Cotação**
   - Botão "Aprovar Cotação" (cinza escuro se pendente, cinza claro se expirado)
   - Botão desabilitado se cotação estiver expirada
   - Ao aprovar, badge muda para "Aprovada" (azul)

4. **Status de Validade**
   - Badge azul para "Ativa"
   - Badge vermelho para "Expirada"

### Como Testar:
- Identifique as cotações "Mais Vantajosas" (linhas verdes)
- Aprove uma cotação ativa
- Tente aprovar uma cotação expirada (deve estar desabilitado)
- Verifique os badges de status

---

## 📄 Página de Pedidos (`/pedidos`)

### Funcionalidades:
1. **Listagem de Pedidos**
   - Tabela com: ID, Itens, Fornecedor, Data Criação, Data Prevista, Status, Ações
   - Exibe 5 pedidos de exemplo com diferentes status

2. **Status dos Pedidos**
   - CRIADO (cinza)
   - ENVIADO (azul)
   - EM_TRANSPORTE (azul)
   - RECEBIDO (verde)
   - CANCELADO (vermelho)

3. **Ações por Pedido**
   - **"Confirmar Recebimento"** → Muda status para RECEBIDO e desabilita ambos os botões
   - **"Cancelar"** → Muda status para CANCELADO e desabilita ambos os botões
   - Botões desabilitados se pedido já estiver RECEBIDO ou CANCELADO
   - Botão "Cancelar" desabilitado se pedido estiver EM_TRANSPORTE

4. **Criação de Novo Pedido**
   - Botão "Criar Pedido" abre modal
   - Campos: Cliente, Fornecedor, Estoque, Itens (múltiplos), Data Prevista
   - Validação de cotação válida para cada produto
   - Cálculo automático de data prevista baseado no Lead Time

### Como Testar:
- Confirme recebimento de um pedido (status muda e botões desabilitam)
- Cancele um pedido (status muda e botões desabilitam)
- Tente cancelar um pedido em transporte (deve estar desabilitado)
- Crie um novo pedido com múltiplos itens

---

## 📈 Página de Ponto de Ressuprimento (`/ponto-ressuprimento`)

### Funcionalidades:
1. **Fórmula de Cálculo**
   - Card explicativo com fórmula: ROP = (Consumo Médio Diário × Lead Time) + Estoque de Segurança

2. **Listagem de ROPs**
   - Tabela com: Estoque, Produto, Consumo Médio Diário, Lead Time, Estoque de Segurança, ROP Calculado, Saldo Atual, Status, Ações
   - Exibe ROPs de estoques ativos

3. **Status do ROP**
   - Badge verde "Adequado" se saldo >= ROP
   - Badge vermelho "Abaixo do ROP" se saldo < ROP

4. **Expansão de Linha**
   - Botão "Ver Histórico de Consumo" expande a linha
   - Mostra detalhes do ROP e fórmula de cálculo

### Como Testar:
- Verifique os cálculos de ROP
- Identifique produtos abaixo do ROP (badge vermelho)
- Clique em "Ver Histórico de Consumo" para expandir detalhes
- Verifique a fórmula de cálculo exibida

---

## ⚠️ Página de Alertas (`/alertas`)

### Funcionalidades:
1. **Cards de Resumo**
   - Crítico: Quantidade de produtos com alertas ativos
   - Alto: 0 (placeholder)
   - Médio: 0 (placeholder)

2. **Listagem de Alertas**
   - Tabela com: Produto, Estoque, Fornecedor Sugerido, Data do Alerta, Ações
   - Exibe apenas alertas ativos

3. **Ações por Alerta**
   - **"Gerar Pedido"** → Console.log "pedido gerado"
   - Botão azul com ícone de carrinho

4. **InfoBox**
   - Explica funcionamento automático dos alertas

### Como Testar:
- Verifique os cards de resumo
- Clique em "Gerar Pedido" e verifique console.log
- Verifique se apenas alertas ativos são exibidos

---

## 📊 Página de Movimentações (`/movimentacoes`)

### Funcionalidades:
1. **Cards de Resumo**
   - Total de Movimentações
   - Total de Entradas (verde)
   - Total de Saídas (azul)

2. **Tabs de Filtro**
   - Histórico (12 meses) - Todas as movimentações
   - Entradas - Apenas movimentações de ENTRADA
   - Saídas - Apenas movimentações de SAÍDA

3. **Listagem de Movimentações**
   - Tabela com: Data/Hora, Produto, Tipo, Quantidade, Motivo, Responsável
   - Badge com ícone ↑ para Entrada (verde)
   - Badge com ícone ↓ para Saída (azul)

4. **Registro de Nova Movimentação**
   - Botão "Registrar Movimentação" abre modal
   - Campos: Produto, Tipo (ENTRADA/SAÍDA), Quantidade, Data/Hora, Motivo, Responsável
   - Validação de campos obrigatórios

### Como Testar:
- Teste os filtros por tabs (Histórico, Entradas, Saídas)
- Verifique os badges de tipo (Entrada/Saída)
- Registre uma nova movimentação de entrada
- Registre uma nova movimentação de saída
- Verifique os cards de resumo

---

## 🔄 Página de Transferências (`/transferencias`)

### Funcionalidades:
1. **Listagem de Transferências**
   - Tabela com: Data/Hora, Produto, Quantidade, Origem, Destino, Responsável, Motivo
   - Exibe 4 transferências de exemplo

2. **Criação de Nova Transferência**
   - Botão "Nova Transferência" abre modal
   - Campos: Produto, Estoque Origem, Estoque Destino, Quantidade, Responsável, Motivo (obrigatório)
   - Validação de campos obrigatórios

3. **InfoBox**
   - Explica movimentações automáticas (SAÍDA na origem, ENTRADA no destino)

### Como Testar:
- Visualize as transferências existentes
- Crie uma nova transferência
- Verifique se o motivo é obrigatório
- Confirme que estoques origem e destino são diferentes

---

## 🔒 Página de Reservas (`/reservas`)

### Funcionalidades:
1. **Cards de Resumo**
   - Reservas Ativas: Quantidade e total de unidades
   - Reservas Liberadas: Quantidade

2. **Tabs de Filtro**
   - Ativas - Apenas reservas do tipo RESERVA
   - Histórico - Apenas liberações do tipo LIBERACAO
   - Canceladas - Placeholder (mesmo que Histórico)

3. **Listagem de Reservas**
   - Tabela com: Produto, Quantidade, Data/Hora, Tipo, Ações
   - Badge verde para "Reserva"
   - Badge azul para "Liberação"

4. **Ações por Reserva**
   - **"Liberar Reserva"** → Cria nova liberação e atualiza lista
   - Botão aparece apenas para reservas ativas (tipo RESERVA)

5. **InfoBox**
   - Explica funcionamento automático das reservas

### Como Testar:
- Teste os filtros por tabs (Ativas, Histórico)
- Verifique os cards de resumo
- Libere uma reserva ativa
- Verifique se a liberação aparece no histórico
- Confirme que apenas reservas ativas têm botão de liberar

---

## 🎯 Funcionalidades Gerais

### Navegação
- **Sidebar**: Menu lateral com todas as páginas
- **Badges Dinâmicos**: 
  - Pedidos: Contador de pedidos pendentes (azul)
  - Alertas: Contador de alertas ativos (vermelho)
- **Logout**: Botão no final da sidebar (funcionalidade a implementar)

### Layout
- **MainLayout**: Layout padrão com sidebar e área de conteúdo
- **PageHeader**: Cabeçalho com título, subtítulo e botão de ação
- **Responsivo**: Layout adaptável

### Componentes Reutilizáveis
- **Table**: Tabela genérica com headers customizáveis
- **Badge**: Badges com diferentes variantes e cores
- **Modal**: Modais para cadastro/edição
- **SummaryCard**: Cards de resumo com variantes
- **Tabs**: Navegação por abas
- **InfoBox**: Caixas informativas

---

## 📝 Notas Importantes para Testes

1. **Dados Mock**: Todos os dados são mockados e armazenados em `src/utils/mocks.ts`
2. **Persistência**: Alterações não persistem após recarregar a página
3. **Validações**: Formulários têm validação HTML5 básica
4. **Console Logs**: Algumas ações apenas logam no console (ex: deletar, gerar pedido)
5. **Navegação**: Todas as rotas estão configuradas em `src/main.tsx`

---

## 🚀 Como Executar os Testes

1. Inicie o servidor: `npm run dev`
2. Acesse: `http://localhost:8888`
3. Faça login (qualquer email/senha redireciona para estoques)
4. Navegue pelas páginas usando a sidebar
5. Teste cada funcionalidade listada acima

---

## ✅ Checklist de Testes

### Estoques
- [ ] Buscar estoques por nome/endereço
- [ ] Filtrar por cliente
- [ ] Filtrar por status
- [ ] Visualizar produtos
- [ ] Editar estoque
- [ ] Deletar estoque
- [ ] Cadastrar novo estoque

### Produtos
- [ ] Ver cotações
- [ ] Editar produto
- [ ] Deletar produto
- [ ] Cadastrar novo produto

### Fornecedores
- [ ] Ver cotações
- [ ] Editar fornecedor
- [ ] Deletar fornecedor
- [ ] Cadastrar novo fornecedor

### Cotações
- [ ] Identificar cotações mais vantajosas
- [ ] Aprovar cotação ativa
- [ ] Tentar aprovar cotação expirada
- [ ] Verificar badges de status

### Pedidos
- [ ] Confirmar recebimento
- [ ] Cancelar pedido
- [ ] Tentar cancelar pedido em transporte
- [ ] Criar novo pedido

### Ponto de Ressuprimento
- [ ] Verificar cálculos de ROP
- [ ] Identificar produtos abaixo do ROP
- [ ] Expandir histórico de consumo

### Alertas
- [ ] Verificar cards de resumo
- [ ] Gerar pedido a partir de alerta
- [ ] Verificar apenas alertas ativos

### Movimentações
- [ ] Filtrar por tabs
- [ ] Registrar entrada
- [ ] Registrar saída
- [ ] Verificar badges de tipo

### Transferências
- [ ] Visualizar transferências
- [ ] Criar nova transferência

### Reservas
- [ ] Filtrar por tabs
- [ ] Liberar reserva
- [ ] Verificar cards de resumo

---

**Última atualização**: 2025-01-XX
**Versão**: 1.0.0

