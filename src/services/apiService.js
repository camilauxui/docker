// src/services/apiService.js  
import axios from 'axios';  

const API_URL = 'http://localhost:3001';  

export const fetchDoctors = async () => {  
    try {  
        const response = await axios.get(`${API_URL}/doctors`);  
        return response.data; // Retorna los datos de los doctores  
    } catch (error) {  
        console.error("Error en la solicitud:", error); // Agrega un log para ver el error  
        throw new Error('Error al cargar los doctores'); // Manejo de errores  
    }  
}; 

export const createAppointment = async (appointmentData) => {  
    const response = await axios.post(`${API_URL}/appointments`, appointmentData);  
    return response.data;  
};  

export const updateAppointment = async (id, appointmentData) => {  
    const response = await axios.put(`${API_URL}/appointments/${id}`, appointmentData);  
    return response.data;  
};  

export const deleteAppointment = async (id) => {  
    await axios.delete(`${API_URL}/appointments/${id}`);  
};  

export const fetchPatients = async () => {  
    const response = await axios.get(`${API_URL}/patients`);  
    return response.data;  
};