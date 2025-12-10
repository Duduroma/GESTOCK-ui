import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import Card from '../../components/Card';
import { Estoque, ROP, ProdutoId } from '../../types/entities';
import { mockEstoques } from '../../utils/mocks';

function PontoRessuprimento(): React.ReactElement {
    const [expandedRow, setExpandedRow] = useState<ProdutoId | null>(null);

    const estoques: Estoque[] = mockEstoques.filter(e => e.ativo && e.rops && Object.keys(e.rops).length > 0);

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
                <Table headers={['Estoque', 'Produto', 'Consumo Médio Diário', 'Lead Time (dias)', 'Estoque de Segurança', 'ROP Calculado', 'Saldo Atual', 'Status', 'Ações']}>
                    {estoques.map((estoque) => {
                        if (!estoque.rops) return null;
                        return Object.entries(estoque.rops).map(([produtoId, rop]) => {
                            const saldo = estoque.saldos?.[produtoId] || { fisico: 0, reservado: 0, disponivel: 0 };
                            const status = saldo.fisico < rop.valorROP ? 'below' : 'adequate';
                            const formula = `(${rop.consumoMedio} x ${rop.leadTimeDias}) + ${rop.estoqueSeguranca}`;
                            return (
                                <>
                                    <TableRow key={`${estoque.id}-${produtoId}`}>
                                        <TableCell>{estoque.nome}</TableCell>
                                        <TableCell>Produto {produtoId}</TableCell>
                                        <TableCell>{rop.consumoMedio.toFixed(2)} unidades/dia</TableCell>
                                        <TableCell>{rop.leadTimeDias}</TableCell>
                                        <TableCell>{rop.estoqueSeguranca}</TableCell>
                                        <TableCell>
                                            <div>
                                                <div>{rop.valorROP}</div>
                                                {expandedRow === produtoId && (
                                                    <div style={{
                                                        fontSize: '12px',
                                                        color: '#6b7280',
                                                        marginTop: '4px'
                                                    }}>
                                                        {formula}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{saldo.fisico.toLocaleString('pt-BR')}</TableCell>
                                        <TableCell>
                                            <Badge variant={status}>
                                                {status === 'adequate' ? 'Adequado' : 'Abaixo do ROP'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <ActionButton
                                                label="Ver Histórico de Consumo"
                                                icon="📊"
                                                onClick={() => setExpandedRow(expandedRow === produtoId ? null : produtoId)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    {expandedRow === produtoId && (
                                        <TableRow>
                                            <TableCell colSpan={9} style={{
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
                                                            Informações do ROP
                                                        </div>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '8px'
                                                        }}>
                                                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                                                Consumo Médio: {rop.consumoMedio.toFixed(2)} unidades/dia
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                                                Lead Time: {rop.leadTimeDias} dias
                                                            </div>
                                                            <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                                                Estoque de Segurança: {rop.estoqueSeguranca}
                                                            </div>
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
                                                            Fórmula ROP
                                                        </div>
                                                        <div style={{
                                                            fontSize: '14px',
                                                            color: '#1f2937'
                                                        }}>
                                                            {formula} = {rop.valorROP}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
                            );
                        });
                    })}
                </Table>
            </div>
        </MainLayout>
    );
}

export default PontoRessuprimento;

