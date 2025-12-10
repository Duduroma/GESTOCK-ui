import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';
import { Alerta, AlertaId, ProdutoId, EstoqueId, FornecedorId } from '../../types/entities';
import { mockAlertas } from '../../utils/mocks';

function Alertas(): React.ReactElement {
    const [alertas, setAlertas] = useState<Alerta[]>(mockAlertas);

    const handleGerarPedido = (alertaId: AlertaId) => {
        console.log('pedido gerado');
    };

    const alertasAtivos = alertas.filter(a => a.ativo);
    const alertasCriticos = alertasAtivos.length;
    const alertasAltos = 0;
    const alertasMedios = 0;

    return (
        <MainLayout>
            <PageHeader
                title="Alertas de Estoque Baixo"
                subtitle="Monitore produtos abaixo do ponto de ressuprimento"
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Crítico"
                    value={`${alertasCriticos} produtos`}
                    variant="red"
                />
                <SummaryCard
                    title="Alto"
                    value={`${alertasAltos} produtos`}
                    variant="yellow"
                />
                <SummaryCard
                    title="Médio"
                    value={`${alertasMedios} produtos`}
                    variant="blue"
                />
            </div>

            <Table headers={['Produto', 'Estoque', 'Fornecedor Sugerido', 'Data do Alerta', 'Ações']}>
                {alertasAtivos.map((alerta) => (
                    <TableRow key={alerta.id}>
                        <TableCell>Produto {alerta.produtoId}</TableCell>
                        <TableCell>Estoque {alerta.estoqueId}</TableCell>
                        <TableCell>{alerta.fornecedorSugerido ? `Fornecedor ${alerta.fornecedorSugerido}` : 'N/A'}</TableCell>
                        <TableCell>{new Date(alerta.dataGeracao).toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                            <button
                                onClick={() => handleGerarPedido(alerta.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '8px 12px',
                                    backgroundColor: '#2563eb',
                                    border: '1px solid #2563eb',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: 'white',
                                    transition: 'all 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#1d4ed8';
                                    e.currentTarget.style.borderColor = '#1d4ed8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2563eb';
                                    e.currentTarget.style.borderColor = '#2563eb';
                                }}
                            >
                                <span style={{ fontSize: '16px' }}>🛒</span>
                                Gerar Pedido
                            </button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <InfoBox
                title="Funcionamento dos Alertas"
                items={[
                    'Alerta gerado automaticamente quando produto fica abaixo do ROP',
                    'Fornecedor sugerido com base na melhor cotação ativa',
                    'Alerta removido automaticamente após recebimento do pedido'
                ]}
                variant="blue"
            />
        </MainLayout>
    );
}

export default Alertas;

