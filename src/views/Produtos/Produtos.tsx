import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarProdutoModal from '../../components/Modals/CadastrarProdutoModal';
import useTablePage from '../../hooks/useTablePage';
import { Produto } from '../../types/entities';
import { mockProdutos } from '../../utils/mocks';

function Produtos(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: produtoEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Produto>({
        onView: () => navigate('/cotacoes')
    });

    const [produtos, setProdutos] = useState<Produto[]>(mockProdutos);

    const handleConfirm = (data: {
        codigo: string;
        nome: string;
        unidadePeso: string;
        peso: number;
        perecivel: boolean;
        ativo: boolean;
        estoquesVinculados: string[];
    }) => {
        if (produtoEditando) {
            setProdutos(produtos.map(produto => 
                produto.id === produtoEditando.id
                    ? { 
                        ...produto, 
                        codigo: data.codigo,
                        nome: data.nome,
                        unidadePeso: data.unidadePeso,
                        peso: data.peso,
                        perecivel: data.perecivel,
                        ativo: data.ativo
                    }
                    : produto
            ));
            setItemEditando(null);
            console.log('Produto editado:', data);
        } else {
            console.log('Cadastrar produto:', data);
        }
    };

    const handleDeletarProduto = (produtoId: string) => {
        console.log('Deletar produto:', produtoId);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Produtos"
                subtitle="Gerencie os produtos cadastrados no sistema"
                actionButton={{
                    label: "Cadastrar Produto",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            <Table headers={['Código', 'Nome', 'Unidade Peso', 'Peso', 'Perecível', 'Status', 'Ações']}>
                {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                        <TableCell>{produto.codigo}</TableCell>
                        <TableCell>{produto.nome}</TableCell>
                        <TableCell>{produto.unidadePeso}</TableCell>
                        <TableCell>{produto.peso} {produto.unidadePeso}</TableCell>
                        <TableCell>
                            <Badge variant={produto.perecivel ? 'critical' : 'adequate'}>
                                {produto.perecivel ? 'Sim' : 'Não'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={produto.ativo ? 'approved' : 'expired'}>
                                {produto.ativo ? 'Ativo' : 'Inativo'}
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
                                    onClick={() => handleEditar(produto.id, produtos)}
                                    ariaLabel="Editar produto"
                                />
                                <IconButton
                                    icon="🗑️"
                                    onClick={() => handleDeletarProduto(produto.id)}
                                    ariaLabel="Deletar produto"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <CadastrarProdutoModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={produtoEditando ? {
                    codigo: produtoEditando.codigo,
                    nome: produtoEditando.nome,
                    unidadePeso: produtoEditando.unidadePeso,
                    peso: produtoEditando.peso,
                    perecivel: produtoEditando.perecivel,
                    ativo: produtoEditando.ativo,
                    estoquesVinculados: []
                } : null}
            />
        </MainLayout>
    );
}

export default Produtos;

