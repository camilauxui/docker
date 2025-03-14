import React, { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";  
import { useAuth } from "../components/contexts/AuthContext";  
import { Modal, Button } from "react-bootstrap";  
import { post } from "../services/apiService";  
import translations from "../translations";  
import { useLanguage } from "../components/contexts/LanguageContext";  
import LoginForm from "../components/LoginForm";  

const Navbar: React.FC = () => {  
    const [showLogin, setShowLogin] = useState<boolean>(false);  
    const { user, login, logout } = useAuth();  
    const navigate = useNavigate();  
    const { language, changeLanguage } = useLanguage();  
    const t = translations[language] || translations["es"];  

    const toggleLoginModal = () => setShowLogin(!showLogin);  

    const handleAppointmentClick = () => {  
        if (!user) {  
            toggleLoginModal();  
        } else {  
            navigate("/appointments");  
        }  
    };  

    // Recuperar la imagen capturada del localStorage  
    const savedImage = localStorage.getItem('capturedImage');  

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
                                {t.home?.title || "Inicio"}  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <Link className="nav-link text-white" to="/team">  
                                {t.navbar?.team || "Equipo"}  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <span  
                                className="nav-link text-white"  
                                onClick={handleAppointmentClick}  
                                style={{ cursor: "pointer" }}  
                            >  
                                {t.navbar?.scheduleAppointment || "Agendar cita"}  
                            </span>  
                        </li>  
                    </ul>  
                </div>  

                {/* Sección de botones de idioma y autenticación */}  
                <div className="d-flex align-items-center">  
                    {/* Botones para cambiar idioma */}  
                    <Button  
                        variant="link"  
                        onClick={() => changeLanguage("es")}  
                        className="text-white"  
                    >  
                        Español  
                    </Button>  
                    <Button  
                        variant="link"  
                        onClick={() => changeLanguage("en")}  
                        className="text-white"  
                    >  
                        English  
                    </Button>  

                    {/* Botones de usuario */}  
                    {user ? (  
                        <>  
                            <span className="text-white me-2">  
                                {t.navbar?.welcome?.replace("{name}", user.name) ||  
                                    `Bienvenido, ${user.name}`}  
                            </span>  
                            {savedImage && (  // Mostrar la imagen capturada  
                                <img  
                                    src={savedImage}   
                                    alt="Imagen de perfil"   
                                    style={{ width: '60px', height: '60px', borderRadius: '50%', marginLeft: '10px' }}  
                                />  
                            )}  
                            <button  
                                className="btn btn-primary ms-2"  
                                onClick={logout}  
                                type="button"  
                            >  
                                {t.navbar?.logout || "Cerrar sesión"}  
                            </button>  
                        </>  
                    ) : (  
                        <Button variant="primary" onClick={toggleLoginModal}>  
                            {t.navbar?.login || "Iniciar sesión"}  
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
                    {/* Pasar onClose al LoginForm */}  
                    <LoginForm onClose={toggleLoginModal} />  
                </Modal.Body>  
            </Modal>  
        </nav>  
    );  
};  

export default Navbar;