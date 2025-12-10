import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Tabs from '../../components/Tabs';
import Badge from '../../components/Badge';
import { useState, useMemo } from 'react';
import RegistrarMovimentacaoModal from '../../components/Modals/RegistrarMovimentacaoModal';

import { Movimentacao, TipoMovimentacao, ProdutoId } from '../../types/entities';
import { mockMovimentacoes } from '../../utils/mocks';

function Movimentacoes(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>(mockMovimentacoes);

    const movimentacoesFiltradas = useMemo(() => {
        switch (activeTab) {
            case 0:
                return movimentacoes;
            case 1:
                return movimentacoes.filter(m => m.tipo === TipoMovimentacao.ENTRADA);
            case 2:
                return movimentacoes.filter(m => m.tipo === TipoMovimentacao.SAIDA);
            default:
                return [];
        }
    }, [activeTab, movimentacoes]);

    const movimentacoesEntradas = movimentacoes.filter(m => m.tipo === TipoMovimentacao.ENTRADA);
    const movimentacoesSaidas = movimentacoes.filter(m => m.tipo === TipoMovimentacao.SAIDA);

    const handleConfirm = (data: {
        produtoId: string;
        tipo: TipoMovimentacao;
        quantidade: number;
        dataHora: string;
        motivo: string;
        responsavel: string;
        meta?: Record<string, string>;
    }) => {
        console.log('Registrar movimentação:', data);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Movimentações de Estoque"
                subtitle="Registre e acompanhe entradas e saídas"
                actionButton={{
                    label: "Registrar Movimentação",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Total de Movimentações"
                    value={movimentacoes.length}
                />
                <SummaryCard
                    title="Total de Entradas"
                    value={movimentacoesEntradas.length}
                    variant="green"
                />
                <SummaryCard
                    title="Total de Saídas"
                    value={movimentacoesSaidas.length}
                    variant="blue"
                />
            </div>

            <Tabs
                tabs={[
                    { label: 'Histórico (12 meses)' },
                    { label: 'Entradas', count: movimentacoesEntradas.length },
                    { label: 'Saídas', count: movimentacoesSaidas.length }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Table headers={['Data/Hora', 'Produto', 'Tipo', 'Quantidade', 'Motivo', 'Responsável']}>
                {movimentacoesFiltradas.map((movimentacao) => (
                    <TableRow key={movimentacao.id}>
                        <TableCell>{new Date(movimentacao.dataHora).toLocaleString('pt-BR')}</TableCell>
                        <TableCell>Produto {movimentacao.produtoId}</TableCell>
                        <TableCell>
                            <Badge 
                                variant={movimentacao.tipo === TipoMovimentacao.ENTRADA ? 'entrada' : 'saida'} 
                                icon={movimentacao.tipo === TipoMovimentacao.ENTRADA ? '↑' : '↓'}
                                shape="square"
                            >
                                {movimentacao.tipo === TipoMovimentacao.ENTRADA ? 'Entrada' : 'Saída'}
                            </Badge>
                        </TableCell>
                        <TableCell>{movimentacao.quantidade.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>{movimentacao.motivo}</TableCell>
                        <TableCell>{movimentacao.responsavel}</TableCell>
                    </TableRow>
                ))}
            </Table>

            <RegistrarMovimentacaoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Movimentacoes;

