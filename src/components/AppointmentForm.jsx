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
            <h2>Agendar cita médica</h2>  
            <form onSubmit={(e) => handleSubmit(e, onSubmit)}>  
                <div>  
                    <label htmlFor="name">Nombre:</label>  
                    <input  
                        type="text"  
                        id="name"  
                        name="name"  
                        value={formData.name}  
                        onChange={handleChange}  
                        ref={nameInputRef} // Asignar la referencia al campo de nombre  
                        required  
                    />  
                </div>  
                
                <div>  
                    <label htmlFor="email">Email:</label>  
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
                    <label htmlFor="phone">Teléfono:</label>  
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
                    <label htmlFor="doctor">Doctor:</label>  
                    <select  
                        id="doctor"  
                        name="doctor"  
                        value={formData.doctor}  
                        onChange={handleChange}  
                        required  
                    >  
                        <option value="">Selecciona un doctor</option>  
                        <option value="Dr. Patricio Martínez">Dr. Patricio Martínez</option>  
                        <option value="Dra. Matilde Silva">Dra. Matilde Silva</option>  
                        <option value="Dr. Carlos Andrés Ruiz">Dr. Carlos Andrés Ruiz</option>  
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
                    <label htmlFor="time">Hora:</label>  
                    <input  
                        type="time"  
                        id="time"  
                        name="time"  
                        value={formData.time}  
                        onChange={handleChange}  
                        required  
                    />  
                </div>  

                <button type="submit">Agendar Cita</button>  
            </form>  

            {/* Mostrar mensaje de error */}  
            {errorMessage && <div className="error-message">{errorMessage}</div>}  

            {/* Mostrar mensaje de confirmación */}  
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