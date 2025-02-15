// TeamView.jsx  
import React from 'react';  
import DoctorList from '../components/DoctorList';  
import '../components/DoctorCard.css';  

const TeamView = () => {  
    return (  
        <>  
            <h1>Equipo Médico</h1>  
            <br />  
            <DoctorList />  
        </>  
    );  
};  

export default TeamView;