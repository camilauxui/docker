import React, { createContext, useState } from 'react';

// Crear contexto  
export const DoctorContext = createContext();  

// Proveedor del contexto  
export const DoctorProvider = ({ children }) => {  
    const [doctors, setDoctors] = useState([]);   

    return (  
        <DoctorContext.Provider value={{ doctors, setDoctors }}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};