import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Tabs from '../../components/Tabs';
import Badge from '../../components/Badge';
import { useState, useMemo } from 'react';
import RegistrarMovimentacaoModal from '../../components/Modals/RegistrarMovimentacaoModal';

interface Movimentacao {
    id: string;
    data: string;
    produto: string;
    tipo: 'entrada' | 'saida';
    quantidade: string;
    motivo: string;
    responsavel: string;
    estoque: string;
}

function Movimentacoes(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([
        {
            id: '1',
            data: '22/10/2025',
            produto: 'Tinta Acrílica Azul',
            tipo: 'entrada',
            quantidade: '3.500',
            motivo: 'Recebimento de Pedido #12',
            responsavel: 'Carlos Mendes',
            estoque: 'Estoque Central'
        },
        {
            id: '2',
            data: '21/10/2025',
            produto: 'Parafuso M10',
            tipo: 'saida',
            quantidade: '850',
            motivo: 'Venda ao Cliente',
            responsavel: 'Ana Paula',
            estoque: 'Estoque Filial Sul'
        },
        {
            id: '3',
            data: '20/10/2025',
            produto: 'Cabo Elétrico 6mm',
            tipo: 'entrada',
            quantidade: '2.200',
            motivo: 'Recebimento de Pedido #11',
            responsavel: 'Roberto Alves',
            estoque: 'Estoque Filial Norte'
        },
        {
            id: '4',
            data: '19/10/2025',
            produto: 'Tinta Látex Branca',
            tipo: 'saida',
            quantidade: '35',
            motivo: 'Transferência para Filial',
            responsavel: 'Fernanda Lima',
            estoque: 'Estoque Central'
        },
        {
            id: '5',
            data: '18/10/2025',
            produto: 'Parafuso M6',
            tipo: 'entrada',
            quantidade: '8.000',
            motivo: 'Recebimento de Pedido #10',
            responsavel: 'Carlos Mendes',
            estoque: 'Estoque Central'
        }
    ]);

    const movimentacoesFiltradas = useMemo(() => {
        switch (activeTab) {
            case 0:
                return movimentacoes;
            case 1:
                return movimentacoes.filter(m => m.tipo === 'entrada');
            case 2:
                return movimentacoes.filter(m => m.tipo === 'saida');
            default:
                return [];
        }
    }, [activeTab, movimentacoes]);

    const movimentacoesEntradas = movimentacoes.filter(m => m.tipo === 'entrada');
    const movimentacoesSaidas = movimentacoes.filter(m => m.tipo === 'saida');

    const handleConfirm = (data: {
        produto: string;
        tipo: string;
        estoque: string;
        quantidade: string;
        motivo: string;
        responsavel: string;
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

            <Table headers={['Data', 'Produto', 'Tipo', 'Quantidade', 'Motivo', 'Responsável', 'Estoque']}>
                {movimentacoesFiltradas.map((movimentacao) => (
                    <TableRow key={movimentacao.id}>
                        <TableCell>{movimentacao.data}</TableCell>
                        <TableCell>{movimentacao.produto}</TableCell>
                        <TableCell>
                            <Badge 
                                variant={movimentacao.tipo} 
                                icon={movimentacao.tipo === 'entrada' ? '↑' : '↓'}
                                shape="square"
                            >
                                {movimentacao.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                            </Badge>
                        </TableCell>
                        <TableCell>{movimentacao.quantidade}</TableCell>
                        <TableCell>{movimentacao.motivo}</TableCell>
                        <TableCell>{movimentacao.responsavel}</TableCell>
                        <TableCell>{movimentacao.estoque}</TableCell>
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

