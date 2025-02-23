import axios, { AxiosResponse } from 'axios';  

const API_URL = '/api';  

interface ApiResponse<T> {  
  data: T;  
}  

const apiRequest = async <T>(method: string, url: string, data: any = null): Promise<T> => {  
  try {  
    const response: AxiosResponse<T> = await axios({  
      method,  
      url: `${API_URL}${url}`,  
      data,  
    });  
    return response.data;  
  } catch (error: any) {  
    console.error(`Error en la solicitud ${method} ${url}:`, error);  
    throw new Error(`Error al realizar la solicitud ${method} ${url}`);  
  }  
};  

export interface Doctor {  
  id: number;  
  name: string;  
  specialty: string;  
  // ... otras propiedades del doctor  
}  

export const fetchDoctors = async (): Promise<Doctor[]> => {  
  try {  
    const response: AxiosResponse<Doctor[]> = await axios.get<Doctor[]>(`${API_URL}/doctors`);  
    return response.data || []; // Devuelve los datos directamente  
  } catch (error: any) {  
    console.error("Error al cargar los doctores:", error);  
    throw error; // Lanza el error si ocurre algo  
  }  
};  

export interface AppointmentData {  
  // Define la estructura de los datos de la cita  
  doctorId: number;  
  patientName: string;  
  date: string;  
  // ... otras propiedades de la cita  
}  

export const createAppointment = async (appointmentData: AppointmentData): Promise<any> => apiRequest<any>('post', '/appointments', appointmentData);  

export const updateAppointment = async (id: string | number, appointmentData: AppointmentData): Promise<any> => apiRequest<any>('put', `/appointments/${id}`, appointmentData);  

export const deleteAppointment = async (id: string | number): Promise<void> => apiRequest<void>('delete', `/appointments/${id}`);  

export interface Patient {  
  id: number;  
  name: string;  
  // ... otras propiedades del paciente  
}  
export const fetchPatients = async (): Promise<Patient[]> => apiRequest<Patient[]>('get', '/patients');