// ProtectedRoute.jsx  
import React from 'react';  
import { Navigate, useLocation } from 'react-router-dom';  
import { useAuth } from './hooks/AuthHooks';  

const ProtectedRoute = ({ children }) => {  
    const { isAuthenticated } = useAuth();  
    const location = useLocation();  

    if (!isAuthenticated) {  
        // Redirige al usuario no autenticado a la página de inicio  
        return <Navigate to="/" state={{ from: location.pathname }} />;  
    }  

    return children;  
};  

export default ProtectedRoute;