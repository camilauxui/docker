// App.jsx
import React, { useState } from 'react';  
import { DoctorProvider } from './components/contexts/DoctorContext'; // Importar el Provider
import ServiceList from './components/ServiceList';   
import DoctorList from './components/DoctorList';   
import AppointmentForm from './components/AppointmentForm';  
import servicesData from './servicesData';


function App() {  
    return (  
        <>  <div>
            <h1>Centro Médico</h1>  
            <ServiceList services={servicesData} /> 
            <DoctorProvider>   
                <DoctorList />  
                <AppointmentForm />  
            </DoctorProvider> 
             </div>
        </>  
    );  
}  

export default App;  