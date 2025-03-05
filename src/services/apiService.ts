const EXPRESS_BASE_URL = 'http://localhost:3000'; // Servidor Express (autenticación y JWT)  
const JSON_SERVER_BASE_URL = 'http://localhost:3001'; // Servidor JSON (datos de doctores y citas)  

interface RequestOptions extends RequestInit {  
    requireAuth?: boolean; // Indica si la petición requiere autenticación  
}  

const request = async <T>(baseURL: string, endpoint: string, options: RequestOptions): Promise<T> => {  
    const { requireAuth = false } = options;  
    const token = localStorage.getItem('token');  
    const headers: HeadersInit = {  
        'Content-Type': 'application/json',  
        ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),  
    };  

    try {  
        const response = await fetch(`${baseURL}${endpoint}`, {  
            ...options,  
            headers,  
        });  

        if (!response.ok) {  
            if (response.status === 401 || response.status === 403) {  
                alert('No autorizado. Por favor, inicie sesión.');  
                localStorage.removeItem('token');  
                throw new Error('No autorizado');  
            }  
            throw new Error(`HTTP error! Status: ${response.status}`);  
        }  

        try {  
            return await response.json();  
        } catch (jsonError) {  
            console.error("Error parsing JSON:", jsonError);  
            throw new Error(`Error parsing JSON: ${jsonError}`);  
        }  

    } catch (error: any) {  
        console.error(`Error al realizar la solicitud:`, error);  
        throw error;  
    }  
};  

export const post = async <T>(endpoint: string, data: any, requireAuth = false): Promise<T> => {  
    let baseURL = JSON_SERVER_BASE_URL;  
    if (endpoint === '/login' || endpoint === '/register') {  
        baseURL = EXPRESS_BASE_URL;  
        requireAuth = false; // Ensure requireAuth is false for login/register  
    }  
    return request(baseURL, endpoint, { method: 'POST', body: JSON.stringify(data), requireAuth });  
};  

export const get = async <T>(endpoint: string, requireAuth = false): Promise<T> => {  
    const baseURL = endpoint.startsWith('/doctors') ? EXPRESS_BASE_URL : JSON_SERVER_BASE_URL;  
    return request(baseURL, endpoint, { method: 'GET', requireAuth });  
};  

// Función para obtener la lista de doctores  
export const fetchDoctors = async () => {  
    const endpoint = '/doctors'; // Endpoint para obtener doctores  
    return get<any[]>(endpoint, true);  
};  

// Función para crear una cita  
export const createAppointment = async (appointmentData: any) => {  
    const endpoint = '/appointments'; // Endpoint para crear citas  
    return post<any>(endpoint, appointmentData, true); // Enviamos la cita usando el método POST  
};