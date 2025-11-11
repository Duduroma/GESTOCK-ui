import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface CadastrarFornecedorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        nome: string;
        contato: string;
        leadTime: string;
    }) => void;
}

function CadastrarFornecedorModal({ isOpen, onClose, onConfirm }: CadastrarFornecedorModalProps): React.ReactElement {
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [leadTime, setLeadTime] = useState('');

    const handleConfirm = () => {
        onConfirm({ nome, contato, leadTime });
        setNome('');
        setContato('');
        setLeadTime('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cadastrar Fornecedor"
            subtitle="Preencha os dados do fornecedor"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            <ModalFormField
                label="Nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <ModalFormField
                label="Contato"
                type="tel"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
            />
            <ModalFormField
                label="Lead Time (dias)"
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                required
            />
            <ModalInfoBox
                message="Alterar o Lead Time recalcula automaticamente o Ponto de Ressuprimento (ROP) dos produtos associados."
                variant="blue"
            />
        </Modal>
    );
}

export default CadastrarFornecedorModal;

