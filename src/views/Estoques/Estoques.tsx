import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarEstoqueModal from '../../components/Modals/CadastrarEstoqueModal';
import useTablePage from '../../hooks/useTablePage';

interface Estoque {
    id: string;
    nome: string;
    endereco: string;
    capacidade: string;
    status: 'active' | 'inactive';
}

function Estoques(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Estoque>({
        onView: () => navigate('/produtos')
    });

    const [estoques, setEstoques] = useState<Estoque[]>([
        {
            id: '1',
            nome: 'Estoque Central',
            endereco: 'Rua A, 100 - São Paulo',
            capacidade: '10.000',
            status: 'active'
        },
        {
            id: '2',
            nome: 'Estoque Filial Norte',
            endereco: 'Av. B, 200 - Guarulhos',
            capacidade: '5.000',
            status: 'active'
        },
        {
            id: '3',
            nome: 'Estoque Temporário',
            endereco: 'Rua C, 300 - Osasco',
            capacidade: '2.000',
            status: 'inactive'
        }
    ]);

    const handleConfirm = (data: {
        nome: string;
        endereco: string;
        capacidade: string;
        status: string;
    }) => {
        if (estoqueEditando) {
            setEstoques(estoques.map(estoque => 
                estoque.id === estoqueEditando.id
                    ? { ...estoque, ...data, status: data.status === 'Ativo' ? 'active' : 'inactive' }
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

            <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']}>
                {estoques.map((estoque) => (
                    <TableRow key={estoque.id}>
                        <TableCell>{estoque.nome}</TableCell>
                        <TableCell>{estoque.endereco}</TableCell>
                        <TableCell>{estoque.capacidade}</TableCell>
                        <TableCell>
                            <Badge variant={estoque.status}>
                                {estoque.status === 'active' ? 'Ativo' : 'Inativo'}
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
                    nome: estoqueEditando.nome,
                    endereco: estoqueEditando.endereco,
                    capacidade: estoqueEditando.capacidade,
                    status: estoqueEditando.status === 'active' ? 'Ativo' : 'Inativo'
                } : null}
            />
        </MainLayout>
    );
}

export default Estoques;

