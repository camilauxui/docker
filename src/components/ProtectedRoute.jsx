import React from 'react';  
import { Navigate } from 'react-router-dom';  
import { useAuth } from './contexts/AuthContext';  

// Componente de ruta protegida  
const ProtectedRoute = ({ children }) => {  
    const { isAuthenticated } = useAuth();  

    // Si el usuario no está autenticado, redirige a la página principal  
    if (!isAuthenticated) {  
        return <Navigate to="/" />;  
    }  

    // Si está autenticado, renderiza el componente hijo  
    return children;  
};  

export default ProtectedRoute;