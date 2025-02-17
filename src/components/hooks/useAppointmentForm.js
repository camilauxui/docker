// src/components/hooks/useAppointmentForm.js  
import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors } from '../../services/apiService'; // Asegúrate de apuntar correctamente al archivo  

const useAppointmentForm = () => {  
    const nameInputRef = useRef(null);  
    const [formError, setFormError] = useState("");  
    const [confirmation, setConfirmation] = useState("");  
    const [formData, setFormData] = useState({  
        name: "",  
        email: "",  
        phone: "",  
        doctor: "",  
        date: "",  
        time: "",  
    });  
    const [doctors, setDoctors] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [apiError, setApiError] = useState(""); // Estado para el error  

    useEffect(() => {  
        const fetchDoctorsData = async () => {  
            try {  
                setLoading(true);  
                const data = await fetchDoctors();  
                setDoctors(data);  
            } catch (error) {  
                console.error("Error al cargar los doctores:", error);  
                setApiError("No se pudieron cargar los doctores. Inténtalo de nuevo más tarde.");  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchDoctorsData();  
    }, []);   
   

    const validateForm = useCallback((data) => {  
        const today = new Date().toISOString().split("T")[0];  
        if (data.date < today) {  
            return "La fecha seleccionada no puede ser en el pasado.";  
        }  
        return null;  
    }, []);  

    const handleChange = useCallback((e) => {  
        const { name, value } = e.target;  
        setFormData((prevData) => ({  
            ...prevData,  
            [name]: value,  
        }));  
    }, []);  

    const handleSubmit = useCallback(async (e) => {  
        e.preventDefault();  

        const validationError = validateForm(formData);  
        if (validationError) {  
            setFormError(validationError);  
            return;  
        }  

        setFormError("");  

        try {  
            const appointmentData = {  
                name: formData.name,  
                email: formData.email,  
                phone: formData.phone,  
                doctor: formData.doctor,  
                date: formData.date,  
                time: formData.time,  
            };  
            await createAppointment(appointmentData); // Llama a la función para crear la cita  
            setConfirmation("Cita creada con éxito."); // Mensaje de confirmación  
            setFormData({  
                name: "",  
                email: "",  
                phone: "",  
                doctor: "",  
                date: "",  
                time: "",  
            });  
        } catch (error) {  
            console.error("Error al crear la cita:", error);  
            setApiError("No se pudo crear la cita. Inténtalo de nuevo más tarde."); // Manejo de errores  
        }  
    }, [formData, validateForm]);  

    return {  
        nameInputRef,  
        formError,  
        confirmation,  
        formData,  
        doctors,  
        loading,  
        apiError,  
        handleChange,  
        handleSubmit,  
    };  
};  

export default useAppointmentForm;  