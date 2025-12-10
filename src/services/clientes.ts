import api from './api';
import { Cliente, ClienteId } from '../types/entities';

interface ListClientesParams extends Record<string, string | number | boolean | undefined> {
    nome?: string;
    documento?: string;
    page?: number;
    size?: number;
}

interface CreateClienteData {
    nome: string;
    documento: string;
    email: string;
}

interface UpdateClienteData {
    nome?: string;
    email?: string;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const clientesService = {
    listar: async (params?: ListClientesParams): Promise<PaginatedResponse<Cliente>> => {
        return api.get('/clientes', params);
    },

    buscarPorId: async (id: ClienteId): Promise<Cliente> => {
        return api.get(`/clientes/${id}`);
    },

    criar: async (data: CreateClienteData): Promise<Cliente> => {
        return api.post('/clientes', data);
    },

    atualizar: async (id: ClienteId, data: UpdateClienteData): Promise<Cliente> => {
        return api.put(`/clientes/${id}`, data);
    },
};

