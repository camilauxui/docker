import { useRef, useEffect, useState, useCallback } from "react";  

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

    // Simulación de una API para obtener los doctores  
    const simulateFetchDoctors = () => {  
        return new Promise((resolve) => {  
            setTimeout(() => {  
                resolve([  
                    { id: 1, name: "Dr. Alejandro Varas", specialty: "Cardiología" },  
                    { id: 2, name: "Dra. María Rodríguez", specialty: "Pediatría" },  
                    { id: 3, name: "Dr. Pedro González", specialty: "Medicina General" },  
                    { id: 4, name: "Dra. Javiera Mora", specialty: "Dentista" },  
                ]);  
            }, 2000);  
        });  
    };  

    useEffect(() => {  
        const fetchDoctors = async () => {  
            try {  
                setLoading(true);  
                const data = await simulateFetchDoctors();  
                setDoctors(data);  
            } catch (error) {  
                console.error("Error al cargar los doctores:", error);  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchDoctors();  
    }, []);  

    useEffect(() => {  
        nameInputRef.current && nameInputRef.current.focus();  
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

    const handleSubmit = useCallback((e) => {  
        e.preventDefault();  

        const validationError = validateForm(formData);  
        if (validationError) {  
            setFormError(validationError);  
            return;  
        }  

        setFormError("");  
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
    }, [formData, validateForm]);  

    return {  
        nameInputRef,  
        formError,  
        confirmation,  
        formData,  
        doctors,  
        loading,  
        handleChange,  
        handleSubmit,  
    };  
};  

export default useAppointmentForm;