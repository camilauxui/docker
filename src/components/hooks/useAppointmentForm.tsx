// useAppointmentForm.tsx  
import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors, createAppointment } from "../../services/apiService";  
import { Confirmation, Doctor, AppointmentFormValues, AppointmentData } from "../../types/interfaces";  
import CryptoJS from "crypto-js";  

const useAppointmentForm = () => {  
    const nameInputRef = useRef<HTMLInputElement>(null);  

    const [formData, setFormData] = useState<AppointmentFormValues>({  
        name: "",  
        email: "",  
        phone: "",  
        doctor: "",  
        date: "",  
        time: "",  
    });  

    const [formError, setFormError] = useState<string | null>(null);  
    const [confirmation, setConfirmation] = useState<Confirmation | null>(null);  
    const [doctors, setDoctors] = useState<Doctor[]>([]);  
    const [loading, setLoading] = useState(true);  
    const [apiError, setApiError] = useState<string | null>(null);  

    useEffect(() => {  
        const fetchDoctorsData = async () => {  
            try {  
                setLoading(true);  
                setApiError(null);  
                const data = await fetchDoctors();  

                // Inspecciona los datos aquí  
                console.log("Datos de doctores en useAppointmentForm:", data);  

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
            return "Complete todos los campos.";  
        }  

        if (data.date < today) {  
            return "La fecha seleccionada no puede ser en el pasado.";  
        }  

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
        if (!emailRegex.test(data.email)) {  
            return "Ingrese un correo electrónico válido.";  
        }  

        const phoneRegex = /^[0-9]{8,15}$/;  
        if (!phoneRegex.test(data.phone)) {  
            return "Ingrese un número de teléfono válido.";  
        }  

        return null;  
    }, []);  

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;  
        setFormData((prevFormData) => ({  
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
            const doctorId = doctors.find((d) => d.name === formData.doctor)?.id;  

            if (doctorId === undefined) {  
                setApiError("Doctor no encontrado.");  
                return;  
            }  

            const encryptedEmail = CryptoJS.AES.encrypt(formData.email, "your-secret-key").toString();  
            const encryptedPhone = CryptoJS.AES.encrypt(formData.phone, "your-secret-key").toString();  

            const appointmentData: AppointmentData = {  
                doctorId: doctorId,  
                patientName: formData.name,  
                email: encryptedEmail,  
                phone: encryptedPhone,  
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
    }, [formData, validateForm, doctors]);  

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