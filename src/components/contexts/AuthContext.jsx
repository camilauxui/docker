// AuthContext.jsx  
import React, { createContext, useState } from 'react';  

export const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [user, setUser] = useState(null);  

    const login = async (username, password) => {  
        try {  
            // Simula un proceso de autenticación  
            if (username === 'administrador' && password === 'secret123') {  
                setIsAuthenticated(true);  
                setUser({ username: 'administrador', name: 'Administrador' });  
                return true; // Indica que el login fue exitoso  
            } else {  
                setIsAuthenticated(false);  
                setUser(null);  
                return false; // Indica que el login falló  
            }  
        } catch (error) {  
            console.error('Error en el login:', error);  
            setIsAuthenticated(false);  
            setUser(null);  
            return false;  
        }  
    };  

    const logout = () => {  
        setIsAuthenticated(false);  
        setUser(null);  
    };  

    return (  
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>  
            {children}  
        </AuthContext.Provider>  
    );  
};  

export default AuthProvider;