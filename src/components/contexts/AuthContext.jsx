import React, { createContext, useState, useContext } from 'react';  

// Crear el contexto de autenticación  
const AuthContext = createContext();  

// Proveedor del contexto  
export const AuthProvider = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState(false);  

    // Función para iniciar sesión  
    const login = () => {  
        setIsAuthenticated(true);  
    };  

    // Función para cerrar sesión  
    const logout = () => {  
        setIsAuthenticated(false);  
    };  

    return (  
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>  
            {children}  
        </AuthContext.Provider>  
    );  
};  

// Hook para usar el contexto de autenticación  
export const useAuth = () => useContext(AuthContext);