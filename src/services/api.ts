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
        
        // Verificar o Content-Type antes de tentar fazer parse JSON
        const contentType = response.headers.get('content-type');
        let data: any;
        
        if (contentType && contentType.includes('application/json')) {
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('❌ [API] Erro ao fazer parse do JSON:', jsonError);
                const text = await response.text();
                console.error('❌ [API] Resposta em texto:', text);
                throw new Error(text || 'Erro ao processar resposta do servidor');
            }
        } else {
            // Se não for JSON, ler como texto
            const text = await response.text();
            if (!response.ok) {
                throw new Error(text || 'Erro na requisição');
            }
            return text;
        }
        
        console.log('📦 [API] Dados da resposta (raw):', data);
        console.log('📦 [API] Tipo da resposta:', typeof data);
        console.log('📦 [API] É array?', Array.isArray(data));
        
        if (data && typeof data === 'object') {
            console.log('📦 [API] Keys da resposta:', Object.keys(data));
            if (Array.isArray(data)) {
                console.log('📦 [API] Tamanho do array:', data.length);
                if (data.length > 0) {
                    console.log('📦 [API] Primeiro item:', data[0]);
                }
            } else if ('content' in data) {
                console.log('📦 [API] Content (array):', data.content);
                console.log('📦 [API] Total de elementos:', data.totalElements);
                console.log('📦 [API] Tamanho do content:', Array.isArray(data.content) ? data.content.length : 'não é array');
            }
        }
        
        if (!response.ok) {
            console.error('❌ [API] Erro na resposta:', data);
            
            if (response.status === 401) {
                console.error('❌ [API] Não autorizado (401). Redirecionando para o login.');
                localStorage.removeItem('authToken');
                const currentPath = window.location.pathname;
                if (currentPath !== '/login' && currentPath !== '/cadastro') {
                    window.location.href = '/login';
                }
            }
            
            // Tratar diferentes formatos de erro
            const errorMessage = data?.message || data?.error || (typeof data === 'string' ? data : 'Erro na requisição');
            throw new Error(errorMessage);
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
