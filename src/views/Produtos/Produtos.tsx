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

interface Produto {
    id: string;
    codigo: string;
    nome: string;
    descricao: string;
    saldo: string;
    saldoUnidade: string;
    estoque: string;
    status: 'active' | 'inactive';
    fornecedores: string[];
}

function Produtos(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: produtoEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Produto>({
        onView: () => navigate('/cotacoes')
    });

    const [produtos, setProdutos] = useState<Produto[]>([
        {
            id: '1',
            codigo: 'PROD001',
            nome: 'Parafuso M6',
            descricao: 'Parafuso sextavado M6 x 20mm',
            saldo: '5000',
            saldoUnidade: 'Unidade',
            estoque: 'Estoque Central',
            status: 'active',
            fornecedores: ['Fornecedor A', 'Fornecedor B']
        },
        {
            id: '2',
            codigo: 'PROD002',
            nome: 'Tinta Branca',
            descricao: 'Tinta látex branca 18L',
            saldo: '150',
            saldoUnidade: 'Litros',
            estoque: 'Estoque Central',
            status: 'active',
            fornecedores: ['Fornecedor C']
        },
        {
            id: '3',
            codigo: 'PROD003',
            nome: 'Cabo Elétrico',
            descricao: 'Cabo elétrico 2.5mm flexível',
            saldo: '0',
            saldoUnidade: 'Metros',
            estoque: 'Estoque Filial Norte',
            status: 'active',
            fornecedores: ['Fornecedor A']
        }
    ]);

    const handleConfirm = (data: {
        codigo: string;
        nome: string;
        descricao: string;
        embalagem: string;
        unidadeMedida: string;
        estoqueVinculado: string;
        status: string;
    }) => {
        if (produtoEditando) {
            setProdutos(produtos.map(produto => 
                produto.id === produtoEditando.id
                    ? { 
                        ...produto, 
                        codigo: data.codigo,
                        nome: data.nome,
                        descricao: data.descricao,
                        saldoUnidade: data.unidadeMedida,
                        estoque: data.estoqueVinculado,
                        status: data.status === 'Ativo' ? 'active' : 'inactive'
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

            <Table headers={['Código', 'Nome', 'Descrição', 'Saldo', 'Estoque', 'Status', 'Fornecedores', 'Ações']}>
                {produtos.map((produto) => (
                    <TableRow key={produto.id}>
                        <TableCell>{produto.codigo}</TableCell>
                        <TableCell>{produto.nome}</TableCell>
                        <TableCell>{produto.descricao}</TableCell>
                        <TableCell>
                            <span style={{
                                color: produto.saldo === '0' ? '#dc2626' : '#1f2937'
                            }}>
                                {produto.saldo} {produto.saldoUnidade}
                            </span>
                        </TableCell>
                        <TableCell>{produto.estoque}</TableCell>
                        <TableCell>
                            <Badge variant={produto.status}>
                                {produto.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </TableCell>
                        <TableCell>{produto.fornecedores.join(', ')}</TableCell>
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
                    descricao: produtoEditando.descricao,
                    embalagem: '',
                    unidadeMedida: produtoEditando.saldoUnidade,
                    estoqueVinculado: produtoEditando.estoque,
                    status: produtoEditando.status === 'active' ? 'Ativo' : 'Inativo'
                } : null}
            />
        </MainLayout>
    );
}

export default Produtos;

