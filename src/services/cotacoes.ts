import api from './api';
import { Cotacao, CotacaoId } from '../types/entities';

interface AprovarCotacaoData {
    aprovada: boolean;
}

export const cotacoesService = {
    aprovar: async (id: CotacaoId, data: AprovarCotacaoData): Promise<Cotacao> => {
        return api.patch(`/cotacoes/${id}/aprovar`, data);
    },
};

