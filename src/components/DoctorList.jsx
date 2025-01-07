import React, { useContext, useEffect, Profiler } from 'react';  
import DoctorCard from './DoctorCard';  
import { DoctorContext } from './contexts/DoctorContext';   

const DoctorList = () => {  
    const { doctors, setDoctors } = useContext(DoctorContext);  

    useEffect(() => {  
        const loadDoctors = () => {  
            const doctorsData = [  
                { id: 1, name: "Dr. Patricio Martínez", specialty: "Cardiología", experience: 4, availability: "Lunes y viernes", contact: { telefono: "123-456-7890", email: "p.martinez@centromedico.com" }, schedule: { lunes: "9:00 AM - 3:00 PM", viernes: "10:00 AM - 1:00 PM" }, image: 'src/assets/doc1.jpg' },  
                { id: 2, name: "Dra. Matilde Silva", specialty: "Pediatría", experience: 3, availability: "Martes y sábado", contact: { telefono: "+56 9 98765432", email: "m.silva@centromedico.com" }, schedule: { martes: "09:00 - 13:00", sabado: "09:00 - 12:00" }, image: 'src/assets/dra1.jpg' },  
                { id: 3, name: "Dr. Carlos Andrés Ruiz", specialty: "Neurología", experience: 26, availability: "Lunes y jueves", contact: { telefono: "+56 9 13579135", email: "c.ruiz@centromedico.com" }, schedule: { lunes: "08:00 - 12:00", jueves: "14:00 - 18:00" }, image: 'src/assets/doc2.jpg' },   
                { id: 4, name: "Dra. Andrea Moraga", specialty: "Dermatología", experience: 15, availability: "Martes y viernes", contact: { telefono: "+56 9 98765444", email: "a.moraga@centromedico.com" }, schedule: { martes: "09:00 - 13:00", viernes: "09:00 - 12:00" }, image: 'src/assets/dra2.jpg' },  
            ];  
            setDoctors(doctorsData);  
        };  

        loadDoctors(); // Cargar los doctores al montar el componente  
    }, [setDoctors]);  

    // Función para registrar las medidas del Profiler  
    const onRender = (id, phase, actualDuration, baseDuration) => {  
        console.log(`Rendered ${id} during ${phase} phase. Actual duration: ${actualDuration}ms, Base duration: ${baseDuration}ms`);  
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