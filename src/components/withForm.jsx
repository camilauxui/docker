
import React, { useState } from 'react';  

const withForm = (WrappedComponent, initialFormData) => {  

    return (props) => {  
        const [formData, setFormData] = useState(initialFormData);  
        const [errorMessage, setErrorMessage] = useState('');  
        const [confirmationMessage, setConfirmationMessage] = useState('');  

        const handleChange = (e) => {  
            const { name, value } = e.target;  
            setFormData({ ...formData, [name]: value });  
        };  

        const handleSubmit = (e, onSubmitCallback) => {  
            e.preventDefault();  
            // Validaciones  
            if (!/^\d+$/.test(formData.phone)) {  
                setErrorMessage('El teléfono debe contener solo números.');  
                return;  
            }  

            if (!/\S+@\S+\.\S+/.test(formData.email)) {  
                setErrorMessage('El correo electrónico no es válido.');  
                return;  
            }  
            
            setErrorMessage('');  

            // Llama a la función de callback de envío  
            onSubmitCallback(formData);  

            // Resetear el formulario  
            setFormData(initialFormData);  
            setConfirmationMessage('¡Formulario enviado correctamente!');  
        };  

        return (  
            <WrappedComponent  
                formData={formData}  
                errorMessage={errorMessage}  
                confirmationMessage={confirmationMessage}  
                handleChange={handleChange}  
                handleSubmit={handleSubmit}  
                {...props} // Propagar props adicionales  
            />  
        );  
    };  
};  

export default withForm;