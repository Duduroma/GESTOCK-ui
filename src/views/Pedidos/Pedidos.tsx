import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';

interface Pedido {
    id: string;
    produto: string;
    fornecedor: string;
    quantidade: string;
    dataPrevista: string;
    status: 'pending' | 'received' | 'canceled';
}

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidos, setPedidos] = useState<Pedido[]>([
        {
            id: '1',
            produto: 'Parafuso M6',
            fornecedor: 'Fornecedor B',
            quantidade: '10.000',
            dataPrevista: '21/10/2025',
            status: 'received'
        },
        {
            id: '2',
            produto: 'Tinta Branca',
            fornecedor: 'Fornecedor C',
            quantidade: '50',
            dataPrevista: '26/10/2025',
            status: 'pending'
        },
        {
            id: '3',
            produto: 'Parafuso M6',
            fornecedor: 'Fornecedor A',
            quantidade: '5.000',
            dataPrevista: '23/10/2025',
            status: 'pending'
        }
    ]);

    const handleConfirm = (data: {
        produto: string;
        fornecedor: string;
        quantidade: string;
        leadTime: string;
        dataPrevista: string;
    }) => {
        console.log('Criar pedido:', data);
    };

    const handleConfirmRecebimento = (pedidoId: string) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: 'received' }
                : pedido
        ));
    };

    const handleCancelar = (pedidoId: string) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: 'canceled' }
                : pedido
        ));
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Pedidos"
                subtitle="Crie e acompanhe pedidos de compra"
                actionButton={{
                    label: "Criar Pedido",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['ID', 'Produto', 'Fornecedor', 'Quantidade', 'Data Prevista', 'Status', 'Ações']}>
                {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                        <TableCell>#{pedido.id}</TableCell>
                        <TableCell>{pedido.produto}</TableCell>
                        <TableCell>{pedido.fornecedor}</TableCell>
                        <TableCell>{pedido.quantidade}</TableCell>
                        <TableCell>{pedido.dataPrevista}</TableCell>
                        <TableCell>
                            <Badge variant={
                                pedido.status === 'received' ? 'approved' : 
                                pedido.status === 'canceled' ? 'expired' : 
                                'pending'
                            }>
                                {pedido.status === 'received' ? 'Recebido' : 
                                 pedido.status === 'canceled' ? 'Cancelado' : 
                                 'Pendente'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Confirmar Recebimento"
                                    icon="✓"
                                    onClick={() => handleConfirmRecebimento(pedido.id)}
                                    disabled={pedido.status === 'received' || pedido.status === 'canceled'}
                                />
                                <ActionButton
                                    label="Cancelar"
                                    icon="✕"
                                    onClick={() => handleCancelar(pedido.id)}
                                    disabled={pedido.status === 'received' || pedido.status === 'canceled'}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <InfoBox
                title="Ações Automáticas"
                items={[
                    'Ao criar pedido → Reserva de estoque é gerada automaticamente',
                    'Ao confirmar recebimento → Movimentação de entrada é registrada',
                    'Ao cancelar pedido → Reserva de estoque é liberada'
                ]}
                variant="yellow"
            />

            <CriarPedidoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Pedidos;

