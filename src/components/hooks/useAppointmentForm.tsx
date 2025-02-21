import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors, createAppointment } from '../../services/apiService';  
import { Confirmation, Doctor, FormData } from '../../types/interfaces'; // Importa la interfaz  

const useAppointmentForm = () => {  
    const nameInputRef = useRef<HTMLInputElement>(null);  
    const [formError, setFormError] = useState<string | null>(null);  
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null); // Inicializado como null y tipado correctamente  
    const [formData, setFormData] = useState<FormData>({  
        name: "",  
        email: "",  
        phone: "",  
        doctor: "",  
        date: "",  
        time: "",  
    });  
    const [doctors, setDoctors] = useState<Doctor[]>([]);  
    const [loading, setLoading] = useState(true);  
    const [apiError, setApiError] = useState<string | null>(null); // Estado para el error  

    useEffect(() => {  
        const fetchDoctorsData = async () => {  
            try {  
                setLoading(true);  
                setApiError(null); // Limpia el error antes de la solicitud  
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

    const validateForm = useCallback((data: FormData) => { // Tipado de data  
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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { // Tipado del evento  
        const { name, value } = e.target;  
        setFormData(prevFormData => ({  
            ...prevFormData,  
            [name]: value,  
        }));  
    }, []);  

    const handleSubmit = useCallback(async (e: React.FormEvent) => { // Tipado del evento  
        e.preventDefault();  

        const validationError = validateForm(formData);  
        if (validationError) {  
            setFormError(validationError);  
            return;  
        }  

        setFormError(null);  

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

            const confirmationData: Confirmation = { // Tipado explícito  
              name: formData.name,  
              doctor: formData.doctor,  
              date: formData.date,  
              time: formData.time,  
            };  
            setConfirmation(confirmationData);  

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
            setConfirmation(null); // Asegúrate de establecer confirmation a null en caso de error  
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