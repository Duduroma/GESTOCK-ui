const API_BASE_URL = 'http://localhost:8080/api';

function getAuthToken(): string | null {
    return localStorage.getItem('authToken');
}

interface RequestOptions extends RequestInit {
    headers?: HeadersInit;
    params?: Record<string, string | number | boolean | undefined>;
}

function buildQueryString(params?: Record<string, string | number | boolean | undefined>): string {
    if (!params) return '';
    
    const filtered = Object.entries(params).filter(([_, value]) => value !== undefined && value !== null);
    if (filtered.length === 0) return '';
    
    const query = filtered.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`).join('&');
    return `?${query}`;
}

async function request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const { params, ...fetchOptions } = options;
    const queryString = buildQueryString(params);
    const url = `${API_BASE_URL}${endpoint}${queryString}`;
    
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };
    
    const config: RequestInit = {
        ...fetchOptions,
        headers,
    };

    console.log('🌐 [API] Fazendo requisição:', {
        method: config.method || 'GET',
        url: url,
        headers: headers,
        body: config.body ? JSON.parse(config.body as string) : undefined
    });

    try {
        const response = await fetch(url, config);
        
        console.log('📥 [API] Resposta recebida:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries())
        });
        
        if (response.status === 204) {
            console.log('✅ [API] Resposta 204 (No Content)');
            return null;
        }
        
        const data = await response.json();
        console.log('📦 [API] Dados da resposta:', data);
        
        if (!response.ok) {
            console.error('❌ [API] Erro na resposta:', data);
            throw new Error(data.message || 'Erro na requisição');
        }
        
        console.log('✅ [API] Requisição bem-sucedida');
        return data;
    } catch (error) {
        console.error('❌ [API] Erro na requisição:', error);
        console.error('❌ [API] URL que falhou:', url);
        throw error;
    }
}

export const api = {
    get: (endpoint: string, params?: Record<string, string | number | boolean | undefined>) => 
        request(endpoint, { method: 'GET', params }),
    
    post: (endpoint: string, data: any) => request(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    
    put: (endpoint: string, data: any) => request(endpoint, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    
    patch: (endpoint: string, data?: any) => request(endpoint, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
    }),
    
    delete: (endpoint: string) => request(endpoint, { method: 'DELETE' }),
};

export default api;
