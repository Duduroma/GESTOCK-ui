import { useState, useMemo } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import Tabs from '../../components/Tabs';
import InfoBox from '../../components/InfoBox';
import { ReservaRegistro, TipoReservaRegistro, ProdutoId } from '../../types/entities';
import { mockReservas } from '../../utils/mocks';

function Reservas(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);
    const [reservas, setReservas] = useState<ReservaRegistro[]>(mockReservas);

    const reservasAtivas = reservas.filter(r => r.tipo === TipoReservaRegistro.RESERVA);
    const reservasLiberadas = reservas.filter(r => r.tipo === TipoReservaRegistro.LIBERACAO);
    
    const totalUnidadesAtivas = reservasAtivas.reduce((sum, r) => sum + r.quantidade, 0);

    const reservasFiltradas = useMemo(() => {
        switch (activeTab) {
            case 0: 
                return reservas.filter(r => r.tipo === TipoReservaRegistro.RESERVA);
            case 1:  
                return reservas.filter(r => r.tipo === TipoReservaRegistro.LIBERACAO);
            case 2: 
                return reservas.filter(r => r.tipo === TipoReservaRegistro.LIBERACAO);
            default:
                return [];
        }
    }, [activeTab, reservas]);

    const handleLiberarReserva = (produtoId: ProdutoId, quantidade: number) => {
        const novaLiberacao: ReservaRegistro = {
            produtoId,
            quantidade,
            dataHora: new Date().toISOString(),
            tipo: TipoReservaRegistro.LIBERACAO
        };
        setReservas([...reservas, novaLiberacao]);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Reservas de Estoque"
                subtitle="Gerencie reservas vinculadas a pedidos pendentes"
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Reservas Ativas"
                    value={reservasAtivas.length}
                    subtitle={`${totalUnidadesAtivas.toLocaleString('pt-BR')} unidades`}
                    variant="blue"
                />
                <SummaryCard
                    title="Reservas Liberadas"
                    value={reservasLiberadas.length}
                    variant="green"
                />
            </div>

            <Tabs
                tabs={[
                    { label: 'Ativas', count: reservasAtivas.length },
                    { label: 'Histórico', count: reservasLiberadas.length }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Table headers={['Produto', 'Quantidade', 'Data/Hora', 'Tipo', 'Ações']}>
                {reservasFiltradas.map((reserva, index) => (
                    <TableRow key={`${reserva.produtoId}-${reserva.dataHora}-${index}`}>
                        <TableCell>Produto {reserva.produtoId}</TableCell>
                        <TableCell>{reserva.quantidade.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>{new Date(reserva.dataHora).toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={reserva.tipo === TipoReservaRegistro.RESERVA ? 'approved' : 'adequate'}>
                                {reserva.tipo === TipoReservaRegistro.RESERVA ? 'Reserva' : 'Liberação'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {reserva.tipo === TipoReservaRegistro.RESERVA && (
                                <ActionButton
                                    label="Liberar Reserva"
                                    icon="✕"
                                    onClick={() => handleLiberarReserva(reserva.produtoId, reserva.quantidade)}
                                />
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <InfoBox
                title="Funcionamento das Reservas"
                items={[
                    'Criação automática: Ao gerar um pedido, uma reserva é criada automaticamente',
                    'Liberação automática ao receber: Quando o pedido é recebido, a reserva é liberada',
                    'Liberação automática ao cancelar: Quando o pedido é cancelado, a reserva é liberada',
                    'Auditoria: Todo o histórico de reservas e liberações é mantido para rastreabilidade'
                ]}
                variant="blue"
            />
        </MainLayout>
    );
}

export default Reservas;

