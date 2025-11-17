interface IconButtonProps {
    icon: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
}

function IconButton({ icon, onClick, ariaLabel }: IconButtonProps): React.ReactElement {
    return (
        <button
            onClick={onClick}
            aria-label={ariaLabel}
            style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#1f2937',
                transition: 'all 0.2s',
                padding: 0
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#d1d5db';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e5e7eb';
            }}
        >
            {icon}
        </button>
    );
}

export default IconButton;

