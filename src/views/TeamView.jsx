import React from 'react';   
import DoctorList from '../components/DoctorList';  

const TeamView = () => {  
    return (  
        <>  {/* Mejora: Usa un fragmento para evitar un div innecesario */}  
            <h1>Equipo Médico</h1>  
            <DoctorList />
        </>  
    );  
};  

export default TeamView;