import React from "react";  
import DoctorList from "../components/DoctorList";  

const TeamView: React.FC = () => {  
  return (  
    <div className="team-view-container">  
      <h1 className="team-view-title text-center">Equipo Médico</h1>  
      <div className="team-view-content">  
        <DoctorList />  
      </div>  
    </div>  
  );  
};  

export default TeamView;