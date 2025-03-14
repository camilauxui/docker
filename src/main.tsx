import React from 'react';  
import { createRoot } from 'react-dom/client';  
import App from './App';  
import ErrorBoundary from './components/ErrorBoundary'; 
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
    <ErrorBoundary>  
      <AuthProvider>  
        <DoctorProvider>  
          <App />  
        </DoctorProvider>  
      </AuthProvider>  
    </ErrorBoundary>  
  </React.StrictMode>  
);

// Registro del Service Worker  
if ('serviceWorker' in navigator) {  
  window.addEventListener('load', () => {  
    navigator.serviceWorker.register('/sw.js')   
      .then(registration => {  
        console.log('Service Worker registrado con éxito:', registration);  
        
        // Estado para manejar la disponibilidad de una nueva versión  
        let updateAvailable = false;  
        let installingWorker: ServiceWorker | null = null; // Añade este tipo para el worker  

        registration.onupdatefound = () => {  
          installingWorker = registration.installing;  

          if (installingWorker) {  
            installingWorker.onstatechange = () => {  
              // Asegúrate de que installingWorker no sea null antes de chequear la propiedad state  
              if (installingWorker && installingWorker.state === 'installed') {  
                // Verifica si hay una nueva versión disponible  
                if (navigator.serviceWorker.controller) {  
                  updateAvailable = true;  
                  showUpdateNotification();  
                }  
              }  
            };  
          }  
        };  

        // Función para mostrar la notificación de actualización  
        const showUpdateNotification = () => {  
          const updateMessage = document.createElement('div');  
          updateMessage.style.position = 'fixed';  
          updateMessage.style.bottom = '20px';  
          updateMessage.style.right = '20px';  
          updateMessage.style.backgroundColor = '#007bff';  
          updateMessage.style.color = '#fff';  
          updateMessage.style.padding = '10px 20px';  
          updateMessage.style.borderRadius = '5px';  
          updateMessage.style.zIndex = '1000';  

          updateMessage.innerHTML = `  
            <span>Una nueva versión de la aplicación está disponible.</span>  
            <button id="updateBtn" style="margin-left: 10px; background-color: #fff; color: #007bff; border: none; padding: 5px 10px; border-radius: 5px;">Actualizar</button>  
          `;  

          document.body.appendChild(updateMessage);  

          // Manejar clic en el botón de actualización  
          const updateBtn = document.getElementById('updateBtn');  
          if (updateBtn) { // Asegúrate de que el botón no sea null  
            updateBtn.onclick = () => {  
              if (installingWorker) {  
                installingWorker.postMessage({ action: 'skipWaiting' });  
              }  
              window.location.reload(); // Recargar la página para obtener la nueva versión  
            };  
          }  
        };  
      })  
      .catch(error => {  
        console.error('Error al registrar el Service Worker:', error);  
      });  
  });  
}