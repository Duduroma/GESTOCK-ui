import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarEstoqueModal from '../../components/Modals/CadastrarEstoqueModal';
import useTablePage from '../../hooks/useTablePage';
import { Estoque } from '../../types/entities';
import { estoquesService } from '../../services/estoques';

function Estoques(): React.ReactElement {
    const navigate = useNavigate();
    const [estoques, setEstoques] = useState<Estoque[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarEstoques = async () => {
            try {
                console.log('🔄 Iniciando carregamento de estoques...');
                setLoading(true);
                setError(null);
                console.log('📡 Chamando estoquesService.listar()...');
                const response = await estoquesService.listar();
                console.log('✅ Resposta recebida da API:', response);
                console.log('📦 Tipo da resposta:', Array.isArray(response) ? 'Array' : 'Objeto');
                // Trata resposta paginada ou array direto
                const estoquesData = Array.isArray(response) ? response : (response.content || []);
                // Filtra valores null/undefined
                const estoquesValidos = estoquesData.filter(estoque => estoque != null && estoque.id != null);
                console.log('📋 Estoques processados:', estoquesValidos);
                console.log('🔢 Quantidade de estoques válidos:', estoquesValidos.length);
                setEstoques(estoquesValidos);
            } catch (err) {
                console.error('❌ Erro ao carregar estoques:', err);
                console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
                setError('Erro ao carregar estoques. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 Carregamento finalizado');
            }
        };

        carregarEstoques();
    }, []);
    
    const handleEditarEstoque = async (itemId: string) => {
        try {
            console.log('📖 Buscando estoque atualizado do backend:', itemId);
            console.log('📡 Chamando GET /estoques/' + itemId);
            const estoqueAtualizado = await estoquesService.buscarPorId(itemId);
            console.log('✅ Estoque carregado do backend:', estoqueAtualizado);
            
            if (!estoqueAtualizado || !estoqueAtualizado.id) {
                console.error('❌ Estoque retornado é inválido:', estoqueAtualizado);
                alert('Erro: Estoque não encontrado ou dados inválidos.');
                return;
            }
            
            setItemEditando(estoqueAtualizado);
            setIsModalOpen(true);
        } catch (err) {
            console.error('❌ Erro ao buscar estoque:', err);
            console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
            alert('Erro ao carregar dados do estoque. Tente novamente.');
        }
    };

    const recarregarEstoques = async () => {
        try {
            console.log('🔄 Recarregando lista de estoques do backend...');
            setLoading(true);
            const response = await estoquesService.listar();
            console.log('📥 Resposta completa do backend:', response);
            const estoquesData = Array.isArray(response) ? response : (response.content || []);
            console.log('📋 Estoques extraídos:', estoquesData);
            console.log('🔍 Verificando campo ativo de cada estoque:');
            estoquesData.forEach((estoque, index) => {
                console.log(`  Estoque ${index}: id=${estoque?.id}, ativo=${estoque?.ativo}, nome=${estoque?.nome}`);
            });
            // Filtra valores null/undefined
            const estoquesValidos = estoquesData.filter(estoque => estoque != null && estoque.id != null);
            console.log('✅ Lista recarregada:', estoquesValidos.length, 'estoques válidos');
            console.log('📊 Resumo de status:', {
                ativos: estoquesValidos.filter(e => e.ativo === true).length,
                inativos: estoquesValidos.filter(e => e.ativo === false).length,
                undefined: estoquesValidos.filter(e => e.ativo === undefined).length
            });
            setEstoques(estoquesValidos);
        } catch (err) {
            console.error('❌ Erro ao recarregar estoques:', err);
        } finally {
            setLoading(false);
        }
    };

    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleDeletar, handleView, setItemEditando, setIsModalOpen } = useTablePage<Estoque>({
        onView: () => navigate('/produtos'),
        onDelete: async (itemId: string) => {
            try {
                console.log('🗑️ Deletando estoque:', itemId);
                console.log('📡 Chamando DELETE /estoques/apagar/' + itemId);
                console.log('📋 Estado atual dos estoques ANTES de deletar:', estoques);
                await estoquesService.deletar(itemId);
                console.log('✅ Estoque deletado com sucesso no backend');
                console.log('🔄 Recarregando lista de estoques...');
                await recarregarEstoques();
                console.log('📋 Estado atual dos estoques DEPOIS de recarregar:', estoques);
            } catch (err) {
                console.error('❌ Erro ao deletar estoque:', err);
                console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
                alert('Erro ao deletar estoque. Tente novamente.');
            }
        }
    });

    const [busca, setBusca] = useState('');
    const [filtroCliente, setFiltroCliente] = useState<string>('');
    const [filtroStatus, setFiltroStatus] = useState<string>('');

    const clientes = [
        { id: '1', nome: 'Cliente 1' },
        { id: '2', nome: 'Cliente 2' },
        { id: '3', nome: 'Cliente 3' },
        { id: '4', nome: 'Cliente 4' }
    ];

    const estoquesFiltrados = useMemo(() => {
        console.log('🔍 Aplicando filtros:', { busca, filtroCliente, filtroStatus });
        const filtrados = estoques
            .filter(estoque => estoque != null && estoque.id != null)
            .filter(estoque => {
                const matchBusca = !busca || 
                    (estoque.nome && estoque.nome.toLowerCase().includes(busca.toLowerCase())) ||
                    (estoque.endereco && estoque.endereco.toLowerCase().includes(busca.toLowerCase()));
                const matchCliente = !filtroCliente || estoque.clienteId === filtroCliente;
                const matchStatus = !filtroStatus || 
                    (filtroStatus === 'ativo' && estoque.ativo) ||
                    (filtroStatus === 'inativo' && !estoque.ativo);
                
                const resultado = matchBusca && matchCliente && matchStatus;
                if (filtroCliente && resultado) {
                    console.log(`✅ Estoque ${estoque.id} passou no filtro de cliente ${filtroCliente}`);
                }
                return resultado;
            });
        console.log(`📊 Total de estoques filtrados: ${filtrados.length} de ${estoques.length}`);
        return filtrados;
    }, [estoques, busca, filtroCliente, filtroStatus]);

    const handleConfirm = async (data: {
        clienteId: string;
        nome: string;
        endereco: string;
        capacidade: number;
        ativo: boolean;
    }) => {
        try {
            if (estoqueEditando) {
                console.log('✏️ Editando estoque:', estoqueEditando.id);
                console.log('📡 Chamando PUT /estoques/' + estoqueEditando.id);
                console.log('📝 Dados para atualizar:', data);
                const estoqueAtualizado = await estoquesService.atualizar(estoqueEditando.id, {
                    nome: data.nome,
                    endereco: data.endereco,
                    capacidade: data.capacidade,
                    ativo: data.ativo
                });
                console.log('✅ Estoque atualizado com sucesso:', estoqueAtualizado);
                if (estoqueAtualizado && estoqueAtualizado.id) {
                    setEstoques(estoques
                        .filter(estoque => estoque != null && estoque.id != null)
                        .map(estoque => 
                            estoque.id === estoqueEditando.id ? estoqueAtualizado : estoque
                        ));
                }
                setItemEditando(null);
            } else {
                console.log('➕ Criando novo estoque...');
                console.log('📝 Dados para criar:', data);
                const novoEstoque = await estoquesService.criar({
                    clienteId: data.clienteId,
                    nome: data.nome,
                    endereco: data.endereco,
                    capacidade: data.capacidade,
                    ativo: data.ativo
                });
                console.log('✅ Estoque criado com sucesso:', novoEstoque);
                if (novoEstoque && novoEstoque.id) {
                    setEstoques([...estoques.filter(e => e != null && e.id != null), novoEstoque]);
                }
            }
        } catch (err) {
            console.error('❌ Erro ao salvar estoque:', err);
            console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
            alert('Erro ao salvar estoque. Tente novamente.');
        }
    };


    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Estoques"
                subtitle="Gerencie os estoques do sistema"
                actionButton={{
                    label: "Cadastrar Estoque",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                alignItems: 'flex-end'
            }}>
                <div style={{ minWidth: '200px', flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Buscar
                    </label>
                    <input
                        type="text"
                        placeholder="Nome ou endereço..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ minWidth: '200px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Cliente
                    </label>
                    <select
                        value={filtroCliente}
                        onChange={(e) => {
                            const clienteId = String(e.target.value);
                            console.log('🔽 Filtro de cliente alterado para:', clienteId);
                            setFiltroCliente(clienteId);
                        }}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Todos</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div style={{ minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Status
                    </label>
                    <select
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando estoques...
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
                <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']}>
                    {estoquesFiltrados.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum estoque encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        estoquesFiltrados
                            .filter(estoque => estoque != null && estoque.id != null)
                            .map((estoque) => (
                            <TableRow key={estoque.id}>
                                <TableCell>{estoque.nome || '-'}</TableCell>
                                <TableCell>{estoque.endereco || '-'}</TableCell>
                                <TableCell>{estoque.capacidade ? estoque.capacidade.toLocaleString('pt-BR') : '-'}</TableCell>
                                <TableCell>
                                    <Badge variant={estoque.ativo ? 'approved' : 'expired'}>
                                        {estoque.ativo ? 'Ativo' : 'Inativo'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        <ActionButton
                                            label="Visualizar Produtos"
                                            icon="👁️"
                                            onClick={handleView}
                                        />
                                        <IconButton
                                            icon="✏️"
                                            onClick={() => handleEditarEstoque(estoque.id)}
                                            ariaLabel="Editar estoque"
                                        />
                                        <IconButton
                                            icon="🗑️"
                                            onClick={() => handleDeletar(estoque.id)}
                                            ariaLabel="Deletar estoque"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </Table>
            )}

            <CadastrarEstoqueModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={estoqueEditando && estoqueEditando.id ? {
                    clienteId: estoqueEditando.clienteId || '',
                    nome: estoqueEditando.nome || '',
                    endereco: estoqueEditando.endereco || '',
                    capacidade: estoqueEditando.capacidade || 0,
                    ativo: estoqueEditando.ativo ?? true
                } : null}
            />
        </MainLayout>
    );
}

export default Estoques;

