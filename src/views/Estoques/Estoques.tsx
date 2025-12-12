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
                console.log('📋 Estoques processados:', estoquesData);
                console.log('🔢 Quantidade de estoques:', estoquesData.length);
                setEstoques(estoquesData);
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
    
    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Estoque>({
        onView: () => navigate('/produtos'),
        onDelete: async (itemId: string) => {
            try {
                console.log('🗑️ Deletando estoque:', itemId);
                await estoquesService.deletar(itemId);
                console.log('✅ Estoque deletado com sucesso');
                setEstoques(estoques.filter(estoque => estoque.id !== itemId));
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

    const estoquesFiltrados = useMemo(() => {
        return estoques.filter(estoque => {
            const matchBusca = !busca || 
                estoque.nome.toLowerCase().includes(busca.toLowerCase()) ||
                estoque.endereco.toLowerCase().includes(busca.toLowerCase());
            const matchCliente = !filtroCliente || estoque.clienteId === filtroCliente;
            const matchStatus = !filtroStatus || 
                (filtroStatus === 'ativo' && estoque.ativo) ||
                (filtroStatus === 'inativo' && !estoque.ativo);
            return matchBusca && matchCliente && matchStatus;
        });
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
                console.log('📝 Dados para atualizar:', data);
                const estoqueAtualizado = await estoquesService.atualizar(estoqueEditando.id, {
                    nome: data.nome,
                    endereco: data.endereco,
                    capacidade: data.capacidade,
                    ativo: data.ativo
                });
                console.log('✅ Estoque atualizado com sucesso:', estoqueAtualizado);
                setEstoques(estoques.map(estoque => 
                    estoque.id === estoqueEditando.id ? estoqueAtualizado : estoque
                ));
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
                setEstoques([...estoques, novoEstoque]);
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
                        onChange={(e) => setFiltroCliente(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="1">Cliente 1</option>
                        <option value="2">Cliente 2</option>
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
                        estoquesFiltrados.map((estoque) => (
                            <TableRow key={estoque.id}>
                                <TableCell>{estoque.nome}</TableCell>
                                <TableCell>{estoque.endereco}</TableCell>
                                <TableCell>{estoque.capacidade.toLocaleString('pt-BR')}</TableCell>
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
                                            onClick={() => handleEditar(estoque.id, estoques)}
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
                initialData={estoqueEditando ? {
                    clienteId: estoqueEditando.clienteId,
                    nome: estoqueEditando.nome,
                    endereco: estoqueEditando.endereco,
                    capacidade: estoqueEditando.capacidade,
                    ativo: estoqueEditando.ativo
                } : null}
            />
        </MainLayout>
    );
}

export default Estoques;

