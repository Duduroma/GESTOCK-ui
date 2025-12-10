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
import { Fornecedor, FornecedorId, LeadTime } from '../../types/entities';
import { mockFornecedores } from '../../utils/mocks';

function Fornecedores(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: fornecedorEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Fornecedor>({
        onView: () => navigate('/cotacoes')
    });

    const [fornecedores, setFornecedores] = useState<Fornecedor[]>(mockFornecedores);

    const handleConfirm = (data: {
        nome: string;
        cnpj: string;
        contato: string;
        leadTimeMedio: number;
        ativo: boolean;
    }) => {
        if (fornecedorEditando) {
            setFornecedores(fornecedores.map(fornecedor => 
                fornecedor.id === fornecedorEditando.id
                    ? { 
                        ...fornecedor, 
                        nome: data.nome,
                        cnpj: data.cnpj,
                        contato: data.contato,
                        leadTimeMedio: { dias: data.leadTimeMedio },
                        ativo: data.ativo
                    }
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

            <Table headers={['Nome', 'CNPJ', 'Contato', 'Lead Time (dias)', 'Status', 'Ações']}>
                {fornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                        <TableCell>{fornecedor.nome}</TableCell>
                        <TableCell>{fornecedor.cnpj}</TableCell>
                        <TableCell>{fornecedor.contato}</TableCell>
                        <TableCell>{fornecedor.leadTimeMedio.dias}</TableCell>
                        <TableCell>
                            <Badge variant={fornecedor.ativo ? 'approved' : 'expired'}>
                                {fornecedor.ativo ? 'Ativo' : 'Inativo'}
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
                    cnpj: fornecedorEditando.cnpj,
                    contato: fornecedorEditando.contato,
                    leadTimeMedio: fornecedorEditando.leadTimeMedio.dias,
                    ativo: fornecedorEditando.ativo
                } : null}
            />
        </MainLayout>
    );
}

export default Fornecedores;

