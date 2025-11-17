import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarFornecedorModal from '../../components/Modals/CadastrarFornecedorModal';
import useTablePage from '../../hooks/useTablePage';

interface Fornecedor {
    id: string;
    nome: string;
    contato: string;
    leadTime: string;
    produtosAssociados: number;
    status: 'active' | 'inactive';
}

function Fornecedores(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: fornecedorEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Fornecedor>({
        onView: () => navigate('/cotacoes')
    });

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([
        {
            id: '1',
            nome: 'Fornecedor ABC',
            contato: '(11) 99999-9999',
            leadTime: '7',
            produtosAssociados: 15,
            status: 'active'
        },
        {
            id: '2',
            nome: 'Fornecedor XYZ',
            contato: '(11) 88888-8888',
            leadTime: '14',
            produtosAssociados: 8,
            status: 'active'
        },
        {
            id: '3',
            nome: 'Fornecedor Temporário',
            contato: '(11) 77777-7777',
            leadTime: '5',
            produtosAssociados: 3,
            status: 'inactive'
        }
    ]);

    const handleConfirm = (data: {
        nome: string;
        contato: string;
        leadTime: string;
    }) => {
        if (fornecedorEditando) {
            setFornecedores(fornecedores.map(fornecedor => 
                fornecedor.id === fornecedorEditando.id
                    ? { ...fornecedor, ...data }
                    : fornecedor
            ));
            setItemEditando(null);
            console.log('Fornecedor editado:', data);
        } else {
            console.log('Cadastrar fornecedor:', data);
        }
    };


    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Fornecedores"
                subtitle="Gerencie os fornecedores e suas cotações"
                actionButton={{
                    label: "Cadastrar Fornecedor",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            <Table headers={['Nome', 'Lead Time (dias)', 'Contato', 'Produtos Associados', 'Status', 'Ações']}>
                {fornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                        <TableCell>{fornecedor.nome}</TableCell>
                        <TableCell>{fornecedor.leadTime}</TableCell>
                        <TableCell>{fornecedor.contato}</TableCell>
                        <TableCell>{fornecedor.produtosAssociados}</TableCell>
                        <TableCell>
                            <Badge variant={fornecedor.status}>
                                {fornecedor.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Ver Cotações"
                                    icon="$"
                                    onClick={handleView}
                                />
                                <IconButton
                                    icon="✏️"
                                    onClick={() => handleEditar(fornecedor.id, fornecedores)}
                                    ariaLabel="Editar fornecedor"
                                />
                                <IconButton
                                    icon="🗑️"
                                    onClick={() => handleDeletar(fornecedor.id)}
                                    ariaLabel="Deletar fornecedor"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <CadastrarFornecedorModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={fornecedorEditando ? {
                    nome: fornecedorEditando.nome,
                    contato: fornecedorEditando.contato,
                    leadTime: fornecedorEditando.leadTime
                } : null}
            />
        </MainLayout>
    );
}

export default Fornecedores;

