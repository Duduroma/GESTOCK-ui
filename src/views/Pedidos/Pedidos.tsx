import { useState, useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';
import { Pedido, PedidoId, StatusPedido, ItemPedido } from '../../types/entities';
import { pedidosService } from '../../services/pedidos';

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarPedidos = async () => {
            try {
                console.log('🔄 [Pedidos] Iniciando carregamento de pedidos...');
                setLoading(true);
                setError(null);
                console.log('📡 [Pedidos] Chamando GET /api/pedidos');
                const response = await pedidosService.listar();
                console.log('✅ [Pedidos] Resposta recebida:', response);
                const pedidosData = Array.isArray(response) ? response : (response.content || []);
                console.log('📦 [Pedidos] Pedidos processados:', pedidosData.length, 'itens');
                setPedidos(pedidosData);
            } catch (err) {
                console.error('❌ [Pedidos] Erro ao carregar pedidos:', err);
                setError('Erro ao carregar pedidos. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 [Pedidos] Carregamento finalizado');
            }
        };

        carregarPedidos();
    }, []);

    const recarregarPedidos = async () => {
        try {
            console.log('🔄 [Pedidos] Recarregando lista de pedidos...');
            setLoading(true);
            console.log('📡 [Pedidos] Chamando GET /api/pedidos');
            const response = await pedidosService.listar();
            console.log('✅ [Pedidos] Resposta recebida:', response);
            const pedidosData = Array.isArray(response) ? response : (response.content || []);
            console.log('📦 [Pedidos] Pedidos recarregados:', pedidosData.length, 'itens');
            setPedidos(pedidosData);
        } catch (err) {
            console.error('❌ [Pedidos] Erro ao recarregar pedidos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (data: {
        clienteId: string;
        fornecedorId: string;
        estoqueId?: string;
        itens: ItemPedido[];
        dataPrevistaEntrega: string;
    }) => {
        try {
            // O backend espera: clienteId, fornecedorId, produtoId, quantidade, estoqueId (opcional)
            // Por enquanto, vamos criar com o primeiro item
            if (data.itens.length > 0) {
                const primeiroItem = data.itens[0];
                console.log('➕ [Pedidos] Criando novo pedido...');
                console.log('📡 [Pedidos] Chamando POST /api/pedidos');
                console.log('📝 [Pedidos] Dados para criar:', {
                    clienteId: data.clienteId,
                    fornecedorId: data.fornecedorId,
                    produtoId: primeiroItem.produtoId,
                    quantidade: primeiroItem.quantidade,
                    estoqueId: data.estoqueId
                });
                await pedidosService.criar({
                    clienteId: data.clienteId,
                    fornecedorId: data.fornecedorId,
                    produtoId: primeiroItem.produtoId,
                    quantidade: primeiroItem.quantidade,
                    estoqueId: data.estoqueId
                });
                console.log('✅ [Pedidos] Pedido criado com sucesso');
                await recarregarPedidos();
            }
        } catch (err) {
            console.error('❌ [Pedidos] Erro ao criar pedido:', err);
            alert('Erro ao criar pedido. Tente novamente.');
        }
    };

    const handleConfirmRecebimento = async (pedidoId: PedidoId) => {
        try {
            // Por enquanto, vamos usar valores padrão. Em produção, isso viria de um modal ou formulário
            const estoqueId = '1'; // TODO: obter do pedido ou de um formulário
            const responsavel = 'Sistema';
            console.log('✓ [Pedidos] Confirmando recebimento do pedido:', pedidoId);
            console.log('📡 [Pedidos] Chamando POST /api/pedidos/' + pedidoId + '/receber');
            console.log('📝 [Pedidos] Dados:', { estoqueId, responsavel });
            await pedidosService.confirmarRecebimento(pedidoId, { estoqueId, responsavel });
            console.log('✅ [Pedidos] Recebimento confirmado com sucesso');
            await recarregarPedidos();
        } catch (err) {
            console.error('❌ [Pedidos] Erro ao confirmar recebimento:', err);
            alert('Erro ao confirmar recebimento. Tente novamente.');
        }
    };

    const handleCancelar = async (pedidoId: PedidoId) => {
        try {
            console.log('✕ [Pedidos] Cancelando pedido:', pedidoId);
            console.log('📡 [Pedidos] Chamando POST /api/pedidos/' + pedidoId + '/cancelar');
            await pedidosService.cancelar(pedidoId);
            console.log('✅ [Pedidos] Pedido cancelado com sucesso');
            await recarregarPedidos();
        } catch (err) {
            console.error('❌ [Pedidos] Erro ao cancelar pedido:', err);
            alert('Erro ao cancelar pedido. Tente novamente.');
        }
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

