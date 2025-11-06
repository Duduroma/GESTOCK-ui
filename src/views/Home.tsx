// React 17+ com JSX automático não precisa importar React

function Home(): React.ReactElement {
    return (
        <div>
            <h1>Olá Mundo</h1>
            <p>Esta é a página inicial</p>
        </div>
    );
}

export default Home;
