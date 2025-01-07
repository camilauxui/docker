import React from 'react';   
import DoctorList from '../components/DoctorList';  

const TeamView = () => {  
    return (  
        <div className="team-view">  
            <h1>Equipo Médico</h1>  
            <DoctorList /> 
        </div>  
    );  
};  

export default TeamView;