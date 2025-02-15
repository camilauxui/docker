import React, { createContext, useContext, useState } from "react";  

export const AuthContext = createContext(); // Crear el contexto  

// Hook personalizado para usar el contexto (exportación nombrada)  
export const useAuth = () => {  
    return useContext(AuthContext);  
};  

// Proveedor del contexto (exportación predeterminada)  
const AuthProvider = ({ children }) => {  
    const [isAuthenticated, setIsAuthenticated] = useState(false);  
    const [user, setUser] = useState(null);  

    const login = async (username, password) => {  
        if (username === "usuario" && password === "secret123") {  
            setIsAuthenticated(true);  
            setUser({ username: "usuario", name: "Camila Peña" });  
            return true;  
        } else {  
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

export default AuthProvider; // Exportación predeterminada