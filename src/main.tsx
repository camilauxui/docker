import React, { useEffect } from 'react'; // Importa useEffect  
import { createRoot } from 'react-dom/client';  
import App from './App';  
import { AuthProvider } from './components/contexts/AuthContext';  
import { DoctorProvider } from './components/contexts/DoctorContext';  
import './index.css';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import "@fortawesome/fontawesome-svg-core/styles.css";  
import { config } from "@fortawesome/fontawesome-svg-core";  
config.autoAddCss = false;  

const container = document.getElementById('root') as HTMLElement;  
const root = createRoot(container);  

root.render(  
  <React.StrictMode>  
    <AuthProvider>  
      <DoctorProvider>  
        <App />  
      </DoctorProvider>  
    </AuthProvider>  
  </React.StrictMode>  
);  

// Registro del Service Worker  
if ('serviceWorker' in navigator) {  
  window.addEventListener('load', () => { // Registro después de que la página se cargue completamente  
    navigator.serviceWorker.register('/sw.js') 
      .then(registration => {  
        console.log('Service Worker registrado con éxito:', registration);  
      })  
      .catch(error => {  
        console.error('Error al registrar el Service Worker:', error);  
      });  
  });  
}