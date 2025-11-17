import { useState, useMemo } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import Tabs from '../../components/Tabs';
import InfoBox from '../../components/InfoBox';

interface Reserva {
    id: string;
    produto: string;
    pedido: string;
    quantidadeReservada: string;
    dataReserva: string;
    status: 'active' | 'released' | 'canceled';
}

function Reservas(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);
    const [reservas, setReservas] = useState<Reserva[]>([
        {
            id: '1',
            produto: 'Tinta Acrílica Vermelha',
            pedido: 'Pedido #15',
            quantidadeReservada: '8.500',
            dataReserva: '17/10/2025',
            status: 'active'
        },
        {
            id: '2',
            produto: 'Parafuso M12',
            pedido: 'Pedido #16',
            quantidadeReservada: '1.200',
            dataReserva: '18/10/2025',
            status: 'active'
        },
        {
            id: '3',
            produto: 'Cabo Elétrico 10mm',
            pedido: 'Pedido #13',
            quantidadeReservada: '3.800',
            dataReserva: '12/10/2025',
            status: 'released'
        },
        {
            id: '4',
            produto: 'Tinta Látex Amarela',
            pedido: 'Pedido #14',
            quantidadeReservada: '75',
            dataReserva: '11/10/2025',
            status: 'released'
        },
        {
            id: '5',
            produto: 'Parafuso M6',
            pedido: 'Pedido #12',
            quantidadeReservada: '6.000',
            dataReserva: '09/10/2025',
            status: 'canceled'
        }
    ]);

    const reservasAtivas = reservas.filter(r => r.status === 'active');
    const reservasLiberadas = reservas.filter(r => r.status === 'released');
    const reservasCanceladas = reservas.filter(r => r.status === 'canceled');
    
    const totalUnidadesAtivas = reservasAtivas.reduce((sum, r) => {
        const quantidade = parseInt(r.quantidadeReservada.replace(/\./g, '').replace(',', '.')) || 0;
        return sum + quantidade;
    }, 0);

    const reservasFiltradas = useMemo(() => {
        switch (activeTab) {
            case 0: 
                return reservas.filter(r => r.status === 'active');
            case 1:  
                return reservas.filter(r => r.status === 'released' || r.status === 'canceled');
            case 2: 
                return reservas.filter(r => r.status === 'canceled');
            default:
                return [];
        }
    }, [activeTab, reservas]);

    const handleLiberarReserva = (reservaId: string) => {
        setReservas(reservas.map(reserva => 
            reserva.id === reservaId
                ? { ...reserva, status: 'released' }
                : reserva
        ));
    };

    const statusConfig: Record<string, { variant: 'approved' | 'adequate' | 'expired' | 'pending'; label: string }> = {
        active: { variant: 'approved', label: 'Ativa' },
        released: { variant: 'adequate', label: 'Liberada' },
        canceled: { variant: 'expired', label: 'Cancelada' }
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
                <SummaryCard
                    title="Reservas Canceladas"
                    value={reservasCanceladas.length}
                    variant="red"
                />
            </div>

            <Tabs
                tabs={[
                    { label: 'Ativas', count: reservasAtivas.length },
                    { label: 'Histórico' },
                    { label: 'Canceladas', count: reservasCanceladas.length }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Table headers={['Produto', 'Pedido', 'Quantidade Reservada', 'Data da Reserva', 'Status', 'Ações']}>
                {reservasFiltradas.map((reserva) => (
                    <TableRow key={reserva.id}>
                        <TableCell>{reserva.produto}</TableCell>
                        <TableCell>{reserva.pedido}</TableCell>
                        <TableCell>{reserva.quantidadeReservada}</TableCell>
                        <TableCell>{reserva.dataReserva}</TableCell>
                        <TableCell>
                            <Badge variant={statusConfig[reserva.status]?.variant || 'pending'}>
                                {statusConfig[reserva.status]?.label || 'Pendente'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {reserva.status === 'active' && (
                                <ActionButton
                                    label="Liberar Reserva"
                                    icon="✕"
                                    onClick={() => handleLiberarReserva(reserva.id)}
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

