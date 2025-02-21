// src/types/interfaces.ts  
export interface Confirmation {  
    name: string;  
    doctor: string;  
    date: string;  
    time: string;  
}  

export interface Doctor {  
    id: number;  
    name: string;  
}  

export interface FormData {  
    name: string;  
    email: string;  
    phone: string;  
    doctor: string;  
    date: string;  
    time: string;  
}