// src/components/Navbar.tsx  
import React, { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";  
import { useAuth } from "../components/contexts/AuthContext";   
import { Modal, Form, Button } from "react-bootstrap";  
import { post } from "../services/apiService";  
import translations from '../translations';   
import { useLanguage } from '../components/contexts/LanguageContext';   

const Navbar: React.FC = () => {  
    const [showLogin, setShowLogin] = useState<boolean>(false);  
    const { user, login, logout } = useAuth();  
    const [username, setUsername] = useState<string>("");  
    const [password, setPassword] = useState<string>("");  
    const navigate = useNavigate();  
    const [loginError, setLoginError] = useState<string | null>(null);  
    const { language, changeLanguage } = useLanguage(); // Agregado cambio de idioma desde el contexto  
    const t = translations[language] || translations['es']; // Se asegura un idioma predeterminado (español)  

    // Manejo del inicio de sesión  
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        setLoginError(null);  

        try {  
            const response = await post<{ token: string }>('/auth/login', {  
                username: username,  
                password: password,  
            });  

            if (response && response.token) {  
                login(response.token);  
                setShowLogin(false);  
            } else {  
                setLoginError(t.navbar?.loginError || "Fallo en el inicio de sesión");  
            }  
        } catch (error: any) {  
            console.error("Error al iniciar sesión:", error);  
            setLoginError(t.navbar?.loginError || "Fallo en el inicio de sesión");  
        }  
    };  

    // Mostrar u ocultar el modal de inicio de sesión  
    const toggleLoginModal = () => setShowLogin(!showLogin);  

    // Lógica para manejar el clic en "Agendar cita"  
    const handleAppointmentClick = () => {  
        if (!user) {  
            toggleLoginModal();  
        } else {  
            navigate("/appointments");  
        }  
    };  

    return (  
        <nav className="navbar navbar-expand-lg navbar-light bg-secondary">  
            <div className="container-fluid">  
                {/* Logotipo */}  
                <Link className="navbar-brand" to="/">  
                    <img  
                        src="src/assets/medical-center.png"  
                        alt="Logotipo del Hospital"  
                        style={{ height: "40px" }}  
                    />  
                </Link>  

                {/* Botón para el menú responsive */}  
                <button  
                    className="navbar-toggler"  
                    type="button"  
                    data-bs-toggle="collapse"  
                    data-bs-target="#navbarNav"  
                    aria-controls="navbarNav"  
                    aria-expanded="false"  
                    aria-label="Toggle navigation"  
                >  
                    <span className="navbar-toggler-icon"></span>  
                </button>  

                {/* Menú principal */}  
                <div className="collapse navbar-collapse" id="navbarNav">  
                    <ul className="navbar-nav me-auto">  
                        <li className="nav-item">  
                            <Link className="nav-link text-white" to="/">  
                                {t.home?.title || "Inicio"} {/* Traducción de "Inicio" */}  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <Link className="nav-link text-white" to="/team">  
                                {t.navbar?.team || "Equipo"} {/* Traducción de "Equipo" */}  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <span  
                                className="nav-link text-white"  
                                onClick={handleAppointmentClick}  
                                style={{ cursor: "pointer" }}  
                            >  
                                {t.navbar?.scheduleAppointment || "Agendar cita"} {/* Traducción de "Agendar cita" */}  
                            </span>  
                        </li>  
                    </ul>  
                </div>  

                {/* Sección de botones de idioma y autenticación */}  
                <div className="d-flex align-items-center">  
                    {/* Botones para cambiar idioma */}  
                    <Button variant="link" onClick={() => changeLanguage('es')} className="text-white">Español</Button>  
                    <Button variant="link" onClick={() => changeLanguage('en')} className="text-white">English</Button>  

                    {/* Botones de usuario */}  
                    {user ? (  
                        <>  
                            <span className="text-white me-2">{t.navbar?.welcome?.replace("{name}", user.name) || `Bienvenido, ${user.name}`}</span>  
                            <button  
                                className="btn btn-primary ms-2"  
                                onClick={logout}  
                                type="button"  
                            >  
                                {t.navbar?.logout || "Cerrar sesión"} {/* Traducción de "Cerrar sesión" */}  
                            </button>  
                        </>  
                    ) : (  
                        <Button variant="primary" onClick={toggleLoginModal}>  
                            {t.navbar?.login || "Iniciar sesión"} {/* Traducción de "Iniciar sesión" */}  
                        </Button>  
                    )}  
                </div>  
            </div>  

            {/* Modal para el inicio de sesión */}  
            <Modal show={showLogin} onHide={toggleLoginModal}>  
                <Modal.Header closeButton>  
                    <Modal.Title>{t.navbar?.loginTitle || "Iniciar sesión"}</Modal.Title>  
                </Modal.Header>  
                <Modal.Body>  
                    <Form onSubmit={handleLogin}>  
                        <Form.Group className="mb-3">  
                            <Form.Label>{t.navbar?.username || "Nombre de usuario"}</Form.Label>  
                            <Form.Control  
                                type="text"  
                                value={username}  
                                onChange={(e) => setUsername(e.target.value)}  
                                required  
                            />  
                        </Form.Group>  
                        <Form.Group className="mb-3">  
                            <Form.Label>{t.navbar?.password || "Contraseña"}</Form.Label>  
                            <Form.Control  
                                type="password"  
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)}  
                                required  
                            />  
                        </Form.Group>  
                        {loginError && <div className="text-danger">{loginError}</div>}  
                        <Button type="submit" variant="primary">  
                            {t.navbar?.access || "Acceder"} {/* Traducción de "Acceder" */}  
                        </Button>  
                    </Form>  
                </Modal.Body>  
            </Modal>  
        </nav>  
    );  
};  

export default Navbar;