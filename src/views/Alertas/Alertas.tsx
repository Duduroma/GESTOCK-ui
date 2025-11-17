import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';

interface Alerta {
    id: string;
    severidade: 'critical' | 'medium' | 'high';
    produto: string;
    estoque: string;
    quantidadeAtual: number;
    rop: number;
    deficit: number;
    fornecedorSugerido: string;
    dataAlerta: string;
}

function Alertas(): React.ReactElement {
    const [alertas, setAlertas] = useState<Alerta[]>([
        {
            id: '1',
            severidade: 'critical',
            produto: 'Tinta Acrílica Branca',
            estoque: 'Estoque Filial Sul',
            quantidadeAtual: 0,
            rop: 850,
            deficit: -850,
            fornecedorSugerido: 'Fornecedor XYZ',
            dataAlerta: '18/10/2025'
        },
        {
            id: '2',
            severidade: 'high',
            produto: 'Parafuso M8',
            estoque: 'Estoque Central',
            quantidadeAtual: 450,
            rop: 1200,
            deficit: -750,
            fornecedorSugerido: 'Fornecedor ABC',
            dataAlerta: '19/10/2025'
        },
        {
            id: '3',
            severidade: 'medium',
            produto: 'Cabo Elétrico 4mm',
            estoque: 'Estoque Filial Norte',
            quantidadeAtual: 2100,
            rop: 2500,
            deficit: -400,
            fornecedorSugerido: 'Fornecedor DEF',
            dataAlerta: '20/10/2025'
        }
    ]);

    const handleGerarPedido = (alertaId: string) => {
        console.log('pedido gerado');
    };

    const alertasCriticos = alertas.filter(a => a.severidade === 'critical').length;
    const alertasAltos = alertas.filter(a => a.severidade === 'high').length;
    const alertasMedios = alertas.filter(a => a.severidade === 'medium').length;

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

            <Table headers={['Severidade', 'Produto', 'Estoque', 'Quantidade Atual', 'ROP', 'Déficit', 'Fornecedor Sugerido', 'Data do Alerta', 'Ações']}>
                {alertas.map((alerta) => (
                    <TableRow key={alerta.id}>
                        <TableCell>
                            <Badge variant={alerta.severidade === 'critical' ? 'critical' : 'medium'}>
                                {alerta.severidade === 'critical' ? 'Crítico' : 
                                 alerta.severidade === 'high' ? 'Alto' : 'Médio'}
                            </Badge>
                        </TableCell>
                        <TableCell>{alerta.produto}</TableCell>
                        <TableCell>{alerta.estoque}</TableCell>
                        <TableCell>
                            <span style={{
                                color: alerta.quantidadeAtual === 0 ? '#dc2626' : '#1f2937'
                            }}>
                                {alerta.quantidadeAtual}
                            </span>
                        </TableCell>
                        <TableCell>{alerta.rop}</TableCell>
                        <TableCell>
                            <span style={{
                                color: '#dc2626'
                            }}>
                                {alerta.deficit}
                            </span>
                        </TableCell>
                        <TableCell>{alerta.fornecedorSugerido}</TableCell>
                        <TableCell>{alerta.dataAlerta}</TableCell>
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

