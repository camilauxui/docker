import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Home from './views/Home';  
import TeamView from './views/TeamView';  
import AppointmentView from './views/AppointmentView';  
import { DoctorProvider } from './components/contexts/DoctorContext';  
import { AuthProvider } from './components/contexts/AuthContext'; // Importar el contexto de autenticación  
import ProtectedRoute from './components/ProtectedRoute'; // Importar el componente de ruta protegida  
import './App.css';  
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min';  
import './Footer.css';  

const App = () => {  
    return (  
        <AuthProvider> {/* Proveedor de autenticación */}  
            <DoctorProvider>  
                <Router>  
                    {/* Menú de navegación */}  
                    <nav className="navbar navbar-expand-lg navbar-light bg-secondary">  
                        <div className="container-fluid">  
                            <Link className="navbar-brand" to="/">  
                                <img  
                                    src="src/assets/medical-center.png"  
                                    alt="Logotipo del Hospital"  
                                    style={{ height: '40px' }}  
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
                                        <Link className="nav-link text-white" to="/">Home</Link>  
                                    </li>  
                                    <li className="nav-item">  
                                        <Link className="nav-link text-white" to="/team">Equipo Médico</Link>  
                                    </li>  
                                    <li className="nav-item">  
                                        <Link className="nav-link text-white" to="/appointments">Agendar Cita</Link>  
                                    </li>  
                                </ul>  
                            </div>  
                            <div className="d-flex">  
                                <Link className="btn btn-primary ms-2" to="/appointments" role="button">Reservar Cita</Link>  
                            </div>  
                        </div>  
                    </nav>  

                    {/* Rutas */}  
                    <Routes>  
                        <Route path="/" element={<Home />} />  
                        <Route path="/team" element={<TeamView />} />  
                        {/* Ruta protegida para "Agendar Cita" */}  
                        <Route  
                            path="/appointments"  
                            element={  
                                <ProtectedRoute>  
                                    <AppointmentView />  
                                </ProtectedRoute>  
                            }  
                        />  
                    </Routes>  

                    {/* Footer */}  
                    <footer>  
                        <div className="container">  
                            <div className="logo">  
                                <img src="src/assets/logo_footer.webp" alt="Logo Medical Center" className="footer-logo" />  
                            </div>  
                            <nav>  
                                <ul>  
                                    <li><Link to="/team">Equipo Médico</Link></li>  
                                    <li><Link to="/appointments">Reservar Cita</Link></li>  
                                    <li><Link to="/">Home</Link></li>  
                                </ul>  
                            </nav>  
                            <div className="address">  
                                <p>Dirección:<br />  
                                    Calle Falsa 123, Ciudad Falsa <br /> Fono: +562 12345678  
                                </p>  
                            </div>  
                            <div className="social">  
                                <ul>  
                                    <li><a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a></li>  
                                    <li><a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">X</a></li>  
                                    <li><a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></li>  
                                </ul>  
                            </div>  
                        </div>  
                    </footer>  
                </Router>  
            </DoctorProvider>  
        </AuthProvider>  
    );  
};  

export default App;