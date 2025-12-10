import { useState, useMemo } from 'react';
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
import Input from '../../components/Input';
import { mockEstoques } from '../../utils/mocks';

function Estoques(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Estoque>({
        onView: () => navigate('/produtos')
    });

    const [estoques, setEstoques] = useState<Estoque[]>(mockEstoques);

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

    const handleConfirm = (data: {
        clienteId: string;
        nome: string;
        endereco: string;
        capacidade: number;
        ativo: boolean;
    }) => {
        if (estoqueEditando) {
            setEstoques(estoques.map(estoque => 
                estoque.id === estoqueEditando.id
                    ? { 
                        ...estoque, 
                        clienteId: data.clienteId,
                        nome: data.nome,
                        endereco: data.endereco,
                        capacidade: data.capacidade,
                        ativo: data.ativo
                    }
                    : estoque
            ));
            setItemEditando(null);
            console.log('Estoque editado:', data);
        } else {
            console.log('Cadastrar estoque:', data);
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
                flexWrap: 'wrap'
            }}>
                <Input
                    label="Buscar"
                    type="text"
                    placeholder="Nome ou endereço..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
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

            <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']}>
                {estoquesFiltrados.map((estoque) => (
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
                ))}
            </Table>

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

