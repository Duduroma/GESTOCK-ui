import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login/Login';
import Cadastro from './views/Cadastro/Cadastro';
import Estoques from './views/Estoques/Estoques';
import Produtos from './views/Produtos/Produtos';
import Fornecedores from './views/Fornecedores/Fornecedores';
import Cotacoes from './views/Cotacoes/Cotacoes';
import Pedidos from './views/Pedidos/Pedidos';
import PontoRessuprimento from './views/PontoRessuprimento/PontoRessuprimento';
import Alertas from './views/Alertas/Alertas';
import Movimentacoes from './views/Movimentacoes/Movimentacoes';
import Transferencias from './views/Transferencias/Transferencias';
import Reservas from './views/Reservas/Reservas';

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/estoques" element={<Estoques />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/fornecedores" element={<Fornecedores />} />
                <Route path="/cotacoes" element={<Cotacoes />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/ponto-ressuprimento" element={<PontoRessuprimento />} />
                <Route path="/alertas" element={<Alertas />} />
                <Route path="/movimentacoes" element={<Movimentacoes />} />
                <Route path="/transferencias" element={<Transferencias />} />
                <Route path="/reservas" element={<Reservas />} />
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
