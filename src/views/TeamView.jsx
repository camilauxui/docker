import React, { useContext } from 'react'; 

import {DoctorContext } from '../components/contexts/DoctorContext';

const TeamView = () => {  
    const { doctors } = useContext(DoctorContext);  

    return (  
        <div className="team-view">  
            <h1>Equipo Médico</h1>  
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
        </div>  
    );  
};  

export default TeamView;