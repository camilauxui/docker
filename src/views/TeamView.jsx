import React from 'react';   
import DoctorList from '../components/DoctorList';  
import '../components/DoctorCard.css'; 
import { Profiler } from 'react';

const TeamView = () => {  
    const onRender = (id, phase, actualDuration, baseDuration) => {  
        console.log(`Rendered ${id} during ${phase} phase. Actual duration: ${actualDuration}ms, Base duration: ${baseDuration}ms`);  
    };  

    return (  
        <>  
            <h1>Equipo Médico</h1>  
            <br />
            <Profiler id="DoctorList" onRender={onRender}>  
                <DoctorList />  
            </Profiler>  
        </>  
    );  
};  

export default TeamView;  