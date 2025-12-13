interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    autoComplete?: string;
}

function Input({ 
    label, 
    type = 'text', 
    placeholder, 
    value, 
    onChange,
    required = false,
    autoComplete
}: InputProps): React.ReactElement {
    return (
        <div style={{ marginBottom: '20px' }}>
            <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                color: '#333',
                fontSize: '14px',
                fontWeight: '500'
            }}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete={autoComplete}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    backgroundColor: '#f5f5f5',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                }}
            />
        </div>
    );
}

export default Input;

