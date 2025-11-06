import ReactDOM from 'react-dom/client';

function App(): React.ReactElement {
    return <h1>Olá Mundo</h1>;
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
