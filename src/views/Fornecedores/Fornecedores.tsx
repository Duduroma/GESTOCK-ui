import { useState, useEffect } from 'react';
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
import { fornecedoresService } from '../../services/fornecedores';

function Fornecedores(): React.ReactElement {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarFornecedores = async () => {
            try {
                console.log('🔄 [Fornecedores] Iniciando carregamento de fornecedores...');
                setLoading(true);
                setError(null);
                console.log('📡 [Fornecedores] Chamando GET /api/fornecedores');
                const response = await fornecedoresService.listar();
                console.log('✅ [Fornecedores] Resposta recebida:', response);
                const fornecedoresData = Array.isArray(response) ? response : (response.content || []);
                console.log('📦 [Fornecedores] Fornecedores processados:', fornecedoresData.length, 'itens');
                setFornecedores(fornecedoresData);
            } catch (err) {
                console.error('❌ [Fornecedores] Erro ao carregar fornecedores:', err);
                setError('Erro ao carregar fornecedores. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 [Fornecedores] Carregamento finalizado');
            }
        };

        carregarFornecedores();
    }, []);

    const { isModalOpen, itemEditando: fornecedorEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Fornecedor>({
        onView: () => navigate('/cotacoes')
    });

    const handleDeletar = async (fornecedorId: string) => {
        try {
            console.log('🗑️ [Fornecedores] Deletando fornecedor:', fornecedorId);
            console.log('📡 [Fornecedores] Chamando DELETE /api/fornecedores/' + fornecedorId);
            await fornecedoresService.inativar(fornecedorId);
            console.log('✅ [Fornecedores] Fornecedor deletado com sucesso');
            await recarregarFornecedores();
        } catch (err) {
            console.error('❌ [Fornecedores] Erro ao deletar fornecedor:', err);
            alert('Erro ao deletar fornecedor. Tente novamente.');
        }
    };

    const recarregarFornecedores = async () => {
        try {
            console.log('🔄 [Fornecedores] Recarregando lista de fornecedores...');
            setLoading(true);
            console.log('📡 [Fornecedores] Chamando GET /api/fornecedores');
            const response = await fornecedoresService.listar();
            console.log('✅ [Fornecedores] Resposta recebida:', response);
            const fornecedoresData = Array.isArray(response) ? response : (response.content || []);
            console.log('📦 [Fornecedores] Fornecedores recarregados:', fornecedoresData.length, 'itens');
            setFornecedores(fornecedoresData);
        } catch (err) {
            console.error('❌ [Fornecedores] Erro ao recarregar fornecedores:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (data: {
        nome: string;
        cnpj: string;
        contato: string;
        leadTimeMedio: number;
        ativo: boolean;
    }) => {
        try {
        if (fornecedorEditando) {
                console.log('✏️ [Fornecedores] Editando fornecedor:', fornecedorEditando.id);
                console.log('📡 [Fornecedores] Chamando PUT /api/fornecedores/' + fornecedorEditando.id);
                console.log('📝 [Fornecedores] Dados para atualizar:', { nome: data.nome, contato: data.contato });
                await fornecedoresService.atualizar(fornecedorEditando.id, {
                    nome: data.nome,
                    contato: data.contato
                });
                console.log('✅ [Fornecedores] Fornecedor atualizado com sucesso');
                await recarregarFornecedores();
                setItemEditando(null);
            } else {
                console.log('➕ [Fornecedores] Criando novo fornecedor...');
                console.log('📡 [Fornecedores] Chamando POST /api/fornecedores');
                console.log('📝 [Fornecedores] Dados para criar:', data);
                await fornecedoresService.criar({
                        nome: data.nome,
                        cnpj: data.cnpj,
                        contato: data.contato,
                    leadTimeMedio: { dias: data.leadTimeMedio } as LeadTime,
                        ativo: data.ativo
                });
                console.log('✅ [Fornecedores] Fornecedor criado com sucesso');
                await recarregarFornecedores();
            }
        } catch (err) {
            console.error('❌ [Fornecedores] Erro ao salvar fornecedor:', err);
            alert('Erro ao salvar fornecedor. Tente novamente.');
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

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando fornecedores...
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
            <Table headers={['Nome', 'CNPJ', 'Contato', 'Lead Time (dias)', 'Status', 'Ações']}>
                    {fornecedores.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum fornecedor encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        fornecedores.map((fornecedor) => (
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
                        ))
                    )}
            </Table>
            )}

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

