// src/components/ProtectedRoute.tsx  
import React from 'react';  
import { Navigate, useLocation } from 'react-router-dom';  
import { useAuth } from './contexts/AuthContext';  

interface ProtectedRouteProps {  
    children: React.ReactNode;  
}  

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {  
    const { isLoggedIn } = useAuth();  
    const location = useLocation();  

    if (!isLoggedIn) {  
        // Redirige al usuario a la página de inicio de sesión  
        // Guarda la ubicación actual para que pueda volver después de iniciar sesión  
        return <Navigate to="/login" state={{ from: location }} replace />;  
    }  

    return <>{children}</>;  
};  

export default ProtectedRoute;