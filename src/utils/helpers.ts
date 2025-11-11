export function formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('pt-BR');
}

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}
