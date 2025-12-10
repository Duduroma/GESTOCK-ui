import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Logo from '../../components/Logo';
import Card from '../../components/Card';
import Input from '../../components/Input';

function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, senha });
        navigate('/estoques');
    };

    return (
        <AuthLayout>
            <Logo 
                title="Sistema de Gestão de Estoque"
                subtitle="Entre com suas credenciais para acessar"
                showSubtitle={true}
            />

            <Card 
                title="Login"
                subtitle="Entre com suas credenciais"
            >
 
                <form onSubmit={handleSubmit}>
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            marginTop: '8px'
                        }}
                    >
                        Entrar
                    </button>
                    
                </form>

               
                <div style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    fontSize: '14px',
                    color: '#6b7280'
                }}>
                    Não possui uma conta?{' '}
                    <Link 
                        to="/cadastro" 
                        style={{
                            color: '#2563eb',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Cadastre-se
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
}

export default Login;

