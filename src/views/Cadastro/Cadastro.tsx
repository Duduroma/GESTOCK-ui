import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import Logo from '../../components/Logo';
import Card from '../../components/Card';
import Input from '../../components/Input';

function Cadastro(): React.ReactElement {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Cadastro:', { nome, email, senha });
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
                        Cadastrar
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

