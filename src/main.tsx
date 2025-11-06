// Declara tipos globais para React
declare const React: any;
declare const ReactDOM: any;

// Importa a view Home
const Home = (window as any).Home || function() { 
    return <div>Carregando...</div>; 
};

function App(): JSX.Element {
    return (
        <div>
            <Home />
        </div>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
