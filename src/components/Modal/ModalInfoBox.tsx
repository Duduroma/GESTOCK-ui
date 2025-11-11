interface ModalInfoBoxProps {
    title?: string;
    message?: string;
    items?: string[];
    variant?: 'blue' | 'yellow';
}

function ModalInfoBox({ title, message, items, variant = 'blue' }: ModalInfoBoxProps): React.ReactElement {
    return (
        <div style={{
            backgroundColor: variant === 'yellow' ? '#fef3c7' : '#dbeafe',
            border: `1px solid ${variant === 'yellow' ? '#fde68a' : '#93c5fd'}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: title || items ? '12px' : '0'
            }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: variant === 'yellow' ? '#f59e0b' : '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                }}>
                    <span style={{
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        {variant === 'yellow' ? '!' : 'i'}
                    </span>
                </div>
                <div style={{ flex: 1 }}>
                    {title && (
                        <h3 style={{
                            margin: '0 0 8px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: variant === 'yellow' ? '#78350f' : '#1e40af'
                        }}>
                            {title}
                        </h3>
                    )}
                    {items && items.length > 0 ? (
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: variant === 'yellow' ? '#78350f' : '#1e40af',
                            fontSize: '14px',
                            lineHeight: '1.8'
                        }}>
                            {items.map((item, index) => (
                                <li key={index} style={{ marginBottom: '4px' }}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : message && (
                        <p style={{
                            margin: 0,
                            fontSize: '14px',
                            color: variant === 'yellow' ? '#78350f' : '#1e40af',
                            lineHeight: '1.5'
                        }}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalInfoBox;

