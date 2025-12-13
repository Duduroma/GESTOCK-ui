import api from './api';
import { Estoque, EstoqueId, ClienteId, ProdutoId, SaldoProduto } from '../types/entities';

interface ListEstoquesParams extends Record<string, string | number | boolean | undefined> {
    clienteId?: ClienteId;
    nome?: string;
    endereco?: string;
    ativo?: boolean;
    busca?: string;
    status?: string;
    page?: number;
    size?: number;
}

interface CreateEstoqueData {
    clienteId: number | string;
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
        console.log('📋 [EstoquesService] Listando estoques com params:', params);
        try {
            const response = await api.get('/estoques', params);
            console.log('✅ [EstoquesService] Resposta recebida:', response);
            console.log('📦 [EstoquesService] Tipo da resposta:', typeof response);
            console.log('📦 [EstoquesService] É array?', Array.isArray(response));
            if (response && typeof response === 'object') {
                console.log('📦 [EstoquesService] Keys da resposta:', Object.keys(response));
                if (Array.isArray(response)) {
                    console.log('📦 [EstoquesService] Tamanho do array:', response.length);
                    if (response.length > 0) {
                        console.log('📦 [EstoquesService] Primeiro estoque:', response[0]);
                    }
                } else if ('content' in response) {
                    console.log('📦 [EstoquesService] Content (array):', response.content);
                    console.log('📦 [EstoquesService] Total de elementos:', response.totalElements);
                    console.log('📦 [EstoquesService] Tamanho do content:', Array.isArray(response.content) ? response.content.length : 'não é array');
                }
            }
            return response;
        } catch (error: any) {
            console.error('❌ [EstoquesService] Erro ao listar estoques:', error);
            console.error('❌ [EstoquesService] Detalhes do erro:', {
                message: error?.message,
                status: error?.response?.status,
                data: error?.response?.data,
                stack: error?.stack
            });
            throw error;
        }
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

    registrarEntrada: async (estoqueId: EstoqueId, data: {
        produtoId: ProdutoId;
        quantidade: number;
        responsavel: string;
        motivo: string;
        metadados?: Record<string, any>;
    }): Promise<void> => {
        return api.post(`/estoques/${estoqueId}/entrada`, data);
    },

    registrarSaida: async (estoqueId: EstoqueId, data: {
        produtoId: ProdutoId;
        quantidade: number;
        responsavel: string;
        motivo: string;
    }): Promise<void> => {
        return api.post(`/estoques/${estoqueId}/saida`, data);
    },
};

