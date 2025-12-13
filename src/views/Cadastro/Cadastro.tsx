import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Logo from '../../components/Logo';
import Card from '../../components/Card';
import Input from '../../components/Input';
import { clientesService } from '../../services/clientes';

function Cadastro(): React.ReactElement {
    const [nome, setNome] = useState('');
    const [documento, setDocumento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        try {
            await clientesService.criar({
                nome,
                documento,
                email,
                senha
            });
            navigate('/login', { state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' } });
        } catch (error: any) {
            setErro(error.message || 'Erro ao realizar cadastro. Tente novamente.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <AuthLayout>
            <Logo 
                title="Sistema de Gestão de Estoque"
                subtitle="Crie sua conta para começar"
                showSubtitle={true}
            />

            <Card 
                title="Cadastro"
                subtitle="Preencha os dados para criar sua conta"
            >
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Nome Completo"
                        type="text"
                        placeholder="Seu nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <Input
                        label="CPF/CNPJ"
                        type="text"
                        placeholder="000.000.000-00 ou 00.000.000/0000-00"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                        required
                    />

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
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div style={{
                    textAlign: 'center',
                    marginTop: '24px',
                    fontSize: '14px',
                    color: '#6b7280'
                }}>
                    <Link 
                        to="/login" 
                        style={{
                            color: '#2563eb',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        Voltar para a tela de login
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
}

export default Cadastro;

