import { useState } from 'react';

interface UseTablePageOptions<T> {
    onEdit?: (item: T) => void;
    onDelete?: (itemId: string) => void;
    onView?: () => void;
}

function useTablePage<T extends { id: string }>(options?: UseTablePageOptions<T>) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemEditando, setItemEditando] = useState<T | null>(null);

    const openModal = () => {
        setItemEditando(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setItemEditando(null);
    };

    const handleEditar = (itemId: string, items: T[]) => {
        const item = items.find(i => i.id === itemId);
        if (item) {
            setItemEditando(item);
            setIsModalOpen(true);
            options?.onEdit?.(item);
        }
    };

    const handleDeletar = (itemId: string) => {
        options?.onDelete?.(itemId);
    };

    const handleView = () => {
        options?.onView?.();
    };

    return {
        isModalOpen,
        itemEditando,
        openModal,
        closeModal,
        handleEditar,
        handleDeletar,
        handleView,
        setItemEditando
    };
}

export default useTablePage;

