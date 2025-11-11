import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Card from '../../components/Card';

function PontoRessuprimento(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Ponto de Ressuprimento (ROP)"
                subtitle="Calcule e monitore o ponto de ressuprimento dos produtos"
            />

            <Card title="Fórmula de Cálculo" subtitle="Entenda como o ROP é calculado">
                <div style={{
                    backgroundColor: '#dbeafe',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e40af',
                        marginBottom: '8px'
                    }}>
                        ROP = (Consumo Médio Diário x Lead Time) + Estoque de Segurança
                    </div>
                </div>
                <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                }}>
                    O consumo médio diário é calculado com base no histórico dos últimos 90 dias
                </p>
            </Card>

            <div style={{ marginTop: '32px' }}>
                <Table headers={['Produto', 'Consumo Médio Diário', 'Lead Time (dias)', 'Estoque de Segurança', 'ROP Calculado', 'Saldo Atual', 'Status']} children={undefined}>
                </Table>
            </div>
        </MainLayout>
    );
}

export default PontoRessuprimento;

