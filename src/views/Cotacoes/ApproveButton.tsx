interface ApproveButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    isMostAdvantageous?: boolean;
}

function ApproveButton({ onClick, disabled = false, isMostAdvantageous = false }: ApproveButtonProps): React.ReactElement {
    const getButtonStyle = () => {
        if (disabled) {
            return {
                backgroundColor: '#f3f4f6',
                borderColor: '#e5e7eb',
                color: '#9ca3af',
                cursor: 'not-allowed'
            };
        }
        
        if (isMostAdvantageous) {
            return {
                backgroundColor: '#2563eb',
                borderColor: '#2563eb',
                color: 'white',
                cursor: 'pointer'
            };
        }
        
        return {
            backgroundColor: 'white',
            borderColor: '#9ca3af',
            color: '#4b5563',
            cursor: 'pointer'
        };
    };

    const style = getButtonStyle();

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                backgroundColor: style.backgroundColor,
                border: `1px solid ${style.borderColor}`,
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                color: style.color,
                cursor: style.cursor,
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
                opacity: disabled ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
                if (!disabled && !isMostAdvantageous) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.borderColor = '#6b7280';
                }
            }}
            onMouseLeave={(e) => {
                if (!disabled && !isMostAdvantageous) {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.borderColor = '#9ca3af';
                }
            }}
        >
            <span style={{ fontSize: '16px' }}>✓</span>
            Aprovar Cotação
        </button>
    );
}

export default ApproveButton;

