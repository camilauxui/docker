import { useContext } from 'react';  
import { AuthContext } from '../contexts/AuthContext'; // Nota: Sin duplicar contextos.  

export const useAuth = () => {  
    const context = useContext(AuthContext);  
    if (!context) {  
        throw new Error('useAuth debe ser usado dentro de AuthProvider');  
    }  
    return context;  
};