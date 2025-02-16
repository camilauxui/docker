import React from "react";  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  
import AuthProvider from "./components/contexts/AuthContext";
import DoctorProvider from "./components/contexts/DoctorContext";  
import ProtectedRoute from "./components/ProtectedRoute";  
import Home from "./views/Home";  
import TeamView from "./views/TeamView";  
import AppointmentForm from "./components/AppointmentForm";
import Footer from "./components/Footer";  
import Navbar from "./components/Navbar";  
import "./App.css";  
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min";  
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const App = () => {  
    return (  
        <AuthProvider>  
            <DoctorProvider>  
                <Router>  
                    <Navbar />  
                    <Routes>  
                        {/* Rutas públicas */}  
                        <Route path="/" element={<Home />} />  
                        <Route path="/team" element={<TeamView />} />  

                        {/* Rutas protegidas */}  
                        <Route  
                            path="/appointments"  
                            element={  
                                <ProtectedRoute>  
                                    <AppointmentForm />  
                                </ProtectedRoute>  
                            }  
                        />  
                    </Routes>  
                    <Footer />  
                </Router>  
            </DoctorProvider>  
        </AuthProvider>  
    );  
};  

export default App;