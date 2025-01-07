import React from 'react';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import Home from './views/Home';  
import TeamView from './views/TeamView';  
import AppointmentView from './views/AppointmentView';  
import { DoctorProvider } from './components/contexts/DoctorContext';   
import './App.css';   

const App = () => {  
    return (  
        <DoctorProvider>  
            <Router>  
                <nav>  
                    <ul>  
                        <li><Link to="/">Home</Link></li>  
                        <li><Link to="/team">Equipo Médico</Link></li>  
                        <li><Link to="/appointments">Agendar Cita</Link></li>  
                    </ul>  
                </nav>  
                <Routes>  
                    <Route path="/" element={<Home />} />  
                    <Route path="/team" element={<TeamView />} />  
                    <Route path="/appointments" element={<AppointmentView />} />  
                </Routes>  
            </Router>  
        </DoctorProvider>  
    );  
};  

export default App;