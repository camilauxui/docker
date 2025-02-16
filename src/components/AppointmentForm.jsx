import React, { useRef, useEffect, useState } from "react";  
import { useAuth } from "./contexts/AuthContext";  
import "./AppointmentForm.css";  

const doctors = [  
    { id: 1, name: "Dr. Alejandro Varas", specialty: "Cardiología" },  
    { id: 2, name: "Dra. María Rodríguez", specialty: "Pediatría" },  
    { id: 3, name: "Dr. Pedro González", specialty: "Medicina General" },  
    { id: 4, name: "Dra. Javiera Mora", specialty: "Dentista" },  
];  

const AppointmentForm = () => {  
    const nameInputRef = useRef(null);  
    const { user } = useAuth();  
    const [formError, setFormError] = useState(""); // Estado para errores del formulario  
    const [confirmation, setConfirmation] = useState(""); // Estado para mensaje de confirmación  
    const [formData, setFormData] = useState({  
        name: "",  
        email: "",  
        phone: "",  
        doctor: "",  
        date: "",  
        time: "",  
    }); // Estado local para los datos del formulario  

    useEffect(() => {  
        nameInputRef.current && nameInputRef.current.focus();  
    }, []);  

    const validateForm = (data) => {  
        const today = new Date().toISOString().split("T")[0];  
        if (data.date < today) {  
            return "La fecha seleccionada no puede ser en el pasado.";  
        }  
        return null; // Sin errores  
    };  

    const handleChange = (e) => {  
        const { name, value } = e.target;  
        setFormData((prevData) => ({  
            ...prevData,  
            [name]: value,  
        }));  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario  

        const validationError = validateForm(formData);  
        if (validationError) {  
            setFormError(validationError);  
            return;  
        }  

        // Procesar la cita agendada  
        setFormError("");  
        setConfirmation({  
            name: formData.name,  
            doctor: formData.doctor,  
            date: formData.date,  
            time: formData.time,  
        });  

        // Resetear el formulario después de mostrar el mensaje de confirmación  
        setFormData({  
            name: "",  
            email: "",  
            phone: "",  
            doctor: "",  
            date: "",  
            time: "",  
        });  
    };  

    return (  
        <section id="appointment" className="appointment-form">  
            <h2>Agenda Virtual</h2>  

            {user && <p>Hola, {user.name}. Complete el formulario para reservar su cita médica.</p>}  
            <p>Ingrese los datos del paciente:</p>  
            <br />  

            <form onSubmit={handleSubmit}>  
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