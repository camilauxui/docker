import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors, createAppointment } from '../../services/apiService';   


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
                setApiError(""); // Limpia el error antes de la solicitud  
                const data = await fetchDoctors();  
                console.log("Datos de doctores recibidos:", data);  
                setDoctors(data || []);  
            } catch (error) {  
                console.error("Error al cargar los doctores:", error);  
                setApiError("No se pudieron cargar los doctores. Inténtalo más tarde.");  
            } finally {  
                setLoading(false);  
            }  
        };  
    
        fetchDoctorsData();  
    }, []);   

    const validateForm = useCallback((data) => {  
        const today = new Date().toISOString().split("T")[0];  
        
        // Validar campos obligatorios  
        if (!data.name || !data.email || !data.phone || !data.doctor || !data.date || !data.time) {  
            return "Complete todos los campos";  
        }  
    
        // Validar fecha no pasada  
        if (data.date < today) {  
            return "La fecha seleccionada no puede ser en el pasado.";  
        }  
    
        return null;  
    }, []);  

    const handleChange = useCallback((e) => {  
        const { name, value } = e.target;  
        setFormData(prevFormData => ({  
            ...prevFormData,  
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
            await createAppointment(appointmentData);  
            setConfirmation({  
                name: formData.name,  
                doctor: formData.doctor,  
                date: formData.date,  
                time: formData.time,  
            });  
            setFormData({  // Limpiar el formulario después de la creación exitosa  
                name: "",  
                email: "",  
                phone: "",  
                doctor: "",  
                date: "",  
                time: "",  
            });  
        } catch (error) {  
            console.error("Error al crear la cita:", error);  
            setApiError("No se pudo crear la cita. Inténtalo de nuevo más tarde.");  
        }  
    }, [formData, validateForm, createAppointment]);   

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