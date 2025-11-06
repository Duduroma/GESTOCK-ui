// Declara tipos globais para React
declare const React: any;
declare const ReactDOM: any;

function App(): JSX.Element {
    return <h1>Olá Mundo</h1>;
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
