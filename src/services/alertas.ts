import api from './api';
import { Alerta, AlertaId, ProdutoId, EstoqueId, FornecedorId } from '../types/entities';

interface ListAlertasParams extends Record<string, string | number | boolean | undefined> {
    ativo?: boolean;
    produtoId?: ProdutoId;
    estoqueId?: EstoqueId;
    page?: number;
    size?: number;
}

interface CreateAlertaData {
    produtoId: ProdutoId;
    estoqueId: EstoqueId;
}

interface UpdateFornecedorSugeridoData {
    fornecedorSugerido: FornecedorId;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const alertasService = {
    listar: async (params?: ListAlertasParams): Promise<PaginatedResponse<Alerta>> => {
        return api.get('/alertas', params);
    },

    buscarPorId: async (id: AlertaId): Promise<Alerta> => {
        return api.get(`/alertas/${id}`);
    },

    gerar: async (data: CreateAlertaData): Promise<Alerta> => {
        return api.post('/alertas', data);
    },

    desativar: async (id: AlertaId): Promise<void> => {
        return api.patch(`/alertas/${id}/desativar`);
    },

    atualizarFornecedorSugerido: async (id: AlertaId, data: UpdateFornecedorSugeridoData): Promise<void> => {
        return api.patch(`/alertas/${id}/fornecedor-sugerido`, data);
    },

    gerarPedido: async (id: AlertaId): Promise<{ id: string }> => {
        return api.post(`/alertas/${id}/gerar-pedido`, {});
    },
};

