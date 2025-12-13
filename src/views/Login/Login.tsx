import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Logo from '../../components/Logo';
import Card from '../../components/Card';
import Input from '../../components/Input';
import authService from '../../services/auth';

function Login(): React.ReactElement {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.message) {
            setSucesso(location.state.message);
            // Limpar o state para não mostrar a mensagem novamente ao recarregar
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            const response = await authService.login(email, senha);
            console.log('✅ [Login] Login bem-sucedido, redirecionando...');
            console.log('🔑 [Login] Token no localStorage:', localStorage.getItem('authToken'));
            navigate('/estoques');
        } catch (error: any) {
            setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setCarregando(false);
        }
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
                        autoComplete="off"
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        autoComplete="off"
                    />

                    {sucesso && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#d1fae5',
                            color: '#065f46',
                            borderRadius: '8px',
                            fontSize: '14px',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}>
                            {sucesso}
                        </div>
                    )}

                    {erro && (
                        <div style={{
                            padding: '12px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            borderRadius: '8px',
                            fontSize: '14px',
                            marginTop: '8px',
                            marginBottom: '8px'
                        }}>
                            {erro}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={carregando}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: carregando ? '#9ca3af' : '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: carregando ? 'not-allowed' : 'pointer',
                            marginTop: '8px',
                            opacity: carregando ? 0.6 : 1
                        }}
                    >
                        {carregando ? 'Entrando...' : 'Entrar'}
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

