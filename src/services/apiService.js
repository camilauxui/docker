import axios from 'axios';  

const API_URL = '/api';  

const apiRequest = async (method, url, data = null) => {  
    try {  
        const response = await axios({  
            method,  
            url: `${API_URL}${url}`,  
            data,  
        });  
        return response.data;  
    } catch (error) {  
        console.error(`Error en la solicitud ${method} ${url}:`, error);  
        throw new Error(`Error al realizar la solicitud ${method} ${url}`);  
    }  
};  

export const fetchDoctors = async () => {  
    try {  
      const response = await axios.get(`${API_URL}/doctors`); // Asegúrate de que la URL sea correcta  
      return response.data || []; // Devuelve los datos directamente  
    } catch (error) {  
      console.error("Error al cargar los doctores:", error);  
      throw error; // Lanza el error si ocurre algo  
    }  
  }; 
export const createAppointment = async (appointmentData) => apiRequest('post', '/appointments', appointmentData);  
export const updateAppointment = async (id, appointmentData) => apiRequest('put', `/appointments/${id}`, appointmentData);  
export const deleteAppointment = async (id) => apiRequest('delete', `/appointments/${id}`);  
export const fetchPatients = async () => apiRequest('get', '/patients');