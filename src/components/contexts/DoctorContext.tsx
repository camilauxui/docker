import React, { createContext, useContext, useState } from 'react';  
import doc1 from '../../assets/doc1.jpg';  
import doc2 from '../../assets/doc2.jpg';  
import dra1 from '../../assets/dra1.jpg';  
import dra2 from '../../assets/dra2.jpg';  

// Definir la interfaz para la información de contacto  
interface ContactInfo {  
    telefono: string;  
    email: string;  
}  

// Definir la interfaz para el horario  
interface Schedule {  
    lunes?: string;  
    martes?: string;  
    [day: string]: string | undefined; // Permite otros días dinámicamente  
}  

// Definir la interfaz para un doctor  
export interface Doctor {  
    id: number;  
    name: string;  
    specialty: string;  
    experience: string;  
    availability: string;  
    contact: ContactInfo;  
    schedule: Schedule;  
    image: string; // asumiendo que 'image' es la ruta a la imagen  
}  

// Definir la interfaz para el contexto del doctor  
interface DoctorContextProps {  
    doctors: Doctor[];  
    setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;  
}  

// Crear el contexto del doctor con la interfaz DoctorContextProps  
export const DoctorContext = createContext<DoctorContextProps | undefined>(undefined);  

// Hook personalizado para usar el contexto del doctor  
export function useDoctor(): DoctorContextProps {  
    const context = useContext(DoctorContext);  
    if (!context) {  
        throw new Error("useDoctor debe ser usado dentro de un DoctorProvider");  
    }  
    return context;  
}  

// Componente proveedor del contexto del doctor  
export const DoctorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
    const [doctors, setDoctors] = useState<Doctor[]>([  
        {  
            id: 1,  
            name: 'Dr. Alejandro Varas',  
            specialty: 'Cardiología',  
            experience: '20 años',  
            availability: 'Lunes a Viernes',  
            contact: {  
                telefono: '555-1234',  
                email: 'avaras@hospital.com',  
            },  
            schedule: {  
                lunes: '8:00 AM - 2:00 PM',  
                martes: '10:00 AM - 5:00 PM',  
            },  
            image: doc1, // Usando la imagen importada  
        },  
        {  
            id: 2,  
            name: 'Dra. María Rodríguez',  
            specialty: 'Pediatría',  
            experience: '15 años',  
            availability: 'Lunes a Sábado',  
            contact: {  
                telefono: '555-5678',  
                email: 'maria.rodriguez@hospital.com',  
            },  
            schedule: {  
                lunes: '9:00 AM - 1:00 PM',  
                viernes: '8:00 AM - 12:00 PM',  
            },  
            image: dra1, // Usando la imagen importada  
        },  
        {  
            id: 3,  
            name: 'Dr. Pedro González',  
            specialty: 'Medicina General',  
            experience: '12 años',  
            availability: 'Lunes a Viernes',  
            contact: {  
                telefono: '555-8901',  
                email: 'pedro.gonzalez@hospital.com',  
            },  
            schedule: {  
                lunes: '8:00 AM - 4:00 PM',  
                martes: '11:00 AM - 3:00 PM',  
            },  
            image: doc2, // Usando la imagen importada  
        },  
        {  
            id: 4,  
            name: 'Dra. Javiera Mora',  
            specialty: 'Dentista',  
            experience: '12 años',  
            availability: 'Lunes a Viernes',  
            contact: {  
                telefono: '555-1234',  
                email: 'jmora@hospital.com',  
            },  
            schedule: {  
                lunes: '8:00 AM - 2:00 PM',  
                martes: '10:00 AM - 5:00 PM',  
            },  
            image: dra2, // Usando la imagen importada  
        },  
    ]);  

    const value: DoctorContextProps = {  
        doctors,  
        setDoctors,  
    };  

    return (  
        <DoctorContext.Provider value={value}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};  

export default DoctorProvider;