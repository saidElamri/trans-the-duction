import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function api(endpoint: string, method = 'GET', data: any = {}, token: string | null = null) {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const authToken = token || getToken();
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const config: RequestInit = {
        method,
        headers,
    };

    if (method !== 'GET' && method !== 'HEAD') {
        config.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        if (response.status === 401) {
            // Optional: Handle unauthorized (e.g., clear token, redirect)
            // For now, just return the error
        }

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || 'An error occurred');
        }

        return responseData;
    } catch (error: any) {
        console.error('API Error:', error);
        throw error;
    }
}
