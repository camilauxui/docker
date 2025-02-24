import React, { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";  
import { useAuth } from "../components/contexts/AuthContext"; 
import { Modal, Form, Button } from "react-bootstrap";  
import { post } from "../services/apiService"; // Importa la función post de apiService  

const Navbar: React.FC = () => {  
    const [showLogin, setShowLogin] = useState<boolean>(false);  
    const { user, login, logout } = useAuth(); // Consume el contexto de autenticación  
    const [username, setUsername] = useState<string>("");  
    const [password, setPassword] = useState<string>("");  
    const navigate = useNavigate();  
    const [loginError, setLoginError] = useState<string | null>(null);  

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {  
        e.preventDefault();  
        setLoginError(null); // Limpiar errores anteriores  

        try {  
            // **Llamar a la API para autenticar al usuario**  
            const response = await post<{ token: string }>('/auth/login', { // Reemplaza '/auth/login' con el endpoint correcto de tu API  
                username: username,  
                password: password,  
            });  

            // **Si la autenticación es exitosa, guardar el token en el contexto**  
            if (response && response.token) {  
                login(response.token); // Llama a la función login del contexto con el token  
                setShowLogin(false);  
            } else {  
                // **Manejar el caso en que la API no devuelve un token**  
                setLoginError("Credenciales inválidas.");  
            }  
        } catch (error: any) {  
            console.error("Error al iniciar sesión:", error);  
            setLoginError("Error al iniciar sesión. Inténtalo de nuevo.");  
        }  
    };  

    const toggleLoginModal = () => setShowLogin(!showLogin);  

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
                <Link className="navbar-brand" to="/">  
                    <img  
                        src="src/assets/medical-center.png"  
                        alt="Logotipo del Hospital"  
                        style={{ height: "40px" }}  
                    />  
                </Link>  
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
                <div className="collapse navbar-collapse" id="navbarNav">  
                    <ul className="navbar-nav me-auto">  
                        <li className="nav-item">  
                            <Link className="nav-link text-white" to="/">  
                                Home  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <Link className="nav-link text-white" to="/team">  
                                Equipo Médico  
                            </Link>  
                        </li>  
                        <li className="nav-item">  
                            <span  
                                className="nav-link text-white"  
                                onClick={handleAppointmentClick}  
                                style={{ cursor: "pointer" }}  
                            >  
                                Agendar Cita  
                            </span>  
                        </li>  
                    </ul>  
                </div>  
                <div className="d-flex align-items-center">  
                    {user ? (  
                        <>  
                            <span className="text-white me-2">Hola, {user.name}</span>  
                            <button  
                                className="btn btn-primary ms-2"  
                                onClick={logout}  
                                type="button"  
                            >  
                                Cerrar Sesión  
                            </button>  
                        </>  
                    ) : (  
                        <Button variant="primary" onClick={toggleLoginModal}>  
                            Iniciar Sesión  
                        </Button>  
                    )}  
                </div>  
            </div>  

            {/* Modal para Login */}  
            <Modal show={showLogin} onHide={toggleLoginModal}>  
                <Modal.Header closeButton>  
                    <Modal.Title>Iniciar Sesión</Modal.Title>  
                </Modal.Header>  
                <Modal.Body>  
                    <Form onSubmit={handleLogin}>  
                        <Form.Group className="mb-3">  
                            <Form.Label>Nombre:</Form.Label>  
                            <Form.Control  
                                type="text"  
                                value={username}  
                                onChange={(e) => setUsername((e.target as HTMLInputElement).value)}  
                                required  
                            />  
                        </Form.Group>  
                        <Form.Group className="mb-3">  
                            <Form.Label>Contraseña:</Form.Label>  
                            <Form.Control  
                                type="password"  
                                value={password}  
                                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}  
                                required  
                            />  
                        </Form.Group>  
                        {loginError && <div className="text-danger">{loginError}</div>} {/* Mostrar mensaje de error */}  
                        <Button type="submit" variant="primary">  
                            Acceder  
                        </Button>  
                    </Form>  
                </Modal.Body>  
            </Modal>  
        </nav>  
    );  
};  

export default Navbar;