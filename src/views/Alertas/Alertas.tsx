import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';
import { Alerta, AlertaId, ProdutoId, EstoqueId, FornecedorId } from '../../types/entities';
import { alertasService } from '../../services/alertas';

function Alertas(): React.ReactElement {
    const [alertas, setAlertas] = useState<Alerta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarAlertas = async () => {
            try {
                console.log('🔄 [Alertas] Iniciando carregamento de alertas...');
                setLoading(true);
                setError(null);
                console.log('📡 [Alertas] Chamando GET /api/alertas/ativos');
                const response = await alertasService.listarAtivos();
                console.log('✅ [Alertas] Resposta recebida:', response);
                const alertasData = Array.isArray(response) ? response : [];
                console.log('📦 [Alertas] Alertas processados:', alertasData.length, 'itens');
                setAlertas(alertasData);
            } catch (err) {
                console.error('❌ [Alertas] Erro ao carregar alertas:', err);
                setError('Erro ao carregar alertas. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 [Alertas] Carregamento finalizado');
            }
        };

        carregarAlertas();
    }, []);

    const handleGerarPedido = async (alertaId: AlertaId) => {
        try {
            console.log('🛒 [Alertas] Gerando pedido para alerta:', alertaId);
            console.log('📡 [Alertas] Chamando POST /api/alertas/' + alertaId + '/gerar-pedido');
            await alertasService.gerarPedido(alertaId);
            console.log('✅ [Alertas] Pedido gerado com sucesso');
            // Recarregar alertas após gerar pedido
            console.log('🔄 [Alertas] Recarregando lista de alertas...');
            const response = await alertasService.listarAtivos();
            console.log('✅ [Alertas] Alertas recarregados:', response.length, 'itens');
            const alertasData = Array.isArray(response) ? response : [];
            setAlertas(alertasData);
        } catch (err) {
            console.error('❌ [Alertas] Erro ao gerar pedido:', err);
            alert('Erro ao gerar pedido. Tente novamente.');
        }
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

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando alertas...
                </div>
            )}

            {error && (
                <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#fee2e2', 
                    border: '1px solid #fca5a5', 
                    borderRadius: '6px', 
                    color: '#991b1b',
                    marginBottom: '24px'
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && (
            <Table headers={['Produto', 'Estoque', 'Fornecedor Sugerido', 'Data do Alerta', 'Ações']}>
                    {alertasAtivos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum alerta ativo encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        alertasAtivos.map((alerta) => (
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
                        ))
                    )}
            </Table>
            )}

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

