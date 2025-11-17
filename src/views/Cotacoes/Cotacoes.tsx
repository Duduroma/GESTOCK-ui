import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ApproveButton from './ApproveButton';
import InfoBox from '../../components/InfoBox';

interface Cotacao {
    id: string;
    produto: string;
    fornecedor: string;
    preco: string;
    leadTime: string;
    validade: string;
    status: 'pending' | 'approved' | 'expired';
    isMostAdvantageous?: boolean;
}

function Cotacoes(): React.ReactElement {
    const [cotacoes, setCotacoes] = useState<Cotacao[]>([
        {
            id: '1',
            produto: 'Parafuso M6',
            fornecedor: 'Fornecedor A',
            preco: 'R$ 0.50',
            leadTime: '7 dias',
            validade: '16/11/2025',
            status: 'pending',
            isMostAdvantageous: false
        },
        {
            id: '2',
            produto: 'Parafuso M6',
            fornecedor: 'Fornecedor B',
            preco: 'R$ 0.45',
            leadTime: '5 dias',
            validade: '16/11/2025',
            status: 'pending',
            isMostAdvantageous: true
        },
        {
            id: '3',
            produto: 'Tinta Branca',
            fornecedor: 'Fornecedor C',
            preco: 'R$ 85.00',
            leadTime: '10 dias',
            validade: '16/12/2025',
            status: 'pending',
            isMostAdvantageous: true
        },
        {
            id: '4',
            produto: 'Cabo Elétrico',
            fornecedor: 'Fornecedor A',
            preco: 'R$ 12.50',
            leadTime: '7 dias',
            validade: '30/09/2025',
            status: 'expired',
            isMostAdvantageous: false
        }
    ]);

    const handleApprove = (cotacaoId: string) => {
        setCotacoes(cotacoes.map(cotacao => 
            cotacao.id === cotacaoId && cotacao.status === 'pending'
                ? { ...cotacao, status: 'approved' }
                : cotacao
        ));
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'approved':
                return 'approved';
            case 'expired':
                return 'expired';
            case 'pending':
            default:
                return 'pending';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'approved':
                return 'Aprovado';
            case 'expired':
                return 'Expirada';
            case 'pending':
            default:
                return 'Pendente';
        }
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Cotações"
                subtitle="Visualize e aprove cotações de produtos"
            />

            <InfoBox
                title="Critérios de Seleção Automática"
                items={[
                    'Prioridade 1: Menor preço entre fornecedores ativos',
                    'Prioridade 2: Em caso de empate no preço, menor Lead Time',
                    'Cotações expiradas não são consideradas'
                ]}
                variant="blue"
            />

            <Table headers={['Produto', 'Fornecedor', 'Preço', 'Lead Time', 'Validade', 'Status', 'Ações']}>
                {cotacoes.map((cotacao) => (
                    <TableRow key={cotacao.id} highlighted={cotacao.isMostAdvantageous}>
                        <TableCell>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {cotacao.produto}
                                {cotacao.isMostAdvantageous && (
                                    <Badge variant="adequate">
                                        Mais Vantajosa
                                    </Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{cotacao.fornecedor}</TableCell>
                        <TableCell>{cotacao.preco}</TableCell>
                        <TableCell>{cotacao.leadTime}</TableCell>
                        <TableCell>{cotacao.validade}</TableCell>
                        <TableCell>
                            <Badge variant={getStatusVariant(cotacao.status)}>
                                {getStatusLabel(cotacao.status)}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <ApproveButton
                                onClick={() => handleApprove(cotacao.id)}
                                disabled={cotacao.status === 'expired'}
                                isMostAdvantageous={cotacao.isMostAdvantageous && cotacao.status === 'pending'}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
        </MainLayout>
    );
}

export default Cotacoes;

