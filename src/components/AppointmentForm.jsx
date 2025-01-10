// AppointmentForm.js  
import React, { useRef, useEffect } from 'react';  
import withForm from './withForm';   
import './AppointmentForm.css';   

const AppointmentForm = ({ formData, errorMessage, confirmationMessage, handleChange, handleSubmit }) => {  
    const nameInputRef = useRef(null); // Crear una referencia para el campo de nombre  

    useEffect(() => {  
        // Enfocar el campo de nombre cuando el componente se monta  
        nameInputRef.current.focus();  
    }, []);  

    const onSubmit = (data) => {  
        console.log('Cita agendada:', data);  

        // Mensaje de confirmación  
        const message = `Nombre del paciente: ${data.name}. Usted tiene cita con ${data.doctor} el día ${data.date} a las ${data.time}.`;  
        alert(message); // O puedes usar setConfirmationMessage si lo deseas  
    };  

    return (  
        <section id="appointment" className="appointment-form">  
            <h2>Agenda Virtual</h2>  
            <p> Ingrese los datos del paciente para reservar su cita médica:</p>
            <br />  
            <form onSubmit={(e) => handleSubmit(e, onSubmit)}>  
                <>   
                <div>  
                    <label htmlFor="name">Nombre del paciente: </label>  
                    <input  
                        type="text"  
                        id="name"  
                        name="name"  
                        value={formData.name}  
                        onChange={handleChange}  
                        ref={nameInputRef}  
                        required  
                    />  
                </div>  
    
                    <div>  
                        <label htmlFor="email">Email del paciente:</label>  
                        <input  
                            type="email"  
                            id="email"  
                            name="email"  
                            value={formData.email}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
    
                    <div>  
                        <label htmlFor="phone">Teléfono de contacto:</label>  
                        <input  
                            type="tel"  
                            id="phone"  
                            name="phone"  
                            value={formData.phone}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
    
                    <div>  
                        <label htmlFor="doctor">Profesional:</label>  
                        <select  
                            id="doctor"  
                            name="doctor"  
                            value={formData.doctor}  
                            onChange={handleChange}  
                            required  
                        >  
                            <option value="">Seleccione un médico</option>  
                            <option value="Dr. Patricio Martínez">Dr. Patricio Martínez - Cardiología</option>  
                            <option value="Dra. Matilde Silva">Dra. Matilde Silva - Pediatría</option>  
                            <option value="Dr. Carlos Andrés Ruiz">Dr. Carlos Andrés Ruiz - Neurología</option>  
                        </select>  
                    </div>  
    
                    <div>  
                        <label htmlFor="date">Fecha:</label>  
                        <input  
                            type="date"  
                            id="date"  
                            name="date"  
                            value={formData.date}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
    
                    <div>  
                        <label htmlFor="time">Hora de la consulta médica:</label>  
                        <input  
                            type="time"  
                            id="time"  
                            name="time"  
                            value={formData.time}  
                            onChange={handleChange}  
                            required  
                        />  
                    </div>  
                </>  
    
                <button type="submit">Agendar Cita</button>  
            </form>  
    
            {errorMessage && <div className="error-message">{errorMessage}</div>}  
            {confirmationMessage && (  
                <div className="confirmation-message">  
                    <h3>Su hora médica ha sido agendada correctamente</h3>  
                    <p>{confirmationMessage}</p>  
                </div>  
            )}  
        </section>  
    );  
};  

// Usar el HOC con los datos iniciales  
const initialFormData = { name: '', email: '', phone: '', doctor: '', date: '', time: '' };  
export default withForm(AppointmentForm, initialFormData);