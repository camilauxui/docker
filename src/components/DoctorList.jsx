import React, { useContext, useEffect, Profiler } from 'react';  
import DoctorCard from './DoctorCard';  
import { DoctorContext } from './contexts/DoctorContext';   
import './DoctorList.css';

const DoctorList = () => {  
    const { doctors, setDoctors } = useContext(DoctorContext);  

    useEffect(() => {  
        const loadDoctors = async () => {  
            try {  
                const response = await fetch('/data/doctors.json'); 
                if (!response.ok) {  
                    throw new Error('Network response was not ok');
                }  
                const doctorsData = await response.json(); 
                setDoctors(doctorsData);  
            } catch (error) {  
                console.error('Error al cargar información de los doctores:', error);  
            }  
        };  

        loadDoctors(); // Cargar los doctores   
    }, [setDoctors]);  

    // Función para registrar las medidas del Profiler  
    const onRender = (id, phase, actualDuration, baseDuration) => {  
        console.log(`Rendered ${id} during ${phase} phase. Actual duration: ${actualDuration}ms, Base duration: ${baseDuration}ms`);  
    };  

    return (  
        <Profiler id="DoctorList" onRender={onRender}>  
            <div className="doctor-cards-container">  {/* Este contenedor es clave */}  
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