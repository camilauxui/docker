import React, { createContext, useState } from 'react';

export const DoctorContext = createContext();  

export const DoctorProvider = ({ children }) => {  
    const [doctors, setDoctors] = useState([]);   

    return (  
        <DoctorContext.Provider value={{ doctors, setDoctors }}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};