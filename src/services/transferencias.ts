import api from './api';
import { Transferencia, EstoqueId, ProdutoId } from '../types/entities';

interface ListTransferenciasParams extends Record<string, string | number | boolean | undefined> {
    estoqueOrigemId?: EstoqueId;
    estoqueDestinoId?: EstoqueId;
    produtoId?: ProdutoId;
    page?: number;
    size?: number;
}

interface CreateTransferenciaData {
    produtoId: ProdutoId;
    estoqueOrigemId: EstoqueId;
    estoqueDestinoId: EstoqueId;
    quantidade: number;
    responsavel: string;
    motivo: string;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const transferenciasService = {
    listar: async (params?: ListTransferenciasParams): Promise<PaginatedResponse<Transferencia>> => {
        return api.get('/transferencias', params);
    },

    buscarPorId: async (id: number): Promise<Transferencia> => {
        return api.get(`/transferencias/${id}`);
    },

    criar: async (data: CreateTransferenciaData): Promise<Transferencia> => {
        return api.post('/transferencias', data);
    },
};

