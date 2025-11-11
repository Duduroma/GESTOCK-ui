interface TabsProps {
    tabs: Array<{ label: string; count?: number }>;
    activeTab: number;
    onTabChange: (index: number) => void;
}

function Tabs({ tabs, activeTab, onTabChange }: TabsProps): React.ReactElement {
    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '2px solid #e5e7eb',
            marginBottom: '24px'
        }}>
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => onTabChange(index)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: activeTab === index ? '2px solid #2563eb' : '2px solid transparent',
                        color: activeTab === index ? '#2563eb' : '#6b7280',
                        fontSize: '14px',
                        fontWeight: activeTab === index ? '600' : '500',
                        cursor: 'pointer',
                        marginBottom: '-2px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {tab.label}
                    {tab.count !== undefined && (
                        <span style={{
                            backgroundColor: activeTab === index ? '#2563eb' : '#9ca3af',
                            color: 'white',
                            borderRadius: '9999px',
                            padding: '2px 8px',
                            fontSize: '12px',
                            fontWeight: '600'
                        }}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}

export default Tabs;

