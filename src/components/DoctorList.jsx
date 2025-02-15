import React, { useContext, Profiler } from "react";  
import DoctorCard from "./DoctorCard";  
import { DoctorContext } from "./contexts/DoctorContext";  
import "./DoctorList.css";  

const DoctorList = () => {  
    const { doctors } = useContext(DoctorContext); // Accedemos a la lista de doctores desde el contexto  

    // Función para registrar las medidas del Profiler  
    const onRender = (id, phase, actualDuration, baseDuration) => {  
        console.log(  
            `Rendered ${id} during ${phase} phase. Actual duration: ${actualDuration}ms, Base duration: ${baseDuration}ms`  
        );  
    };  

    return (  
        <Profiler id="DoctorList" onRender={onRender}>  
            <div className="doctor-cards-container">  
                {doctors.length > 0 ? (  
                    doctors.map((doctor) => (  
                        <DoctorCard  
                            key={doctor.id}  
                            name={doctor.name}  
                            specialty={doctor.specialty}  
                            experience={doctor.experience}  
                            availability={doctor.availability}  
                            contact={doctor.contact}  
                            schedule={doctor.schedule}  
                            image={doctor.image}  
                        />  
                    ))  
                ) : (  
                    <p>No hay doctores disponibles.</p>  
                )}  
            </div>  
        </Profiler>  
    );  
};  

export default DoctorList;