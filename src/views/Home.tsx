// Declara tipo global para React
declare const React: any;

function Home(): JSX.Element {
    return (
        <div>
            <h1>Página Home</h1>
            <p>Esta é a página inicial</p>
        </div>
    );
}

// Exporta para uso global
if (typeof window !== 'undefined') {
    (window as any).Home = Home;
}

export default Home;
