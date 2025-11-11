import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = (data: {
        produto: string;
        fornecedor: string;
        quantidade: string;
        leadTime: string;
        dataPrevista: string;
    }) => {
        console.log('Criar pedido:', data);
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

            <Table headers={['ID', 'Produto', 'Fornecedor', 'Quantidade', 'Data Prevista', 'Status', 'Ações']} children={undefined}>
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

