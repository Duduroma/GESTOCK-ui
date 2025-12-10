import api from './api';
import { Estoque, EstoqueId, ClienteId, ProdutoId, SaldoProduto } from '../types/entities';

interface ListEstoquesParams extends Record<string, string | number | boolean | undefined> {
    clienteId?: ClienteId;
    nome?: string;
    endereco?: string;
    ativo?: boolean;
    page?: number;
    size?: number;
}

interface CreateEstoqueData {
    clienteId: ClienteId;
    nome: string;
    endereco: string;
    capacidade: number;
    ativo: boolean;
}

interface UpdateEstoqueData {
    nome?: string;
    endereco?: string;
    capacidade?: number;
    ativo?: boolean;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const estoquesService = {
    listar: async (params?: ListEstoquesParams): Promise<PaginatedResponse<Estoque>> => {
        return api.get('/estoques', params);
    },

    buscarPorId: async (id: EstoqueId): Promise<Estoque> => {
        return api.get(`/estoques/${id}`);
    },

    criar: async (data: CreateEstoqueData): Promise<Estoque> => {
        return api.post('/estoques', data);
    },

    atualizar: async (id: EstoqueId, data: UpdateEstoqueData): Promise<Estoque> => {
        return api.put(`/estoques/${id}`, data);
    },

    inativar: async (id: EstoqueId): Promise<void> => {
        return api.patch(`/estoques/${id}/inativar`);
    },

    ativar: async (id: EstoqueId): Promise<void> => {
        return api.patch(`/estoques/${id}/ativar`);
    },

    deletar: async (id: EstoqueId): Promise<void> => {
        return api.delete(`/estoques/${id}`);
    },

    obterSaldo: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<SaldoProduto> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/saldo`);
    },

    obterSaldoFisico: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<{ saldoFisico: number }> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/saldo-fisico`);
    },

    obterSaldoReservado: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<{ saldoReservado: number }> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/saldo-reservado`);
    },

    obterSaldoDisponivel: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<{ saldoDisponivel: number }> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/saldo-disponivel`);
    },

    listarProdutosAbaixoROP: async (estoqueId: EstoqueId): Promise<Array<{
        produtoId: ProdutoId;
        saldoAtual: number;
        valorROP: number;
        deficit: number;
    }>> => {
        return api.get(`/estoques/${estoqueId}/produtos/abaixo-rop`);
    },

    verificarAtingiuROP: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<{
        atingiuROP: boolean;
        saldoAtual: number;
        valorROP: number;
        deficit: number;
    }> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/atingiu-rop`);
    },
};

