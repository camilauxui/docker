// DoctorProvider.jsx  
import React, { createContext, useContext, useState } from 'react';  

export const DoctorContext = createContext();  

export function useDoctor() {  
    return useContext(DoctorContext);  
}  

export const DoctorProvider = ({ children }) => {  
    const [doctors, setDoctors] = useState([  
        {  
            id: 1,  
            name: 'Dr. Juan Pérez',  
            specialty: 'Cardiología',  
            experience: '20 años',  
            availability: 'Lunes a Viernes',  
            contact: 'juan.perez@hospital.com',  
            schedule: '8:00 AM - 5:00 PM',  
            image: 'juan-perez.jpg'  
        },  
        {  
            id: 2,  
            name: 'Dr. María Rodríguez',  
            specialty: 'Pediatría',  
            experience: '15 años',  
            availability: 'Lunes a Sábado',  
            contact: 'maria.rodriguez@hospital.com',  
            schedule: '8:00 AM - 2:00 PM',  
            image: 'maria-rodriguez.jpg'  
        },  
        {  
            id: 3,  
            name: 'Dr. Pedro González',  
            specialty: 'Medicina General',  
            experience: '12 años',  
            availability: 'Lunes a Viernes',  
            contact: 'pedro.gonzalez@hospital.com',  
            schedule: '8:00 AM - 5:00 PM',  
            image: 'pedro-gonzalez.jpg'  
        }  
    ]);  

    return (  
        <DoctorContext.Provider value={{ doctors, setDoctors }}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};  

export default DoctorProvider;