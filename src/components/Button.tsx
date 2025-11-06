// Declara tipo global para React
declare const React: any;

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

function Button({ children, onClick, type = 'button' }: ButtonProps): JSX.Element {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
