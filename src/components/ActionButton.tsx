interface ActionButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

function ActionButton({ label, icon, onClick, disabled = false }: ActionButtonProps): React.ReactElement {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: disabled ? '#f3f4f6' : 'white',
                border: `1px solid ${disabled ? '#e5e7eb' : '#9ca3af'}`,
                borderRadius: '6px',
                cursor: disabled ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: disabled ? '#9ca3af' : '#4b5563',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                opacity: disabled ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
                if (!disabled) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#6b7280';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#9ca3af';
                }
            }}
        >
            <span style={{ fontSize: '16px' }}>{icon}</span>
            {label}
        </button>
    );
}

export default ActionButton;

