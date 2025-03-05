import React from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import { AuthProvider } from './components/contexts/AuthContext';  
import { LanguageProvider } from './components/contexts/LanguageContext';  
import ProtectedRoute from './components/ProtectedRoute';  
import Home from './views/Home';  
import TeamView from './views/TeamView';  
import AppointmentForm from './components/AppointmentForm';  
import Footer from './components/Footer';  
import Navbar from './components/Navbar';  
import './App.css';  
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.bundle.min";  
import { DoctorProvider } from './components/contexts/DoctorContext';  

const App = () => {  
    return (  
        <AuthProvider>  
            <LanguageProvider>  
                <DoctorProvider>  
                    <Router>  
                        <Navbar />  
                        <Routes>  
                            <Route path="/" element={<Home />} />  
                            <Route path="/team" element={<TeamView />} />  
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
            </LanguageProvider>  
        </AuthProvider>  
    );  
};  

export default App;