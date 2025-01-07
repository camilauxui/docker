import React from 'react';  
import PropTypes from 'prop-types';  
import './DoctorCard.css'; 

const DoctorCard = ({ name, specialty, experience, availability, contact, schedule, image }) => {
    return (
        <div className="doctor-card">
            <img src={image} alt={`Imagen de ${name}`} className="doctor-image" />
            <h2>{name}</h2>
            <p><strong>Especialidad:</strong> {specialty}</p>
            <p><strong>Años de experiencia:</strong> {experience}</p>
            <p><strong>Disponibilidad:</strong> {availability}</p>
            <div>
                <p><strong>Horarios:</strong></p>
                    {Object.entries(schedule).map(([day, hours]) => (
                        <li key={day}><strong>{day.charAt(0)+ day.slice(1)}:</strong> {hours}</li>
                    ))}
               
            </div>
            <div>
                <p><strong>Contacto:</strong></p>
                <p><strong>Teléfono:</strong> {contact.telefono}</p>
                <p><strong>Email:</strong> {contact.email}</p>
            </div>
        </div>
    );
};

DoctorCard.propTypes = {
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    availability: PropTypes.string.isRequired,
    contact: PropTypes.shape({
        telefono: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }).isRequired,
    schedule: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired
};

export default DoctorCard;
