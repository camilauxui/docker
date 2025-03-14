const EXPRESS_BASE_URL = 'http://localhost:3000'; // Servidor Express (autenticación y JWT)  
const JSON_SERVER_BASE_URL = 'http://localhost:3001'; // Servidor JSON (datos de doctores y citas)  

interface RequestOptions extends RequestInit {  
    requireAuth?: boolean; // Indica si la petición requiere autenticación  
}  

// Función para realizar la solicitud a la API  
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
                alert('Tu sesión ha expirado. Por favor, inicie sesión nuevamente.');  
                localStorage.removeItem('token');  
                throw new Error('No autorizado');  
            }  
            const errorText = await response.text();  
            alert(`Error en la solicitud: ${response.statusText} - ${errorText}`); // Muestra el error en una alerta  
            throw new Error(`HTTP error! Status: ${response.status}`);  
        }  

        try {  
            return await response.json();  
        } catch (error) {  
            console.error("Error parsing JSON:", error);  
            // Manejo de error para análisis de JSON  
            let errorMessage: string;  
            if (error instanceof Error) {  
                errorMessage = error.message;  
            } else {  
                errorMessage = 'Error desconocido al intentar analizar la respuesta.';  
            }  
            alert(`Error al analizar la respuesta: ${errorMessage}`); // Mostrar alerta si hay un error al analizar el JSON  
            throw new Error(`Error parsing JSON: ${errorMessage}`);  
        }  

    } catch (error: any) {  
        console.error(`Error al realizar la solicitud:`, error);  
        alert("Se produjo un error al conectar con la API. Intente nuevamente más tarde."); // Mensaje genérico para el usuario  
        throw error;  
    }  
};  

// Función para realizar una solicitud POST  
export const post = async <T>(endpoint: string, data: any, requireAuth = false): Promise<T> => {  
    let baseURL = JSON_SERVER_BASE_URL;  
    if (endpoint === '/login' || endpoint === '/register') {  
        baseURL = EXPRESS_BASE_URL;  
        requireAuth = false; // Asegúrate de que requireAuth sea false para login/register  
    }  
    return request(baseURL, endpoint, { method: 'POST', body: JSON.stringify(data), requireAuth });  
};  

// Función para realizar una solicitud GET  
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