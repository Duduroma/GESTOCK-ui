import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';
import { Pedido, PedidoId, StatusPedido, ItemPedido } from '../../types/entities';

const pedidosMockados: Pedido[] = [
    {
        id: '1',
        clienteId: '1',
        fornecedorId: '1',
        dataCriacao: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        dataPrevistaEntrega: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estoqueId: '1',
        itens: [
            {
                produtoId: '1',
                quantidade: 100,
                precoUnitario: 25.50,
                subtotal: 2550.00
            }
        ],
        status: StatusPedido.ENVIADO
    },
    {
        id: '2',
        clienteId: '1',
        fornecedorId: '2',
        dataCriacao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        dataPrevistaEntrega: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        estoqueId: '1',
        itens: [
            {
                produtoId: '2',
                quantidade: 50,
                precoUnitario: 45.00,
                subtotal: 2250.00
            },
            {
                produtoId: '3',
                quantidade: 30,
                precoUnitario: 12.75,
                subtotal: 382.50
            }
        ],
        status: StatusPedido.EM_TRANSPORTE
    },
    {
        id: '3',
        clienteId: '1',
        fornecedorId: '1',
        dataCriacao: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        dataPrevistaEntrega: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        estoqueId: '1',
        itens: [
            {
                produtoId: '4',
                quantidade: 200,
                precoUnitario: 8.90,
                subtotal: 1780.00
            }
        ],
        status: StatusPedido.RECEBIDO
    },
    {
        id: '4',
        clienteId: '1',
        fornecedorId: '3',
        dataCriacao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        dataPrevistaEntrega: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        estoqueId: '1',
        itens: [
            {
                produtoId: '5',
                quantidade: 75,
                precoUnitario: 32.00,
                subtotal: 2400.00
            }
        ],
        status: StatusPedido.CRIADO
    },
    {
        id: '5',
        clienteId: '1',
        fornecedorId: '2',
        dataCriacao: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        dataPrevistaEntrega: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        estoqueId: '1',
        itens: [
            {
                produtoId: '1',
                quantidade: 150,
                precoUnitario: 24.00,
                subtotal: 3600.00
            }
        ],
        status: StatusPedido.CANCELADO
    }
];

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarPedidos = async () => {
            setLoading(true);
            setError(null);
            
            console.log('🔄 [Pedidos] Carregando dados mockados...');
            console.log('📦 [Pedidos] Total de pedidos mockados:', pedidosMockados.length);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('✅ [Pedidos] Dados mockados carregados:', pedidosMockados);
            setPedidos([...pedidosMockados]);
            setLoading(false);
        };

        carregarPedidos();
    }, []);

    const handleConfirm = async (data: {
        clienteId: string;
        fornecedorId: string;
        estoqueId?: string;
        itens: ItemPedido[];
        dataPrevistaEntrega: string;
    }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (data.itens.length > 0) {
            const novoPedido: Pedido = {
                id: String(Date.now()),
                clienteId: data.clienteId,
                fornecedorId: data.fornecedorId,
                dataCriacao: new Date().toISOString(),
                dataPrevistaEntrega: data.dataPrevistaEntrega,
                estoqueId: data.estoqueId,
                itens: data.itens.map(item => ({
                    ...item,
                    subtotal: item.quantidade * item.precoUnitario
                })),
                status: StatusPedido.CRIADO
            };
            setPedidos(prev => [...prev, novoPedido]);
        }
    };

    const handleConfirmRecebimento = async (pedidoId: PedidoId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setPedidos(prev =>
            prev.map(p =>
                p.id === pedidoId
                    ? { ...p, status: StatusPedido.RECEBIDO }
                    : p
            )
        );
    };

    const handleCancelar = async (pedidoId: PedidoId) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setPedidos(prev =>
            prev.map(p =>
                p.id === pedidoId
                    ? { ...p, status: StatusPedido.CANCELADO }
                    : p
            )
        );
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Pedidos"
                subtitle="Crie e acompanhe pedidos de compra"
                actionButton={{
                    label: "Criar Pedido",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando pedidos...
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
                <Table headers={['ID', 'Itens', 'Fornecedor', 'Data Criação', 'Data Prevista', 'Status', 'Ações']}>
                    {pedidos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum pedido encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                        <TableCell>#{pedido.id}</TableCell>
                        <TableCell>
                            {pedido.itens.map((item, idx) => (
                                <div key={idx}>
                                    Produto {item.produtoId}: {item.quantidade.toLocaleString('pt-BR')} un. (R$ {item.precoUnitario.toFixed(2)})
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>Fornecedor {pedido.fornecedorId}</TableCell>
                        <TableCell>{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(pedido.dataPrevistaEntrega).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={
                                pedido.status === StatusPedido.RECEBIDO ? 'approved' : 
                                pedido.status === StatusPedido.CANCELADO ? 'expired' : 
                                'pending'
                            }>
                                {pedido.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Confirmar Recebimento"
                                    icon="✓"
                                    onClick={() => handleConfirmRecebimento(pedido.id)}
                                />
                                <ActionButton
                                    label="Cancelar"
                                    icon="✕"
                                    onClick={() => handleCancelar(pedido.id)}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                        ))
                    )}
                </Table>
            )}

            <InfoBox
                title="Ações Automáticas"
                items={[
                    'Ao criar pedido → Reserva de estoque é gerada automaticamente',
                    'Ao confirmar recebimento → Movimentação de entrada é registrada',
                    'Ao cancelar pedido → Reserva de estoque é liberada'
                ]}
                variant="yellow"
            />

            <CriarPedidoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Pedidos;

