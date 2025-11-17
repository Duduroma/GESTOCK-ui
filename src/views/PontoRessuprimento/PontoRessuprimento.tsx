import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';

interface PontoRessuprimento {
    id: string;
    produto: string;
    consumoMedioDiario: string;
    consumoMedioDiarioNumero: string;
    leadTime: string;
    estoqueSeguranca: string;
    ropCalculado: string;
    ropCalculadoFormula: string;
    saldoAtual: string;
    status: 'adequate' | 'below';
    consumoUltimos90Dias: string[];
}

function PontoRessuprimento(): React.ReactElement {
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const pontos: PontoRessuprimento[] = [
        {
            id: '1',
            produto: 'Parafuso M6',
            consumoMedioDiario: '150 unidades/dia',
            consumoMedioDiarioNumero: '150',
            leadTime: '7',
            estoqueSeguranca: '300',
            ropCalculado: '1350',
            ropCalculadoFormula: '(150 x 7) + 300',
            saldoAtual: '5000',
            status: 'adequate',
            consumoUltimos90Dias: ['4.500 unidades', '4.950 unidades', '4.050 unidades']
        },
        {
            id: '2',
            produto: 'Tinta Branca',
            consumoMedioDiario: '5 unidades/dia',
            consumoMedioDiarioNumero: '5',
            leadTime: '10',
            estoqueSeguranca: '20',
            ropCalculado: '70',
            ropCalculadoFormula: '(5 x 10) + 20',
            saldoAtual: '150',
            status: 'adequate',
            consumoUltimos90Dias: ['150 unidades', '165 unidades', '135 unidades']
        },
        {
            id: '3',
            produto: 'Cabo Elétrico',
            consumoMedioDiario: '80 unidades/dia',
            consumoMedioDiarioNumero: '80',
            leadTime: '7',
            estoqueSeguranca: '200',
            ropCalculado: '760',
            ropCalculadoFormula: '(80 x 7) + 200',
            saldoAtual: '0',
            status: 'below',
            consumoUltimos90Dias: ['2.400 unidades', '2.640 unidades', '2.160 unidades']
        }
    ];

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
                <Table headers={['Produto', 'Consumo Médio Diário', 'Lead Time (dias)', 'Estoque de Segurança', 'ROP Calculado', 'Saldo Atual', 'Status', 'Ações']}>
                    {pontos.map((ponto) => (
                        <>
                            <TableRow key={ponto.id}>
                                <TableCell>{ponto.produto}</TableCell>
                                <TableCell>{ponto.consumoMedioDiario}</TableCell>
                                <TableCell>{ponto.leadTime}</TableCell>
                                <TableCell>{ponto.estoqueSeguranca}</TableCell>
                                <TableCell>
                                    <div>
                                        <div>{ponto.ropCalculado}</div>
                                        {expandedRow === ponto.id && (
                                            <div style={{
                                                fontSize: '12px',
                                                color: '#6b7280',
                                                marginTop: '4px'
                                            }}>
                                                {ponto.ropCalculadoFormula}
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>{ponto.saldoAtual}</TableCell>
                                <TableCell>
                                    <Badge variant={ponto.status}>
                                        {ponto.status === 'adequate' ? 'Adequado' : 'Abaixo do ROP'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <ActionButton
                                        label="Ver Histórico de Consumo"
                                        icon="📊"
                                        onClick={() => setExpandedRow(expandedRow === ponto.id ? null : ponto.id)}
                                    />
                                </TableCell>
                            </TableRow>
                            {expandedRow === ponto.id && (
                                <TableRow>
                                    <TableCell colSpan={8} style={{
                                        backgroundColor: '#f9fafb',
                                        padding: '24px'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            gap: '32px'
                                        }}>
                                            <div>
                                                <div style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#374151',
                                                    marginBottom: '12px'
                                                }}>
                                                    Consumo (Últimos 90 dias)
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '8px'
                                                }}>
                                                    {ponto.consumoUltimos90Dias.map((consumo, index) => (
                                                        <div key={index} style={{
                                                            fontSize: '14px',
                                                            color: '#6b7280'
                                                        }}>
                                                            {consumo}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{
                                                textAlign: 'right'
                                            }}>
                                                <div style={{
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#374151',
                                                    marginBottom: '4px'
                                                }}>
                                                    Consumo Médio Diário
                                                </div>
                                                <div style={{
                                                    fontSize: '14px',
                                                    color: '#1f2937'
                                                }}>
                                                    {ponto.consumoMedioDiarioNumero} unidades/dia
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    ))}
                </Table>
            </div>
        </MainLayout>
    );
}

export default PontoRessuprimento;

