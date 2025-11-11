import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';

function Estoques(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Estoques"
                subtitle="Gerencie os estoques do sistema"
                actionButton={{
                    label: "Cadastrar Estoque",
                    onClick: () => console.log('Cadastrar estoque'),
                    icon: '+'
                }}
            />

            <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']} children={undefined}>
            </Table>
        </MainLayout>
    );
}

export default Estoques;

