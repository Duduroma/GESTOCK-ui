import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';

function Produtos(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Produtos"
                subtitle="Gerencie os produtos cadastrados no sistema"
                actionButton={{
                    label: "Cadastrar Produto",
                    onClick: () => console.log('Cadastrar produto'),
                    icon: '+'
                }}
            />

            <Table headers={['Código', 'Nome', 'Descrição', 'Saldo', 'Estoque', 'Status', 'Fornecedor']} children={undefined}>
            </Table>
        </MainLayout>
    );
}

export default Produtos;

