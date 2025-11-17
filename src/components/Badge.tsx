interface BadgeProps {
    children: React.ReactNode;
    variant?: 'active' | 'inactive' | 'pending' | 'critical' | 'medium' | 'completed' | 'in-transit' | 'expired' | 'adequate' | 'below' | 'approved' | 'entrada' | 'saida';
    icon?: React.ReactNode;
    shape?: 'rounded' | 'square';
}

function Badge({ children, variant = 'active', icon, shape = 'rounded' }: BadgeProps): React.ReactElement {
    const variants = {
        active: { bg: '#dbeafe', color: '#2563eb' },
        inactive: { bg: '#f3f4f6', color: '#6b7280' },
        pending: { bg: '#e5e7eb', color: '#6b7280' },
        critical: { bg: '#fee2e2', color: '#dc2626' },
        medium: { bg: '#e5e7eb', color: '#4b5563' },
        completed: { bg: '#dbeafe', color: '#2563eb' },
        'in-transit': { bg: '#f3f4f6', color: '#6b7280' },
        expired: { bg: '#fee2e2', color: '#dc2626' },
        adequate: { bg: '#d1fae5', color: '#059669' },
        below: { bg: '#fee2e2', color: '#dc2626' },
        approved: { bg: '#dbeafe', color: '#2563eb' },
        entrada: { bg: '#dbeafe', color: '#2563eb' },
        saida: { bg: 'white', color: '#4b5563' }
    };

    const style = variants[variant] || variants.active;
    const borderRadius = shape === 'rounded' ? '9999px' : '6px';
    const borderColor = variant === 'saida' ? '#9ca3af' : 'transparent';
    const border = variant === 'saida' ? `1px solid ${borderColor}` : 'none';

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: icon ? '6px' : '0',
            padding: shape === 'square' ? '6px 12px' : '4px 12px',
            borderRadius: borderRadius,
            fontSize: shape === 'square' ? '14px' : '12px',
            fontWeight: '500',
            backgroundColor: style.bg,
            color: style.color,
            border: border
        }}>
            {icon && <span style={{ fontSize: '16px' }}>{icon}</span>}
            {children}
        </span>
    );
}

export default Badge;

