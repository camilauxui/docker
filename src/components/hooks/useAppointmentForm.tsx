import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors, createAppointment } from '../../services/apiService';  
import { Confirmation, Doctor, AppointmentFormValues, AppointmentData } from '../../types/interfaces';  

const useAppointmentForm = () => {  
    const nameInputRef = useRef<HTMLInputElement>(null);  
    const [formError, setFormError] = useState<string | null>(null);  
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null);  
    const [formData, setFormData] = useState<AppointmentFormValues>({  
        name: "",  
        email: "",  
        phone: "",  
        doctor: "",  
        date: "",  
        time: "",  
    });  
    const [doctors, setDoctors] = useState<Doctor[]>([]);  
    const [loading, setLoading] = useState(true);  
    const [apiError, setApiError] = useState<string | null>(null);  

    useEffect(() => {  
        const fetchDoctorsData = async () => {  
            try {  
                setLoading(true);  
                setApiError(null);  
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

    const validateForm = useCallback((data: AppointmentFormValues) => {  
        const today = new Date().toISOString().split("T")[0];  

        if (!data.name || !data.email || !data.phone || !data.doctor || !data.date || !data.time) {  
            return "Complete todos los campos";  
        }  

        if (data.date < today) {  
            return "La fecha seleccionada no puede ser en el pasado.";  
        }  

        return null;  
    }, []);  

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;  
        setFormData(prevFormData => ({  
            ...prevFormData,  
            [name]: value,  
        }));  
    }, []);  

    const handleSubmit = useCallback(async (e: React.FormEvent) => {  
        e.preventDefault();  

        const validationError = validateForm(formData);  
        if (validationError) {  
            setFormError(validationError);  
            return;  
        }  

        setFormError(null);  

        try {  
            // **Buscar el doctorId a partir del nombre del doctor**  
            const doctorId = doctors.find(d => d.name === formData.doctor)?.id;  

            if (doctorId === undefined) {  // Comprobar si doctorId es undefined  
                setApiError("Doctor no encontrado.");  
                return;  
            }  

            // **Crear el objeto AppointmentData**  
            const appointmentData: AppointmentData = {  
                doctorId: doctorId,  
                patientName: formData.name,  
                email: formData.email,  
                phone: formData.phone,  
                date: formData.date,  
                time: formData.time,  
            };  

            await createAppointment(appointmentData);  

            const confirmationData: Confirmation = {  
                name: formData.name,  
                doctor: formData.doctor,  
                date: formData.date,  
                time: formData.time,  
            };  
            setConfirmation(confirmationData);  

            setFormData({  
                name: "",  
                email: "",  
                phone: "",  
                doctor: "",  
                date: "",  
                time: "",  
            });  
        } catch (error: any) {  
            console.error("Error al crear la cita:", error);  
            setApiError("No se pudo crear la cita. Inténtalo de nuevo más tarde.");  
            setConfirmation(null);  
        }  
    }, [formData, validateForm, createAppointment, doctors]);  

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