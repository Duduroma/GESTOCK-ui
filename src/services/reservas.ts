import api from './api';
import { ReservaRegistro, EstoqueId, ProdutoId, TipoReservaRegistro } from '../types/entities';

interface ListReservasParams extends Record<string, string | number | boolean | undefined> {
    tipo?: TipoReservaRegistro;
    produtoId?: ProdutoId;
    page?: number;
    size?: number;
}

interface CreateReservaData {
    produtoId: ProdutoId;
    quantidade: number;
}

interface LiberarReservaData {
    produtoId: ProdutoId;
    quantidade: number;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const reservasService = {
    listar: async (estoqueId: EstoqueId, params?: ListReservasParams): Promise<PaginatedResponse<ReservaRegistro>> => {
        return api.get(`/estoques/${estoqueId}/reservas`, params);
    },

    reservar: async (estoqueId: EstoqueId, data: CreateReservaData): Promise<ReservaRegistro> => {
        return api.post(`/estoques/${estoqueId}/reservas`, data);
    },

    liberar: async (estoqueId: EstoqueId, data: LiberarReservaData): Promise<ReservaRegistro> => {
        return api.post(`/estoques/${estoqueId}/reservas/liberar`, data);
    },
};

