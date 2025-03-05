// useAppointmentForm.tsx  
import { useRef, useEffect, useState, useCallback } from "react";  
import { fetchDoctors } from "../../services/apiService";  
import { Confirmation, Doctor, AppointmentFormValues } from "../../types/interfaces";  
import CryptoJS from "crypto-js";  
import { addAppointment, getAppointments, Appointment } from "../../db"; // Importa Appointment desde db.ts  


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

         // Cargar las citas desde IndexedDB al montar el componente  
        const loadAppointments = async () => {  
            try {  
                const appointmentsFromDb = await getAppointments();  
                console.log("Citas cargadas desde IndexedDB:", appointmentsFromDb);  
                // Aquí puedes hacer algo con las citas cargadas, como mostrarlas en la interfaz  
            } catch (error) {  
                console.error("Error al cargar las citas desde IndexedDB:", error);  
                setApiError("Error al cargar las citas desde IndexedDB.");  
            }  
        };  

        loadAppointments();  
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
    
            // Encriptación (asegúrate de que CryptoJS esté instalado: npm install crypto-js)  
            const encryptedEmail = CryptoJS.AES.encrypt(formData.email, "your-secret-key").toString();  
            const encryptedPhone = CryptoJS.AES.encrypt(formData.phone, "your-secret-key").toString();  
    
            // Crea un objeto Appointment compatible con IndexedDB  
            const appointmentData: Appointment = {  
                name: formData.name,  
                email: encryptedEmail,  
                phone: encryptedPhone,  
                doctor: formData.doctor,  
                date: formData.date,  
                time: formData.time,  
            };  
    
            console.log("Datos de la cita a guardar:", appointmentData); // Añade este log  
            await addAppointment(appointmentData);  
            console.log("Cita guardada correctamente."); // Añade este log  
    
            setConfirmation({  
                name: formData.name,  
                doctor: formData.doctor,  
                date: formData.date,  
                time: formData.time,  
            });  
    
            setFormData({  
                name: "",  
                email: "",  
                phone: "",  
                doctor: "",  
                date: "",  
                time: "",  
            });  
    
            if (nameInputRef.current) {  
                nameInputRef.current.focus();  
            }  
        } catch (error: any) {  
            console.error("Error al crear la cita:", error);  
            setApiError("No se pudo crear la cita. Inténtalo de nuevo más tarde.");  
            setConfirmation(null);  
        }  
    }, [formData, validateForm, doctors, addAppointment]);

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