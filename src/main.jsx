import React from 'react';  
import { createRoot } from 'react-dom/client';  
import App from './App';  
import { DoctorProvider } from './components/contexts/DoctorContext';  
import './index.css';  

const container = document.getElementById('root'); // Selecciona el contenedor en el DOM  
const root = createRoot(container); // Crea una instancia de root  

root.render(  
    <React.StrictMode>  
        <DoctorProvider>  
            <App />  
        </DoctorProvider>  
    </React.StrictMode>  
);