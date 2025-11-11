import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface NovaTransferenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        produto: string;
        estoqueOrigem: string;
        estoqueDestino: string;
        quantidade: string;
        responsavel: string;
    }) => void;
}

function NovaTransferenciaModal({ isOpen, onClose, onConfirm }: NovaTransferenciaModalProps): React.ReactElement {
    const [produto, setProduto] = useState('');
    const [estoqueOrigem, setEstoqueOrigem] = useState('');
    const [estoqueDestino, setEstoqueDestino] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [responsavel, setResponsavel] = useState('');

    const handleConfirm = () => {
        onConfirm({ produto, estoqueOrigem, estoqueDestino, quantidade, responsavel });
        setProduto('');
        setEstoqueOrigem('');
        setEstoqueDestino('');
        setQuantidade('');
        setResponsavel('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nova Transferência"
            subtitle="Preencha os dados da transferência"
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
            {/* listagem de estoques */}
            <ModalFormField
                label="Estoque de Origem"
                type="select"
                placeholder="Selecione o estoque de origem"
                value={estoqueOrigem}
                onChange={(e) => setEstoqueOrigem(e.target.value)}
                required
            />
            {/* listagem de estoques */}
            <ModalFormField
                label="Estoque de Destino"
                type="select"
                placeholder="Selecione o estoque de destino"
                value={estoqueDestino}
                onChange={(e) => setEstoqueDestino(e.target.value)}
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
                label="Responsável"
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
            />
            <ModalInfoBox
                message="A transferência só pode ocorrer entre estoques do mesmo cliente. O sistema verifica se há quantidade suficiente no estoque de origem."
                variant="blue"
            />
        </Modal>
    );
}

export default NovaTransferenciaModal;

