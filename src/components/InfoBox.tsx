interface InfoBoxProps {
    title: string;
    items: string[];
    variant?: 'blue' | 'yellow';
}

function InfoBox({ title, items, variant = 'blue' }: InfoBoxProps): React.ReactElement {
    const variants = {
        blue: { bg: '#dbeafe', border: '#93c5fd', text: '#1e40af' },
        yellow: { bg: '#fef3c7', border: '#fde68a', text: '#78350f' }
    };

    const style = variants[variant];

    return (
        <div style={{
            backgroundColor: style.bg,
            border: `1px solid ${style.border}`,
            borderRadius: '12px',
            padding: '20px',
            marginTop: '24px'
        }}>
            <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: style.text,
                margin: '0 0 12px 0'
            }}>
                {title}
            </h3>
            <ul style={{
                margin: 0,
                paddingLeft: '20px',
                color: style.text,
                fontSize: '14px',
                lineHeight: '1.8'
            }}>
                {items.map((item, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InfoBox;

