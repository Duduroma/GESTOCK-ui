import api from './api';
import { Produto, ProdutoId, EstoqueId, Cotacao } from '../types/entities';

interface ListProdutosParams extends Record<string, string | number | boolean | undefined> {
    codigo?: string;
    nome?: string;
    ativo?: boolean;
    estoqueId?: EstoqueId;
    page?: number;
    size?: number;
}

interface CreateProdutoData {
    codigo: string;
    nome: string;
    unidadePeso: string;
    peso: number;
    perecivel: boolean;
    ativo: boolean;
    estoquesVinculados: EstoqueId[];
}

interface UpdateProdutoData {
    nome?: string;
    unidadePeso?: string;
    peso?: number;
    perecivel?: boolean;
    ativo?: boolean;
    estoquesVinculados?: EstoqueId[];
}

interface ListCotacoesParams extends Record<string, string | number | boolean | undefined> {
    validadeAtiva?: boolean;
    fornecedorAtivo?: boolean;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const produtosService = {
    listar: async (params?: ListProdutosParams): Promise<PaginatedResponse<Produto>> => {
        return api.get('/produtos', params);
    },

    buscarPorId: async (id: ProdutoId): Promise<Produto> => {
        return api.get(`/produtos/${id}`);
    },

    criar: async (data: CreateProdutoData): Promise<Produto> => {
        return api.post('/produtos', data);
    },

    atualizar: async (id: ProdutoId, data: UpdateProdutoData): Promise<Produto> => {
        return api.put(`/produtos/${id}`, data);
    },

    inativar: async (id: ProdutoId): Promise<void> => {
        return api.patch(`/produtos/${id}/inativar`);
    },

    ativar: async (id: ProdutoId): Promise<void> => {
        return api.patch(`/produtos/${id}/ativar`);
    },

    vincularEstoques: async (id: ProdutoId, estoqueIds: EstoqueId[]): Promise<void> => {
        return api.post(`/produtos/${id}/estoques`, { estoqueIds });
    },

    listarCotacoes: async (produtoId: ProdutoId, params?: ListCotacoesParams): Promise<Array<Cotacao & { fornecedorId: string }>> => {
        return api.get(`/produtos/${produtoId}/cotacoes`, params);
    },

    obterMelhorCotacao: async (produtoId: ProdutoId): Promise<Cotacao & { fornecedorId: string }> => {
        return api.get(`/produtos/${produtoId}/cotacoes/melhor`);
    },
};

