import React, { useState, useRef, useEffect } from 'react';  
import { useAuth } from './contexts/AuthContext';  
import DOMPurify from 'dompurify';  

interface LoginFormProps {  
    onClose?: () => void; // Propiedad opcional para cerrar el popup/modal  
}  

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState('');  
    const [loading, setLoading] = useState(false); // Nuevo estado para manejar el loading  
    const [image, setImage] = useState<string | null>(null); // Estado para almacenar la imagen capturada  
    const [stream, setStream] = useState<MediaStream | null>(null); // Estado para el stream de la cámara  
    const videoRef = useRef<HTMLVideoElement>(null);  
    const canvasRef = useRef<HTMLCanvasElement>(null);  
    const { login } = useAuth();  

    const validateInputs = () => {  
        if (!username.trim() || !password.trim()) {  
            return 'Por favor, complete todos los campos.';  
        }  
        const sanitizedUsername = DOMPurify.sanitize(username);  
        if (sanitizedUsername !== username) {  
            return 'El nombre de usuario contiene caracteres no válidos.';  
        }  
        return null; // Todo está correcto si no hay errores  
    };  

    const handleLogin = async (e: React.FormEvent) => {  
        e.preventDefault(); // Prevenir la recarga de página  
        setError('');  
        setLoading(true); // Activar el loading mientras se procesa  

        // Validar las entradas  
        const validationError = validateInputs();  
        if (validationError) {  
            setError(validationError);  
            setLoading(false);  
            return;  
        }  

        try {  
            const response = await fetch('http://localhost:3000/login', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json',  
                },  
                body: JSON.stringify({  
                    username,  
                    password, // Enviar la contraseña sin encriptar  
                }),  
            });  

            const data = await response.json();  

            if (!response.ok) {  
                throw new Error(data.message || 'Error al iniciar sesión');  
            }  

            login(data.token); // Llama a la función login del contexto para almacenar el token  
            if (onClose) {  
                onClose(); // Llamar a la función para cerrar el modal  
            }  
        } catch (err: any) {  
            setError(err.message || 'Error al iniciar sesión');  
        } finally {  
            // Aseguramos que el loading se desactive  
            setLoading(false);  
        }  
    };  

    const startCamera = async () => {  
        setError('');  
        try {  
            const stream = await navigator.mediaDevices.getUserMedia({  
                video: { facingMode: 'user' }, // Usar cámara frontal  
                audio: false,  
            });  
            setStream(stream);  
            if (videoRef.current) {  
                videoRef.current.srcObject = stream;  
                videoRef.current.play(); // Reproducir el video  
            }  
        } catch (err) {  
            console.error(err);  
            setError('No se pudo acceder a la cámara.');  
        }  
    };  

    const stopCamera = () => {  
        if (stream) {  
            stream.getTracks().forEach((track) => track.stop()); // Detener todas las pistas del stream  
            setStream(null);  
        }  
    };  

    const takePicture = () => {  
        if (videoRef.current && canvasRef.current) {  
            const canvas = canvasRef.current;  
            const context = canvas.getContext('2d');  
    
            if (context) {  
                const videoWidth = videoRef.current.videoWidth;  
                const videoHeight = videoRef.current.videoHeight;  
    
                if (videoWidth && videoHeight) {  
                    canvas.width = videoWidth;  
                    canvas.height = videoHeight;  
    
                    context.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);  
                    const imageDataUrl = canvas.toDataURL('image/jpeg');  
                    setImage(imageDataUrl); // Guardar la imagen capturada en el estado  
                    localStorage.setItem('capturedImage', imageDataUrl); // Almacenar la imagen en localStorage  
                    stopCamera(); // Detener la cámara después de tomar la foto  
                } else {  
                    setError('El video no tiene dimensiones válidas.');  
                }  
            }  
        }  
    }; 

    useEffect(() => {  
        return () => {  
            stopCamera(); // Detener la cámara al desmontar el componente  
        };  
    }, []);  

    return (  
        <form onSubmit={handleLogin} style={{ padding: '1rem', width: '280px' }}>  
            {error && <p style={{ color: 'red', fontSize: '0.85rem' }}>{error}</p>}  
            <div>  
                <label htmlFor="username">Usuario:</label>  
                <input  
                    type="text"  
                    id="username"  
                    value={username}  
                    onChange={(e) => setUsername(e.target.value)}  
                    style={{ width: '100%', marginBottom: '0.5rem' }}  
                />  
            </div>  
            <div>  
                <label htmlFor="password">Contraseña:</label>  
                <input  
                    type="password"  
                    id="password"  
                    value={password}  
                    onChange={(e) => setPassword(e.target.value)}  
                    style={{ width: '100%', marginBottom: '0.5rem' }}  
                />  
            </div>  
            <div>  
                <button  
                    type="button"  
                    onClick={startCamera}  
                    style={{ marginBottom: '0.5rem' }}  
                    disabled={loading} // Deshabilitar si está en loading  
                >  
                    Activar cámara  
                </button>  
                <div>  
                    <video  
                        ref={videoRef}  
                        autoPlay  
                        playsInline  
                        style={{  
                            width: '240px',  
                            height: '180px', // Tamaño más reducido  
                            border: '1px solid black',  
                            marginBottom: '0.5rem',  
                        }}  
                    />  
                </div>  
                <button  
                    type="button"  
                    onClick={takePicture}  
                    style={{ marginBottom: '0.5rem' }}  
                    disabled={loading} // Deshabilitar si está en loading  
                >  
                    Tomar foto  
                </button>  
            </div>  
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>  
            {image && (  
                <>  
                    <h4 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>Previsualización:</h4>  
                    <img  
                        src={image}  
                        alt="Captured"  
                        style={{  
                            width: '240px',  
                            height: 'auto',  
                            border: '1px solid black',  
                        }}  
                    />  
                </>  
            )}  
            <button type="submit" style={{ marginTop: '0.5rem' }} disabled={loading}>  
                {loading ? 'Iniciando...' : 'Iniciar sesión'}  
            </button>  
        </form>  
    );  
};  

export default LoginForm;