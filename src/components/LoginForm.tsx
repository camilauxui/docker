// src/components/LoginForm.tsx  
import React, { useState } from 'react';  
import { useAuth } from './contexts/AuthContext';  

const LoginForm: React.FC = () => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const { login } = useAuth();  
    const [error, setError] = useState('');  

    const handleSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        setError(''); // Limpiar errores previos  
        try {  
            const response = await fetch('http://localhost:3000/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({ username, password }),  
            });  

            const data = await response.json();  

            if (!response.ok) {  
                throw new Error(data.message || 'Error al iniciar sesión');  
            }  
            login(data.token); // Llama a la función login del contexto  
        } catch (err: any) {  
            setError(err.message || 'Error al iniciar sesión');  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            <div>  
                <label htmlFor="username">Usuario:</label>  
                <input  
                    type="text"  
                    id="username"  
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)}  
                />  
            </div>  
            <div>  
                <label htmlFor="password">Contraseña:</label>  
                <input  
                    type="password"  
                    id="password"  
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}  
                />  
            </div>  
            <button type="submit">Iniciar sesión</button>  
        </form>  
    );  
};  

export default LoginForm;