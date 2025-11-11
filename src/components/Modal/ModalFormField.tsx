interface ModalFormFieldProps {
    label: string;
    type?: 'text' | 'number' | 'email' | 'tel' | 'textarea' | 'select' | 'date';
    placeholder?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
    rows?: number;
}

function ModalFormField({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
    required = false,
    options,
    rows = 4
}: ModalFormFieldProps): React.ReactElement {
    const baseInputStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        fontSize: '14px',
        fontFamily: 'inherit',
        boxSizing: 'border-box' as const
    };

    const focusedInputStyle = {
        ...baseInputStyle,
        border: '1px solid #2563eb',
        backgroundColor: 'white',
        outline: 'none'
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151'
            }}>
                {label}
                {required && <span style={{ color: '#dc2626', marginLeft: '4px' }}>*</span>}
            </label>
            
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    rows={rows}
                    style={baseInputStyle}
                />
            ) : type === 'select' ? (
                <select
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={baseInputStyle}
                >
                    <option value="">{placeholder || 'Selecione'}</option>
                    {options?.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    style={baseInputStyle}
                />
            )}
        </div>
    );
}

export default ModalFormField;

