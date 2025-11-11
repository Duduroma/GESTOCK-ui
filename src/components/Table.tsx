interface TableProps {
    headers: string[];
    children: React.ReactNode;
}

function Table({ headers, children }: TableProps): React.ReactElement {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse'
            }}>
                <thead>
                    <tr style={{
                        backgroundColor: '#f9fafb',
                        borderBottom: '1px solid #e5e7eb'
                    }}>
                        {headers.map((header, index) => (
                            <th key={index} style={{
                                padding: '16px',
                                textAlign: 'left',
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
}

interface TableRowProps {
    children: React.ReactNode;
}

function TableRow({ children }: TableRowProps): React.ReactElement {
    return (
        <tr style={{
            borderBottom: '1px solid #e5e7eb'
        }}>
            {children}
        </tr>
    );
}

interface TableCellProps {
    children: React.ReactNode;
}

function TableCell({ children }: TableCellProps): React.ReactElement {
    return (
        <td style={{
            padding: '16px',
            fontSize: '14px',
            color: '#1f2937'
        }}>
            {children}
        </td>
    );
}

export { Table, TableRow, TableCell };

