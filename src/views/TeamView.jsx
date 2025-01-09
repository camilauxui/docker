import React from 'react';   
import DoctorList from '../components/DoctorList';  
import '../components/DoctorCard.css'; 

const TeamView = () => {  
    return (  
        <>  {/* Mejora: Usa un fragmento para evitar un div innecesario */}  
            <h1>Equipo Médico</h1>  
            <br />
            <DoctorList />
        </>  
    );  
};  

export default TeamView;