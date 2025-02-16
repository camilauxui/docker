import React, { useRef, useState } from 'react';  
import ServiceList from '../components/ServiceList';  
import servicesData from '../components/ServicesData';   
import './Home.css';  
import { Link } from 'react-router-dom';  
import Modal from 'react-bootstrap/Modal';  

const Home = () => {  
    const serviceSectionRef = useRef(null);  
    const aboutSectionRef = useRef(null);  
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);  
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);  // Estado para el modal de cita  
    
    const scrollToSection = (ref) => {  
        if (ref.current) {  
            ref.current.scrollIntoView({ behavior: 'smooth' });  
        }  
    };  

    const handleScroll = () => {  
        if (window.scrollY > 200) {  
            setShowScrollToTopButton(true);   
        } else {  
            setShowScrollToTopButton(false);   
        }  
    };  

    React.useEffect(() => {  
        window.addEventListener('scroll', handleScroll);  
        return () => {  
            window.removeEventListener('scroll', handleScroll);  
        };  
    }, []);  

    const scrollToTop = () => {  
        window.scrollTo({ top: 0, behavior: 'smooth' });  
    };  

    return (  
        <div className="home">  
            {/* Banner con imágenes responsivas */}  
            <picture>  
                <source media="(max-width: 768px)" srcSet="src/assets/banner_mobile.webp" />  
                <img src="src/assets/banner_desk.jpg" alt="Banner del Centro Médico" className="banner" />  
            </picture>  
            <br />  
            {/* Botones de navegación */}  
            <nav className="button-container">  
                <button className="banner-button" onClick={() => scrollToSection(serviceSectionRef)}>Nuestros Servicios</button>  
                <button className="banner-button" onClick={() => scrollToSection(aboutSectionRef)}>Sobre Nosotros</button>  
            </nav>  

            <section ref={serviceSectionRef}>  
                <ServiceList services={servicesData} />  
            </section>  

            <br />  
            <br />  

            <section className="about-center" ref={aboutSectionRef}>  
                {/* Sobre Nosotros*/}  
                <div className="about-content">  
                    <img src="src/assets/logo_footer.webp" alt="Descripción de la imagen" className="about-image" />  
                    <h2>Sobre Nosotros</h2>  
                    <p>  
                        En el Centro Médico nos dedicamos a ofrecer atención de salud integral, con un enfoque humano y ético.  
                        <br />Nuestro objetivo es mejorar la calidad de vida de nuestros pacientes mediante servicios médicos de excelencia.  
                    </p>  
                </div>  
                <br />  
                <div className="about-content">  
                    <h3>¿Por Qué Elegirnos?</h3>  
                    <ul>  
                        <li><strong>Experiencia:</strong> Médicos capacitados y comprometidos.</li>  
                        <li><strong>Tecnología avanzada:</strong> Equipos modernos para diagnósticos precisos.</li>  
                        <li><strong>Atención personalizada:</strong> Adaptado a las necesidades de cada paciente.</li>  
                        <li><strong>Accesibilidad:</strong> Horarios flexibles y opciones de pago convenientes.</li>  
                    </ul>  
                </div>  

                <br />  
                <div className="about-content">  
                    <h3>Servicios de nuestro Centro Médico</h3>  
                    <ul>  
                        <li><strong>Consultas médicas generales:</strong> Diagnóstico y tratamientos comunes.</li>  
                        <li><strong>Especialidades médicas:</strong> Cardiología, ginecología, pediatría, entre otras.</li>  
                        <li><strong>Exámenes de laboratorio:</strong> Pruebas diagnósticas precisas y rápidas.</li>  
                        <li><strong>Imágenes diagnósticas:</strong> Radiografías, ecografías, resonancias magnéticas.</li>  
                    </ul>  
                </div>  

                <br />  
                <div className="about-content">  
                    <h3>Dónde Encontrarnos</h3>  
                    <ul>  
                        <li>Estamos ubicados en Avenida Calle Falsa #123, Valdivia.</li>   
                        <li>  
                            Cuida tu salud con nosotros{' '}  
                            <Link  
                                to="/appointments"  
                                className="appointment-link"  
                                onClick={(e) => {  
                                    e.preventDefault();  
                                    setShowAppointmentModal(true);  
                                }}  
                            >  
                                ¡Haz clic acá y agenda tu cita médica!  
                            </Link>  
                        </li>  
                    </ul>  
                </div>  
            </section>  
            <br />  

            {/* Modal de cita médica */}  
            <Modal  
                show={showAppointmentModal}  
                onHide={() => setShowAppointmentModal(false)}  
                centered  
            >  
                <Modal.Header closeButton>  
                    <Modal.Title>Reservar Cita</Modal.Title>  
                </Modal.Header>  
                <Modal.Body>  
                    <p>Debes iniciar sesión para reservar una cita médica.</p>  
                </Modal.Body>  
            </Modal>  

            {showScrollToTopButton && (  
                <button className="scroll-to-top" onClick={scrollToTop}>Subir</button>  
            )}  
        </div>  
    );  
};  

export default Home;