import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';

function Cotacoes(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Cotações"
                subtitle="Visualize e aprove cotações de produtos"
            />

            <InfoBox
                title="Critérios de Seleção Automática"
                items={[
                    'Prioridade 1: Menor preço entre fornecedores ativos',
                    'Prioridade 2: Em caso de empate no preço, menor Lead Time',
                    'Cotações expiradas não são consideradas'
                ]}
                variant="blue"
            />

            <Table headers={['Produto', 'Fornecedor', 'Preço', 'Lead Time', 'Validade', 'Status', 'Ação']} children={undefined}>
            </Table>
        </MainLayout>
    );
}

export default Cotacoes;

