const API_BASE_URL = 'http://localhost:3000/api'; 

interface RequestOptions extends RequestInit {
    headers?: HeadersInit;
}

async function request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro na requisição');
        }
        
        return data;
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export const api = {
    get: (endpoint: string) => request(endpoint, { method: 'GET' }),
    
    post: (endpoint: string, data: any) => request(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    put: (endpoint: string, data: any) => request(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
};

export default api;
