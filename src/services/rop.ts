import api from './api';
import { ROP, EstoqueId, ProdutoId } from '../types/entities';

interface CalcularROPData {
    consumoMedio: number;
    leadTimeDias: number;
    estoqueSeguranca: number;
}

interface ConsumoMedioResponse {
    consumoMedio: number;
    periodoDias: number;
    totalConsumido: number;
}

interface HistoricoConsumoResponse {
    periodoDias: number;
    consumoTotal: number;
    consumoMedioDiario: number;
    movimentacoes: Array<{
        data: string;
        tipo: string;
        quantidade: number;
    }>;
}

export const ropService = {
    calcular: async (estoqueId: EstoqueId, produtoId: ProdutoId, data: CalcularROPData): Promise<ROP> => {
        return api.post(`/estoques/${estoqueId}/produtos/${produtoId}/rop`, data);
    },

    obter: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<ROP> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/rop`);
    },

    listar: async (estoqueId: EstoqueId): Promise<Record<ProdutoId, ROP>> => {
        return api.get(`/estoques/${estoqueId}/rops`);
    },

    obterConsumoMedio: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<ConsumoMedioResponse> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/consumo-medio`);
    },

    obterHistoricoConsumo: async (estoqueId: EstoqueId, produtoId: ProdutoId): Promise<HistoricoConsumoResponse> => {
        return api.get(`/estoques/${estoqueId}/produtos/${produtoId}/historico-consumo`);
    },
};

