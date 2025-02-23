// types/interfaces.ts  

export interface AppointmentFormValues {  
    name: string;  
    email: string;  
    phone: string;  
    doctor: string; // Nombre del doctor (para mostrar en el formulario)  
    date: string;  
    time: string;  
  }  
  
  export interface Doctor {  
    id: number;  
    name: string;  
    specialty: string;  
  }  
  
  export interface Confirmation {  
    name: string;  
    doctor: string;  
    date: string;  
    time: string;  
  }  
  
  export interface AppointmentData {  
    doctorId: number; // ID del doctor (para enviar al backend)  
    patientName: string;  
    email: string;  
    phone: string;  
    date: string;  
    time: string;  
  }