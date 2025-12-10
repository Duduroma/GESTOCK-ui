import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';
import NovaTransferenciaModal from '../../components/Modals/NovaTransferenciaModal';
import { Transferencia, ProdutoId, EstoqueId } from '../../types/entities';
import { mockTransferencias } from '../../utils/mocks';

function Transferencias(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transferencias, setTransferencias] = useState<Transferencia[]>(mockTransferencias);

    const handleConfirm = (data: {
        produtoId: string;
        estoqueOrigemId: string;
        estoqueDestinoId: string;
        quantidade: number;
        responsavel: string;
        motivo: string;
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

            <Table headers={['Data/Hora', 'Produto', 'Quantidade', 'Origem', 'Destino', 'Responsável', 'Motivo']}>
                {transferencias.map((transferencia) => (
                    <TableRow key={transferencia.id}>
                        <TableCell>{new Date(transferencia.dataHora).toLocaleString('pt-BR')}</TableCell>
                        <TableCell>Produto {transferencia.produtoId}</TableCell>
                        <TableCell>{transferencia.quantidade.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>Estoque {transferencia.estoqueOrigemId}</TableCell>
                        <TableCell>Estoque {transferencia.estoqueDestinoId}</TableCell>
                        <TableCell>{transferencia.responsavel}</TableCell>
                        <TableCell>{transferencia.motivo}</TableCell>
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

