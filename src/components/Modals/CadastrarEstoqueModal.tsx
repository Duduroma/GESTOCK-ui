import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface EstoqueData {
    clienteId: string;
    nome: string;
    endereco: string;
    capacidade: number;
    ativo: boolean;
}

interface CadastrarEstoqueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: EstoqueData) => void;
    initialData?: EstoqueData | null;
}

function CadastrarEstoqueModal({ isOpen, onClose, onConfirm, initialData }: CadastrarEstoqueModalProps): React.ReactElement {
    const [clienteId, setClienteId] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [capacidade, setCapacidade] = useState<number>(0);
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {
        if (initialData) {
            setClienteId(initialData.clienteId);
            setNome(initialData.nome);
            setEndereco(initialData.endereco);
            setCapacidade(initialData.capacidade);
            setAtivo(initialData.ativo);
        } else {
            setClienteId('');
            setNome('');
            setEndereco('');
            setCapacidade(0);
            setAtivo(true);
        }
    }, [initialData, isOpen]);

    const handleConfirm = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        const form = document.getElementById('form-cadastrar-estoque') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ clienteId, nome, endereco, capacidade, ativo });
        if (!initialData) {
            setClienteId('');
            setNome('');
            setEndereco('');
            setCapacidade(0);
            setAtivo(true);
        }
        onClose();
    };

    const isEditMode = !!initialData;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Editar Estoque" : "Cadastrar Estoque"}
            subtitle={isEditMode ? "Atualize os dados do estoque" : "Preencha os dados do estoque"}
            formId="form-cadastrar-estoque"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={() => handleConfirm()}
                />
            }
        >
            <ModalFormField
                label="Cliente"
                type="select"
                placeholder="Selecione o cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                options={[
                    { value: '1', label: 'Cliente 1' },
                    { value: '2', label: 'Cliente 2' },
                    { value: '3', label: 'Cliente 3' },
                    { value: '4', label: 'Cliente 4' }
                ]}
                required
            />
            <ModalFormField
                label="Nome do Estoque"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <ModalFormField
                label="Endereço"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
            />
            <ModalFormField
                label="Capacidade Máxima"
                type="number"
                value={capacidade.toString()}
                onChange={(e) => setCapacidade(parseInt(e.target.value) || 0)}
                required
            />
            <ModalFormField
                label="Ativo"
                type="select"
                value={ativo ? 'true' : 'false'}
                onChange={(e) => setAtivo(e.target.value === 'true')}
                options={[
                    { value: 'true', label: 'Ativo' },
                    { value: 'false', label: 'Inativo' }
                ]}
                required
            />
            <ModalInfoBox
                title="Regras de negócio:"
                items={[
                    'Cada estoque pertence a um único cliente',
                    'Não pode haver dois estoques com mesmo nome',
                    'Estoques com produtos ou pedidos não podem ser removidos'
                ]}
                variant="blue"
            />
        </Modal>
    );
}

export default CadastrarEstoqueModal;

