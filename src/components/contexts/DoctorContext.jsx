import React, { createContext, useContext, useState } from 'react';  
import doc1 from '../../assets/doc1.jpg';  
import doc2 from '../../assets/doc2.jpg';  
import dra1 from '../../assets/dra1.jpg';  
import dra2 from '../../assets/dra2.jpg'; 

export const DoctorContext = createContext();  

export function useDoctor() {  
    return useContext(DoctorContext);  
}  

export const DoctorProvider = ({ children }) => {  
    const [doctors, setDoctors] = useState([  
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

    return (  
        <DoctorContext.Provider value={{ doctors, setDoctors }}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};  

export default DoctorProvider;