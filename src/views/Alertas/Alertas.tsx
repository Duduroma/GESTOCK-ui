import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import InfoBox from '../../components/InfoBox';
import Badge from '../../components/Badge';
import { Alerta, AlertaId } from '../../types/entities';

// NOTA: Este componente está usando dados mockados e não faz chamadas ao backend

const produtosMock = [
    { id: '1', nome: 'Arroz Tipo 1 - 5kg' },
    { id: '2', nome: 'Feijão Carioca - 1kg' },
    { id: '3', nome: 'Açúcar Cristal - 1kg' },
    { id: '4', nome: 'Óleo de Soja - 900ml' },
    { id: '5', nome: 'Macarrão Espaguete - 500g' },
    { id: '6', nome: 'Leite Integral - 1L' },
    { id: '7', nome: 'Café Torrado - 500g' }
];

const estoquesMock = [
    { id: '1', nome: 'Estoque Central' },
    { id: '2', nome: 'Estoque Norte' },
    { id: '3', nome: 'Estoque Sul' }
];

const fornecedoresMock = [
    { id: '1', nome: 'Distribuidora ABC' },
    { id: '2', nome: 'Atacadão XYZ' },
    { id: '3', nome: 'Mercado Atacado' }
];

// Dados mockados - 5 alertas falsos para exibição
const alertasMockados: (Alerta & { produtoNome?: string; estoqueNome?: string; fornecedorNome?: string; nivel?: 'critico' | 'alto' | 'medio' })[] = [
    {
        id: '1',
        produtoId: '1',
        estoqueId: '1',
        dataGeracao: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        fornecedorSugerido: '1',
        ativo: true,
        produtoNome: produtosMock[0].nome,
        estoqueNome: estoquesMock[0].nome,
        fornecedorNome: fornecedoresMock[0].nome,
        nivel: 'critico'
    },
    {
        id: '2',
        produtoId: '2',
        estoqueId: '1',
        dataGeracao: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        fornecedorSugerido: '2',
        ativo: true,
        produtoNome: produtosMock[1].nome,
        estoqueNome: estoquesMock[0].nome,
        fornecedorNome: fornecedoresMock[1].nome,
        nivel: 'critico'
    },
    {
        id: '3',
        produtoId: '3',
        estoqueId: '2',
        dataGeracao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        fornecedorSugerido: '1',
        ativo: true,
        produtoNome: produtosMock[2].nome,
        estoqueNome: estoquesMock[1].nome,
        fornecedorNome: fornecedoresMock[0].nome,
        nivel: 'alto'
    },
    {
        id: '4',
        produtoId: '4',
        estoqueId: '1',
        dataGeracao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        fornecedorSugerido: '3',
        ativo: true,
        produtoNome: produtosMock[3].nome,
        estoqueNome: estoquesMock[0].nome,
        fornecedorNome: fornecedoresMock[2].nome,
        nivel: 'alto'
    },
    {
        id: '5',
        produtoId: '5',
        estoqueId: '3',
        dataGeracao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        fornecedorSugerido: '2',
        ativo: true,
        produtoNome: produtosMock[4].nome,
        estoqueNome: estoquesMock[2].nome,
        fornecedorNome: fornecedoresMock[1].nome,
        nivel: 'medio'
    }
];

type AlertaCompleto = Alerta & { 
    produtoNome?: string; 
    estoqueNome?: string; 
    fornecedorNome?: string; 
    nivel?: 'critico' | 'alto' | 'medio' 
};

function Alertas(): React.ReactElement {
    const [alertas, setAlertas] = useState<AlertaCompleto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carrega apenas dados mockados - SEM chamadas ao backend
        setLoading(true);
        
        // Simula um pequeno delay
        const timer = setTimeout(() => {
            setAlertas([...alertasMockados]);
            setLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    const handleGerarPedido = async (alertaId: AlertaId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setAlertas(prev =>
            prev.map(a =>
                a.id === alertaId
                    ? { ...a, ativo: false }
                    : a
            )
        );
    };

    const alertasAtivos = alertas.filter(a => a.ativo);
    const alertasCriticos = alertasAtivos.filter(a => a.nivel === 'critico').length;
    const alertasAltos = alertasAtivos.filter(a => a.nivel === 'alto').length;
    const alertasMedios = alertasAtivos.filter(a => a.nivel === 'medio').length;

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

            {/* Mensagem de erro removida - usando apenas dados mockados */}

            {!loading && (
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
                        <TableCell>
                            <div>
                                <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                                    {alerta.produtoNome || `Produto ${alerta.produtoId}`}
                                </div>
                                {alerta.nivel && (
                                    <Badge 
                                        variant={alerta.nivel === 'critico' ? 'critical' : alerta.nivel === 'alto' ? 'pending' : 'medium'}
                                    >
                                        {alerta.nivel === 'critico' ? 'Crítico' : alerta.nivel === 'alto' ? 'Alto' : 'Médio'}
                                    </Badge>
                                )}
                            </div>
                        </TableCell>
                        <TableCell>{alerta.estoqueNome || `Estoque ${alerta.estoqueId}`}</TableCell>
                        <TableCell>{alerta.fornecedorNome || (alerta.fornecedorSugerido ? `Fornecedor ${alerta.fornecedorSugerido}` : 'N/A')}</TableCell>
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

