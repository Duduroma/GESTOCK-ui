import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';
import NovaTransferenciaModal from '../../components/Modals/NovaTransferenciaModal';

function Transferencias(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

            <Table headers={['Data', 'Produto', 'Quantidade', 'Origem', 'Destino', 'Responsável', 'Status']} children={undefined}>
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

