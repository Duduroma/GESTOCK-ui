import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';
import NovaTransferenciaModal from '../../components/Modals/NovaTransferenciaModal';

interface Transferencia {
    id: string;
    data: string;
    produto: string;
    quantidade: string;
    origem: string;
    destino: string;
    responsavel: string;
    status: 'completed' | 'processing';
}

function Transferencias(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transferencias, setTransferencias] = useState<Transferencia[]>([
        {
            id: '1',
            data: '22/10/2025',
            produto: 'Tinta Acrílica Verde',
            quantidade: '1.800',
            origem: 'Estoque Central',
            destino: 'Estoque Filial Sul',
            responsavel: 'Roberto Alves',
            status: 'completed'
        },
        {
            id: '2',
            data: '21/10/2025',
            produto: 'Parafuso M10',
            quantidade: '650',
            origem: 'Estoque Central',
            destino: 'Estoque Temporário',
            responsavel: 'Ana Paula',
            status: 'completed'
        },
        {
            id: '3',
            data: '20/10/2025',
            produto: 'Cabo Elétrico 8mm',
            quantidade: '1.200',
            origem: 'Estoque Filial Norte',
            destino: 'Estoque Central',
            responsavel: 'Carlos Mendes',
            status: 'processing'
        }
    ]);

    const handleConfirm = (data: {
        produto: string;
        estoqueOrigem: string;
        estoqueDestino: string;
        quantidade: string;
        responsavel: string;
    }) => {
        console.log('Nova transferência:', data);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Transferências entre Estoques"
                subtitle="Transfira produtos entre estoques do mesmo cliente"
                actionButton={{
                    label: "Nova Transferência",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['Data', 'Produto', 'Quantidade', 'Origem', 'Destino', 'Responsável', 'Status']}>
                {transferencias.map((transferencia) => (
                    <TableRow key={transferencia.id}>
                        <TableCell>{transferencia.data}</TableCell>
                        <TableCell>{transferencia.produto}</TableCell>
                        <TableCell>{transferencia.quantidade}</TableCell>
                        <TableCell>{transferencia.origem}</TableCell>
                        <TableCell>{transferencia.destino}</TableCell>
                        <TableCell>{transferencia.responsavel}</TableCell>
                        <TableCell>
                            <Badge variant={transferencia.status === 'completed' ? 'approved' : 'pending'}>
                                {transferencia.status === 'completed' ? 'Concluída' : 'Em Processamento'}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <InfoBox
                title="Movimentações Automáticas"
                items={[
                    'Após confirmar a transferência, o sistema registra automaticamente:',
                    'Movimentação de SAÍDA no estoque de origem',
                    'Movimentação de ENTRADA no estoque de destino'
                ]}
                variant="yellow"
            />

            <NovaTransferenciaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Transferencias;

