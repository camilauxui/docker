import React from "react";  
import useAppointmentForm from "./hooks/useAppointmentForm";
import { useAuth } from "./contexts/AuthContext";  
import './AppointmentForm.css';

const AppointmentForm = () => {  
    const {  
        nameInputRef,  
        formError,  
        confirmation,  
        formData,  
        doctors,  
        loading,  
        handleChange,  
        handleSubmit,  
    } = useAppointmentForm();  
    const { user } = useAuth();  

    if (loading) {  
        return <p>Cargando Agenda Virual...API simulada...</p>;  
    }  

    return (  
        <section id="appointment" className="appointment-form">  
            <h2>Agenda Virtual</h2>  

            {user && <p>Hola, {user.name}. Complete el formulario para reservar su cita médica.</p>}  
            <p>Ingrese los datos del paciente:</p>  
            <br />  

            <form onSubmit={handleSubmit}>  
                {/* Campos del formulario */}  
                <div>  
                    <label htmlFor="name">Nombre del paciente:</label>  
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
                        {doctors.map((doctor) => (  
                            <option key={doctor.id} value={doctor.name}>  
                                {doctor.name} - {doctor.specialty}  
                            </option>  
                        ))}  
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

                <button type="submit">Agendar Cita</button>  
            </form>  

            {formError && <div className="error-message">{formError}</div>}  

            {confirmation && (  
                <div className="confirmation-message">  
                    <h3>Su hora médica ha sido agendada correctamente.</h3>  
                    <ul>  
                        <li><strong>Nombre del paciente:</strong> {confirmation.name}</li>  
                        <li><strong>Doctor:</strong> {confirmation.doctor}</li>  
                        <li><strong>Fecha:</strong> {confirmation.date}</li>  
                        <li><strong>Hora:</strong> {confirmation.time}</li>  
                    </ul>  
                </div>  
            )}  
        </section>  
    );  
};  

export default AppointmentForm;