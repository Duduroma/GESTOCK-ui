interface ModalActionsProps {
    onCancel: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmDisabled?: boolean;
}

function ModalActions({
    onCancel,
    onConfirm,
    confirmLabel = 'Confirmar',
    cancelLabel = 'Cancelar',
    confirmDisabled = false
}: ModalActionsProps): React.ReactElement {
    return (
        <>
            <button
                onClick={onCancel}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    color: '#374151',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                }}
            >
                {cancelLabel}
            </button>
            <button
                onClick={onConfirm}
                disabled={confirmDisabled}
                style={{
                    padding: '10px 20px',
                    backgroundColor: confirmDisabled ? '#9ca3af' : '#2563eb',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: confirmDisabled ? 'not-allowed' : 'pointer'
                }}
            >
                {confirmLabel}
            </button>
        </>
    );
}

export default ModalActions;

