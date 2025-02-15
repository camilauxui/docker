import React from "react";  
import { Navigate, useLocation } from "react-router-dom";  
import { useAuth } from "./contexts/AuthContext"; // Usa correctamente el hook definido en AuthContext  

const ProtectedRoute = ({ children }) => {  
    const { isAuthenticated } = useAuth(); // Obtiene el estado de autenticación del contexto  
    const location = useLocation(); // Obtiene la ubicación actual del usuario para redirecciones  

    if (!isAuthenticated) {  
        // Redirigir si el usuario no está autenticado  
        return <Navigate to="/" state={{ from: location.pathname }} />;  
    }  

    // Renderizar el contenido si el usuario está autenticado  
    return children;  
};  

export default ProtectedRoute;