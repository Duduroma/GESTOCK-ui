import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';
import { Pedido, PedidoId, StatusPedido, ItemPedido } from '../../types/entities';
import { mockPedidos } from '../../utils/mocks';

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidos, setPedidos] = useState<Pedido[]>(mockPedidos);

    const handleConfirm = (data: {
        clienteId: string;
        fornecedorId: string;
        estoqueId?: string;
        itens: ItemPedido[];
        dataPrevistaEntrega: string;
    }) => {
        console.log('Criar pedido:', data);
    };

    const handleConfirmRecebimento = (pedidoId: PedidoId) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: StatusPedido.RECEBIDO }
                : pedido
        ));
    };

    const handleCancelar = (pedidoId: PedidoId) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: StatusPedido.CANCELADO }
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

            <Table headers={['ID', 'Itens', 'Fornecedor', 'Data Criação', 'Data Prevista', 'Status', 'Ações']}>
                {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                        <TableCell>#{pedido.id}</TableCell>
                        <TableCell>
                            {pedido.itens.map((item, idx) => (
                                <div key={idx}>
                                    Produto {item.produtoId}: {item.quantidade.toLocaleString('pt-BR')} un. (R$ {item.precoUnitario.toFixed(2)})
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>Fornecedor {pedido.fornecedorId}</TableCell>
                        <TableCell>{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(pedido.dataPrevistaEntrega).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={
                                pedido.status === StatusPedido.RECEBIDO ? 'approved' : 
                                pedido.status === StatusPedido.CANCELADO ? 'expired' : 
                                'pending'
                            }>
                                {pedido.status}
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
                                />
                                <ActionButton
                                    label="Cancelar"
                                    icon="✕"
                                    onClick={() => handleCancelar(pedido.id)}
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

