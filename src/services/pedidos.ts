import api from './api';
import { Pedido, PedidoId, ClienteId, FornecedorId, EstoqueId, ItemPedido, StatusPedido, CustoPedido } from '../types/entities';

interface ListPedidosParams extends Record<string, string | number | boolean | undefined> {
    clienteId?: ClienteId;
    fornecedorId?: FornecedorId;
    status?: StatusPedido;
    page?: number;
    size?: number;
}

interface CreatePedidoData {
    clienteId: ClienteId;
    fornecedorId: FornecedorId;
    estoqueId: EstoqueId;
    itens: ItemPedido[];
    dataPrevistaEntrega?: string;
}

interface AddItemPedidoData {
    produtoId: string;
    quantidade: number;
    precoUnitario: number;
}

interface RegisterCustoData {
    valorItens: number;
    frete: number;
    custosLogisticos: number;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const pedidosService = {
    listar: async (params?: ListPedidosParams): Promise<PaginatedResponse<Pedido>> => {
        return api.get('/pedidos', params);
    },

    buscarPorId: async (id: PedidoId): Promise<Pedido> => {
        return api.get(`/pedidos/${id}`);
    },

    criar: async (data: CreatePedidoData): Promise<Pedido> => {
        return api.post('/pedidos', data);
    },

    adicionarItem: async (id: PedidoId, data: AddItemPedidoData): Promise<void> => {
        return api.post(`/pedidos/${id}/itens`, data);
    },

    enviar: async (id: PedidoId): Promise<void> => {
        return api.patch(`/pedidos/${id}/enviar`);
    },

    iniciarTransporte: async (id: PedidoId): Promise<void> => {
        return api.patch(`/pedidos/${id}/iniciar-transporte`);
    },

    confirmarRecebimento: async (id: PedidoId): Promise<void> => {
        return api.patch(`/pedidos/${id}/confirmar-recebimento`);
    },

    cancelar: async (id: PedidoId): Promise<void> => {
        return api.patch(`/pedidos/${id}/cancelar`);
    },

    concluir: async (id: PedidoId): Promise<void> => {
        return api.patch(`/pedidos/${id}/concluir`);
    },

    registrarCusto: async (id: PedidoId, data: RegisterCustoData): Promise<CustoPedido> => {
        return api.post(`/pedidos/${id}/custo`, data);
    },
};

