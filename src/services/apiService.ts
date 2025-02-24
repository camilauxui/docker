// apiService.ts  
const BASE_URL = 'http://localhost:3001'; // Reemplaza con la URL de tu API  
import { generateToken } from '../utils/generateToken';  

interface RequestOptions extends RequestInit {  
    requireAuth?: boolean; // Indica si la petición requiere autenticación  
}  

const get = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {  
    const { requireAuth = false } = options;  
    const token = localStorage.getItem('token');  

    const headers: HeadersInit = {  
        'Content-Type': 'application/json',  
        ...(requireAuth && token ? { 'Authorization': `Bearer ${token}` } : {}), // Agrega el token si es necesario  
    };  

    try {  
        const response = await fetch(`${BASE_URL}${endpoint}`, {  
            method: 'GET',  
            headers: headers,  
            ...options, // Permite pasar otras opciones como mode, cache, etc.  
        });  

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {  
                // Token inválido o expirado, redirige al login o maneja el error  
                localStorage.removeItem('token');  
                window.location.href = '/login'; // Redirige a la página de inicio de sesión  
                throw new Error('No autorizado');  
            }  
            throw new Error(`Error al realizar la solicitud: ${response.status} ${response.statusText}`);  
        }  

        return await response.json() as T;  
    } catch (error: any) {  
        console.error(`Error en la petición GET a ${endpoint}:`, error);  
        throw error;  
    }  
};  

const post = async <T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T | null> => {  
    const { requireAuth = false } = options;  
    const token = localStorage.getItem('token');  

    const headers: HeadersInit = {  
        'Content-Type': 'application/json',  
        ...(requireAuth && token ? { 'Authorization': `Bearer ${token}` } : {}), // Agrega el token si es necesario  
    };  

    try {  
      let response;  
        if (endpoint === '/auth/login') {  
            // Simula la autenticación buscando el usuario en db.json  
            const usersResponse = await fetch(`${BASE_URL}/users?username=${data.username}`);  
            const users = await usersResponse.json();  

            if (users.length > 0 && users[0].password === data.password) {  
                // Simula la creación de un token  
                const token = generateToken({ userId: users[0].id, name: users[0].name });  
                return { token } as T;  
            } else {  
                return null; // Credenciales inválidas  
            }  
        } else {  
             response = await fetch(`${BASE_URL}${endpoint}`, {  
                method: 'POST',  
                headers: headers,  
                body: JSON.stringify(data),  
                ...options, // Permite pasar otras opciones como mode, cache, etc.  
            });  

            if (!response.ok) {  
                if (response.status === 401 || response.status === 403) {  
                    // Token inválido o expirado, redirige al login o maneja el error  
                    localStorage.removeItem('token');  
                    window.location.href = '/login'; // Redirige a la página de inicio de sesión  
                    throw new Error('No autorizado');  
                }  
                throw new Error(`Error al realizar la solicitud: ${response.status} ${response.statusText}`);  
            }  

            return await response.json() as T;  
        }  
    } catch (error: any) {  
        console.error(`Error en la petición POST a ${endpoint}:`, error);  
        throw error;  
    }  
};  

const put = async <T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> => {  
    const { requireAuth = false } = options;  
    const token = localStorage.getItem('token');  

    const headers: HeadersInit = {  
        'Content-Type': 'application/json',  
        ...(requireAuth && token ? { 'Authorization': `Bearer ${token}` } : {}),  
    };  

    try {  
        const response = await fetch(`${BASE_URL}${endpoint}`, {  
            method: 'PUT',  
            headers: headers,  
            body: JSON.stringify(data),  
            ...options,  
        });  

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {  
                localStorage.removeItem('token');  
                window.location.href = '/login';  
                throw new Error('No autorizado');  
            }  
            throw new Error(`Error al realizar la solicitud PUT a ${endpoint}: ${response.status} ${response.statusText}`);  
        }  

        return await response.json() as T;  
    } catch (error: any) {  
        console.error(`Error en la petición PUT a ${endpoint}:`, error);  
        throw error;  
    }  
};  

const del = async <T>(endpoint: string, options: RequestOptions = {}): Promise<T | undefined> => {  
    const { requireAuth = false } = options;  
    const token = localStorage.getItem('token');  

    const headers: HeadersInit = {  
        'Content-Type': 'application/json',  
        ...(requireAuth && token ? { 'Authorization': `Bearer ${token}` } : {}),  
    };  

    try {  
        const response = await fetch(`${BASE_URL}${endpoint}`, {  
            method: 'DELETE',  
            headers: headers,  
            ...options,  
        });  

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {  
                localStorage.removeItem('token');  
                window.location.href = '/login';  
                throw new Error('No autorizado');  
            }  
            throw new Error(`Error al realizar la solicitud DELETE a ${endpoint}: ${response.status} ${response.statusText}`);  
        }  

        const text = await response.text();  
        return text ? JSON.parse(text) as T : undefined;  
    } catch (error: any) {  
        console.error(`Error en la petición DELETE a ${endpoint}:`, error);  
        throw error;  
    }  
};  

// Define las funciones específicas que necesitas  
export const fetchDoctors = async () => {  
    return get<any[]>('/doctors', { requireAuth: true }); // Ajusta el endpoint según tu API  
};  

export const createAppointment = async (appointmentData: any) => {  
    return post<any>('/appointments', appointmentData, { requireAuth: true }); // Ajusta el endpoint según tu API  
};  

export { get, post, put, del };