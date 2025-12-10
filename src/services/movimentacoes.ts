import api from './api';
import { Movimentacao, EstoqueId, ProdutoId, TipoMovimentacao } from '../types/entities';

interface ListMovimentacoesParams extends Record<string, string | number | boolean | undefined> {
    tipo?: TipoMovimentacao;
    produtoId?: ProdutoId;
    dataInicio?: string;
    dataFim?: string;
    page?: number;
    size?: number;
}

interface CreateMovimentacaoData {
    produtoId: ProdutoId;
    quantidade: number;
    responsavel: string;
    motivo: string;
    meta?: Record<string, string>;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const movimentacoesService = {
    listar: async (estoqueId: EstoqueId, params?: ListMovimentacoesParams): Promise<PaginatedResponse<Movimentacao>> => {
        return api.get(`/estoques/${estoqueId}/movimentacoes`, params);
    },

    buscarPorId: async (id: number): Promise<Movimentacao> => {
        return api.get(`/movimentacoes/${id}`);
    },

    registrarEntrada: async (estoqueId: EstoqueId, data: CreateMovimentacaoData): Promise<Movimentacao> => {
        return api.post(`/estoques/${estoqueId}/movimentacoes/entrada`, data);
    },

    registrarSaida: async (estoqueId: EstoqueId, data: CreateMovimentacaoData): Promise<Movimentacao> => {
        return api.post(`/estoques/${estoqueId}/movimentacoes/saida`, data);
    },
};

