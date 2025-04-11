import React, { useState } from 'react';  

interface AppointmentFormValues {  
  name: string;  
  email: string;  
  phone: string;  
  doctor: string;  
  date: string;  
  time: string;  
}  

const withForm = <P extends object>(  
  WrappedComponent: React.ComponentType<P & {  
    formData: AppointmentFormValues;   
    errorMessage: string;  
    confirmationMessage: string;  
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
    handleSubmit: (e: React.FormEvent, onSubmitCallback: (data: AppointmentFormValues) => void) => void; 
  }>,  
  initialFormData: AppointmentFormValues s  
) => {  
  return (props: P) => {  
    const [formData, setFormData] = useState<AppointmentFormValues>(initialFormData); 
    const [errorMessage, setErrorMessage] = useState<string>('');  
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
      const { name, value } = e.target;  
      setFormData({ ...formData, [name]: value });  
    };  

    const handleSubmit = (e: React.FormEvent, onSubmitCallback: (data: AppointmentFormValues) => void) => { 
      e.preventDefault();  
      // Validaciones  
      if (!/^\d+$/.test((formData as AppointmentFormValues).phone)) { /
        setErrorMessage('El teléfono debe contener solo números.');  
        return;  
      }  

      if (!/\S+@\S+\.\S+/.test((formData as AppointmentFormValues).email)) { /
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