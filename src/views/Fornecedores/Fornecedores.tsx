import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import CadastrarFornecedorModal from '../../components/Modals/CadastrarFornecedorModal';

function Fornecedores(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = (data: {
        nome: string;
        contato: string;
        leadTime: string;
    }) => {
        console.log('Cadastrar fornecedor:', data);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Fornecedores"
                subtitle="Gerencie os fornecedores e suas cotações"
                actionButton={{
                    label: "Cadastrar Fornecedor",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['Nome', 'Lead Time (dias)', 'Contato', 'Produtos Associados', 'Status', 'Ações']} children={undefined}>
            </Table>

            <CadastrarFornecedorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Fornecedores;

