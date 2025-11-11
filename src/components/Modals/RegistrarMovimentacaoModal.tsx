import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';

interface RegistrarMovimentacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        produto: string;
        tipo: string;
        estoque: string;
        quantidade: string;
        motivo: string;
        responsavel: string;
    }) => void;
}

function RegistrarMovimentacaoModal({ isOpen, onClose, onConfirm }: RegistrarMovimentacaoModalProps): React.ReactElement {
    const [produto, setProduto] = useState('');
    const [tipo, setTipo] = useState('Entrada');
    const [estoque, setEstoque] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [motivo, setMotivo] = useState('');
    const [responsavel, setResponsavel] = useState('');

    const handleConfirm = () => {
        onConfirm({ produto, tipo, estoque, quantidade, motivo, responsavel });
        setProduto('');
        setTipo('Entrada');
        setEstoque('');
        setQuantidade('');
        setMotivo('');
        setResponsavel('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Registrar Movimentação"
            subtitle="Preencha os dados da movimentação"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            {/* listagem de produtos */}
            <ModalFormField
                label="Produto"
                type="select"
                placeholder="Selecione o produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                required
            />
            <ModalFormField
                label="Tipo"
                type="select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                options={[
                    { value: 'Entrada', label: 'Entrada' },
                    { value: 'Saída', label: 'Saída' }
                ]}
                required
            />
            {/* listagem de estoques */}
            <ModalFormField
                label="Estoque"
                type="select"
                placeholder="Selecione o estoque"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                required
            />
            <ModalFormField
                label="Quantidade"
                type="text"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
            />
            <ModalFormField
                label="Motivo"
                type="textarea"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
                required
            />
            <ModalFormField
                label="Responsável"
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
            />
        </Modal>
    );
}

export default RegistrarMovimentacaoModal;

