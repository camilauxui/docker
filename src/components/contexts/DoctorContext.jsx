import React, { createContext, useContext, useState } from 'react';  

export const DoctorContext = createContext();  

export function useDoctor() {  
    return useContext(DoctorContext);  
}  

export const DoctorProvider = ({ children }) => {  
    const [doctors, setDoctors] = useState([  
        { id: 1, name: 'Dr. Juan Pérez', specialty: 'Cardiología' },  
        { id: 2, name: 'Dr. María Rodríguez', specialty: 'Pediatría' },  
        { id: 3, name: 'Dr. Pedro González', specialty: 'Medicina General' }  
    ]);  

    return (  
        <DoctorContext.Provider value={{ doctors, setDoctors }}>  
            {children}  
        </DoctorContext.Provider>  
    );  
};  

export default DoctorProvider;