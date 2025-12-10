import api from './api';
import { Fornecedor, FornecedorId, ProdutoId, Cotacao, CotacaoId, LeadTime } from '../types/entities';

interface ListFornecedoresParams extends Record<string, string | number | boolean | undefined> {
    ativo?: boolean;
    page?: number;
    size?: number;
}

interface CreateFornecedorData {
    nome: string;
    cnpj: string;
    contato: string;
    leadTimeMedio: LeadTime;
    ativo: boolean;
}

interface UpdateFornecedorData {
    nome?: string;
    contato?: string;
    leadTimeMedio?: LeadTime;
}

interface CreateCotacaoData {
    produtoId: ProdutoId;
    preco: number;
    prazoDias: number;
    validadeAtiva: boolean;
}

interface UpdateCotacaoData {
    preco?: number;
    prazoDias?: number;
    validadeAtiva?: boolean;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const fornecedoresService = {
    listar: async (params?: ListFornecedoresParams): Promise<PaginatedResponse<Fornecedor>> => {
        return api.get('/fornecedores', params);
    },

    buscarPorId: async (id: FornecedorId): Promise<Fornecedor> => {
        return api.get(`/fornecedores/${id}`);
    },

    criar: async (data: CreateFornecedorData): Promise<Fornecedor> => {
        return api.post('/fornecedores', data);
    },

    atualizar: async (id: FornecedorId, data: UpdateFornecedorData): Promise<Fornecedor> => {
        return api.put(`/fornecedores/${id}`, data);
    },

    inativar: async (id: FornecedorId): Promise<void> => {
        return api.patch(`/fornecedores/${id}/inativar`);
    },

    ativar: async (id: FornecedorId): Promise<void> => {
        return api.patch(`/fornecedores/${id}/ativar`);
    },

    registrarCotacao: async (fornecedorId: FornecedorId, data: CreateCotacaoData): Promise<Cotacao> => {
        return api.post(`/fornecedores/${fornecedorId}/cotacoes`, data);
    },

    atualizarCotacao: async (fornecedorId: FornecedorId, cotacaoId: CotacaoId, data: UpdateCotacaoData): Promise<Cotacao> => {
        return api.put(`/fornecedores/${fornecedorId}/cotacoes/${cotacaoId}`, data);
    },

    removerCotacao: async (fornecedorId: FornecedorId, cotacaoId: CotacaoId): Promise<void> => {
        return api.delete(`/fornecedores/${fornecedorId}/cotacoes/${cotacaoId}`);
    },

    obterMelhorCotacao: async (produtoId: ProdutoId): Promise<Cotacao & { fornecedorId: FornecedorId }> => {
        return api.get(`/fornecedores/melhor-cotacao/${produtoId}`);
    },
};

