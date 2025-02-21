import React from "react";  
import "./DoctorCard.css";
import { Doctor } from "./contexts/DoctorContext"; // Importa la interfaz Doctor  

// Definir la interfaz para las props del componente DoctorCard  
interface DoctorCardProps extends Pick<Doctor, 'name' | 'specialty' | 'experience' | 'availability' | 'contact' | 'schedule' | 'image'> {}  

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, experience, availability, contact, schedule, image }) => {  
    return (  
        <div className="doctor-card">  
            <img src={image} alt={`Imagen de ${name}`} className="doctor-image" />  
            <h2>{name}</h2>  
            <p>  
                <strong>Especialidad:</strong> {specialty}  
            </p>  
            <p>  
                <strong>Años de experiencia:</strong> {experience}  
            </p>  
            <p>  
                <strong>Disponibilidad:</strong> {availability}  
            </p>  
            <div>  
                <p>  
                    <strong>Horarios:</strong>  
                </p>  
                <ul>  
                    {Object.entries(schedule).map(([day, hours]) => (  
                        <li key={day}>  
                            <strong>{day.charAt(0).toUpperCase() + day.slice(1)}:</strong> {hours}  
                        </li>  
                    ))}  
                </ul>  
            </div>  
            <div>  
                <p>  
                    <strong>Contacto:</strong>  
                </p>  
                <p>  
                    <strong>Teléfono:</strong> {contact.telefono}  
                </p>  
                <p>  
                    <strong>Email:</strong> {contact.email}  
                </p>  
            </div>  
        </div>  
    );  
};  

export default DoctorCard;