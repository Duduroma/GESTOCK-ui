import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';

interface CriarPedidoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        produto: string;
        fornecedor: string;
        quantidade: string;
        leadTime: string;
        dataPrevista: string;
    }) => void;
}

function CriarPedidoModal({ isOpen, onClose, onConfirm }: CriarPedidoModalProps): React.ReactElement {
    const [produto, setProduto] = useState('');
    const [fornecedor, setFornecedor] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [leadTime, setLeadTime] = useState('7');
    const [dataPrevista, setDataPrevista] = useState('');

    const handleConfirm = () => {
        onConfirm({ produto, fornecedor, quantidade, leadTime, dataPrevista });
        setProduto('');
        setFornecedor('');
        setQuantidade('');
        setLeadTime('7');
        setDataPrevista('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Criar Pedido"
            subtitle="Preencha os dados do pedido"
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
            {/* listagem de fornecedores */}
            <ModalFormField
                label="Fornecedor (Cotação Selecionada)"
                type="select"
                placeholder="Selecione o fornecedor"
                value={fornecedor}
                onChange={(e) => setFornecedor(e.target.value)}
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
                label="Lead Time (dias)"
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                required
            />
            <ModalFormField
                label="Data prevista"
                type="date"
                value={dataPrevista}
                onChange={(e) => setDataPrevista(e.target.value)}
                required
            />
        </Modal>
    );
}

export default CriarPedidoModal;

