// src/components/CameraCapture.tsx  
import React, { useState } from 'react';  

const CameraCapture: React.FC = () => {  
    const [image, setImage] = useState<string | null>(null);  

    const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {  
        const file = event.target.files?.[0];  
        if (file) {  
            const imgUrl = URL.createObjectURL(file);  
            setImage(imgUrl);  
            // Aquí puedes manejar el archivo, por ejemplo enviarlo a un servidor.  
        }  
    };  

    return (  
        <div>  
            <h2>Captura de Imágenes</h2>  
            <input   
                type="file"   
                accept="image/*"   
                capture="environment" // Utiliza "environment" para acceder a la cámara trasera en dispositivos móviles  
                onChange={handleCapture}   
            />  
            {image && <img src={image} alt="Captured" style={{ width: '200px', height: 'auto' }} />}  
        </div>  
    );  
};  

export default CameraCapture;