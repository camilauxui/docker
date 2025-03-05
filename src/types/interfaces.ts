export interface Doctor {  
  id: number;  
  name: string;  
  specialty: string;  
}  

export interface AppointmentFormValues {  
  name: string;  
  email: string;  
  phone: string;  
  doctor: string;  
  date: string;  
  time: string;  
}  

export interface Confirmation {  
  name: string;  
  doctor: string;  
  date: string;  
  time: string;  
}