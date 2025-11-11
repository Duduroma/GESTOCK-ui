interface PageHeaderProps {
    title: string;
    subtitle: string;
    actionButton?: {
        label: string;
        onClick: () => void;
        icon?: React.ReactNode;
    };
}

function PageHeader({ title, subtitle, actionButton }: PageHeaderProps): React.ReactElement {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '32px'
        }}>
            <div>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#1f2937',
                    margin: '0 0 8px 0'
                }}>
                    {title}
                </h1>
                <p style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    margin: 0
                }}>
                    {subtitle}
                </p>
            </div>
            {actionButton && (
                <button
                    onClick={actionButton.onClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 24px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    {actionButton.icon && <span>{actionButton.icon}</span>}
                    {actionButton.label}
                </button>
            )}
        </div>
    );
}

export default PageHeader;

