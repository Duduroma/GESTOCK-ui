interface SummaryCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    variant?: 'default' | 'blue' | 'green' | 'red' | 'yellow';
}

function SummaryCard({ title, value, subtitle, variant = 'default' }: SummaryCardProps): React.ReactElement {
    const variants = {
        default: { bg: 'white', borderColor: 'transparent', titleColor: '#6b7280', valueColor: '#1f2937' },
        blue: { bg: '#dbeafe', borderColor: '#93c5fd', titleColor: '#1e40af', valueColor: '#1e40af' },
        green: { bg: 'white', borderColor: 'transparent', titleColor: '#6b7280', valueColor: '#059669' },
        red: { bg: '#fee2e2', borderColor: '#fca5a5', titleColor: '#991b1b', valueColor: '#991b1b' },
        yellow: { bg: '#fef3c7', borderColor: '#fde68a', titleColor: '#92400e', valueColor: '#78350f' }
    };

    const style = variants[variant];

    return (
        <div style={{
            backgroundColor: style.bg,
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: `1px solid ${style.borderColor}`
        }}>
            <p style={{
                fontSize: '14px',
                color: style.titleColor,
                margin: '0 0 8px 0',
                fontWeight: '500'
            }}>
                {title}
            </p>
            <p style={{
                fontSize: '24px',
                fontWeight: '700',
                color: style.valueColor,
                margin: '0 0 4px 0'
            }}>
                {value}
            </p>
            {subtitle && (
                <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: 0
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default SummaryCard;

