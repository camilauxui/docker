import React, { useState } from 'react';  
import { useAuth } from './contexts/AuthContext';  
import CryptoJS from 'crypto-js'; // Para encriptar datos  
import DOMPurify from 'dompurify'; // Para sanitizar entradas del usuario  

const LoginForm: React.FC = () => {  
    // Estados para manejar el formulario  
    const [username, setUsername] = useState(''); // Nombre de usuario  
    const [password, setPassword] = useState(''); // Contraseña  
    const [error, setError] = useState(''); // Estado de errores  
    const { login } = useAuth(); // Coge el contexto de autenticación  

    // Validación de entradas  
    const validateInputs = () => {  
        // Validar que los campos no estén vacíos  
        if (!username.trim() || !password.trim()) {  
            return 'Por favor, complete todos los campos.';  
        }  

        // Sanitizar el nombre de usuario  
        const sanitizedUsername = DOMPurify.sanitize(username);  
        if (sanitizedUsername !== username) {  
            return 'El nombre de usuario contiene caracteres no válidos.';  
        }  

        return null; // Todo está correcto si no hay errores  
    };  

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault(); // Prevenir la recarga de página  
        setError(''); // Limpiar el estado de errores  

        // Llamar a `validateInputs` para revisar las entradas  
        const validationError = validateInputs();  
        if (validationError) {  
            setError(validationError);  
            return;  
        }  

        // Encriptar la contraseña con CryptoJS  
        const encryptedPassword = CryptoJS.AES.encrypt(password, 'your-secret-key').toString();  

        try {  
            const response = await fetch('http://localhost:3000/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({  
                    username,  
                    password: encryptedPassword, // Enviar la contraseña encriptada  
                }),  
            });  

            const data = await response.json();  

            if (!response.ok) {  
                throw new Error(data.message || 'Error al iniciar sesión');  
            }  

            login(data.token); // Llama a la función login del contexto para almacenar el token  
        } catch (err: any) {  
            setError(err.message || 'Error al iniciar sesión'); // Manejar errores  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar cualquier mensaje de error */}  
            <div>  
                <label htmlFor="username">Usuario:</label>  
                <input  
                    type="text"  
                    id="username"  
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)} // Actualizar el estado de nombre  
                />  
            </div>  
            <div>  
                <label htmlFor="password">Contraseña:</label>  
                <input  
                    type="password"  
                    id="password"  
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)} // Actualizar el estado de contraseña  
                />  
            </div>  
            <button type="submit">Iniciar sesión</button>  
        </form>  
    );  
};  

export default LoginForm;