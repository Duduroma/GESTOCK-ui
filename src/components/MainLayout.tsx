import Sidebar from './Sidebar';
import authService from '../services/auth';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps): React.ReactElement {
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            display: 'flex'
        }}>
            <Sidebar onLogout={handleLogout} />
            
            <main style={{
                marginLeft: '280px',
                flex: 1,
                padding: '32px',
                minHeight: '100vh'
            }}>
                {children}
            </main>

            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 1000
            }}>
                <span style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    ?
                </span>
            </div>
        </div>
    );
}

export default MainLayout;

