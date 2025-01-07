// src/views/AppointmentView.jsx  
import React from 'react';  
import AppointmentForm from '../components/AppointmentForm';  

const AppointmentView = () => {  
    return (  
        <div className="appointment-view">  
            <h1>Agendar Cita</h1>  
            <AppointmentForm />  
        </div>  
    );  
};  

export default AppointmentView;
