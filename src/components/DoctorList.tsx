import React, { useContext, Profiler } from "react";  
import DoctorCard from "./DoctorCard";  
import { DoctorContext, Doctor } from "./contexts/DoctorContext";  
import "./DoctorList.css";

const DoctorList: React.FC = () => {  
  const { doctors } = useContext(DoctorContext) as { doctors: Doctor[] };  

  const onRender = (  
    id: string,  
    phase: "mount" | "update" | "nested-update",  
    actualDuration: number,  
    baseDuration: number,  
    startTime: number,  
    commitTime: number  
  ) => {  
    console.log(  
      `Rendered ${id} during ${phase} phase. Actual duration: ${actualDuration}ms, Base duration: ${baseDuration}ms`  
    );  
  };  

  return (  
    <Profiler id="DoctorList" onRender={onRender}>  
      <div className="doctor-cards-container">
        {doctors.map((doctor) => (  
          <DoctorCard key={doctor.id} {...doctor} />  
        ))}  
      </div>  
    </Profiler>  
  );  
};  

export default DoctorList;