import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';

function Fornecedores(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Fornecedores"
                subtitle="Gerencie os fornecedores e suas cotações"
                actionButton={{
                    label: "Cadastrar Fornecedor",
                    onClick: () => console.log('Cadastrar fornecedor'),
                    icon: '+'
                }}
            />

            <Table headers={['Nome', 'Lead Time (dias)', 'Contato', 'Produtos Associados', 'Status', 'Ações']} children={undefined}>
            </Table>
        </MainLayout>
    );
}

export default Fornecedores;

