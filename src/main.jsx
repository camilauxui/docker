import React from 'react';  
import { createRoot } from 'react-dom/client';  
import App from './App';  
import AuthProvider from './components/contexts/AuthContext'; // Importación sin llaves  
import DoctorProvider from './components/contexts/DoctorContext';  
import './index.css';  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import "@fortawesome/fontawesome-svg-core/styles.css"; // Importa los estilos de Font Awesome  
import { config } from "@fortawesome/fontawesome-svg-core";   
config.autoAddCss = false; // Desactiva la carga automática de CSS



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