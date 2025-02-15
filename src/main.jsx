import React from 'react';  
import { createRoot } from 'react-dom/client';  
import App from './App';  
import AuthProvider from './components/contexts/AuthContext'; // Importación sin llaves  
import DoctorProvider from './components/contexts/DoctorContext';  
import './index.css';  
import 'bootstrap/dist/css/bootstrap.min.css'; // Importaciones de estilos  

const container = document.getElementById('root'); // Selecciona el contenedor del DOM  
const root = createRoot(container); // Crea una instancia de root  

root.render(  
    <React.StrictMode>  
        <AuthProvider> {/* Usamos AuthProvider correctamente */}  
            <DoctorProvider>  
                <App />  
            </DoctorProvider>  
        </AuthProvider>  
    </React.StrictMode>  
);