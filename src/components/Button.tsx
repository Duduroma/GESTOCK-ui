// React 17+ com JSX automático não precisa importar React

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

function Button({ children, onClick, type = 'button' }: ButtonProps): React.ReactElement {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
