import React, { useRef, useState } from 'react';  
import ServiceList from '../components/ServiceList';  
import servicesData from '../components/ServicesData';   
import './Home.css';  
import { Link } from 'react-router-dom';


const Home = () => {  
    // Crear referencias para las secciones  
    const serviceSectionRef = useRef(null);  
    const aboutSectionRef = useRef(null);  

    // Estado para mostrar el botón de subir
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);  
    
    // Función para desplazar a la sección deseada  
    const scrollToSection = (ref) => {  
        if (ref.current) {  
            ref.current.scrollIntoView({ behavior: 'smooth' });  
        }  
    };

    // Función para mostrar el botón de subir cuando el usuario baja la página
    const handleScroll = () => {
        if (window.scrollY > 200) {
            setShowScrollToTopButton(true); // Mostrar el botón cuando se baja más de 200px
        } else {
            setShowScrollToTopButton(false); // Ocultar el botón cuando se sube
        }
    };

    // Añadir el evento de scroll
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Función para subir al inicio de la página
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (  
        <div className="home">  
            <h1>Bienvenido al Centro Médico</h1>  
            
            {/* Botones de navegación */}  
            <nav className="button-container">  
                <button className="banner-button" onClick={() => scrollToSection(serviceSectionRef)}>Nuestros Servicios</button>  
                <button className="banner-button" onClick={() => scrollToSection(aboutSectionRef)}>Sobre Nosotros</button>  
            </nav>  
            
            <section ref={serviceSectionRef}>  
                <ServiceList services={servicesData} />  {/* Pasa servicesData como prop */}  
            </section>  
            
            <section className="about-center" ref={aboutSectionRef}>  
                <h2>Información del Centro Médico</h2>  
                <p>  
                    En el Centro Médico nos dedicamos a ofrecer atención de salud integral, con un enfoque humano y ético. Nuestro objetivo es mejorar la calidad de vida de nuestros pacientes mediante servicios médicos de excelencia.
                </p>
                <h3>Nuestra Misión</h3>
                <p>  
                    Nuestra misión es proporcionar atención médica de excelencia, enfocada en la prevención, diagnóstico y tratamiento de enfermedades, con un enfoque humano y ético.
                </p>
                <h3>Servicios de nuestro centro Médico</h3>
                <ul>
                    <li><strong>Consultas médicas generales:</strong> Diagnóstico y tratamiento de afecciones comunes.</li>
                    <li><strong>Especialidades médicas:</strong> Cardiología, ginecología, pediatría, entre otras.</li>
                    <li><strong>Exámenes de laboratorio:</strong> Pruebas diagnósticas precisas y rápidas.</li>
                    <li><strong>Imágenes diagnósticas:</strong> Radiografías, ecografías, resonancias magnéticas.</li>
                    <li><strong>Urgencias:</strong> Atención inmediata las 24 horas.</li>
                    <li><strong>Atención preventiva:</strong> Chequeos, vacunaciones y promoción de hábitos saludables.</li>
                </ul>
                <h3>¿Por Qué Elegirnos?</h3>
                <ul>
                    <li><strong>Experiencia:</strong> Médicos capacitados y comprometidos.</li>
                    <li><strong>Tecnología avanzada:</strong> Equipos modernos para diagnósticos precisos.</li>
                    <li><strong>Atención personalizada:</strong> Trato cercano y adaptado a las necesidades de cada paciente.</li>
                    <li><strong>Accesibilidad:</strong> Horarios flexibles y opciones de pago convenientes.</li>
                </ul>
                <h3>Visítanos</h3>
                <p>  
                Estamos ubicados en Avenida Calle Falsa #123, Valdivia. <br />
                Cuida tu salud con nosotros{' '}
                    {/* Link para redirigir a appointments */}
                    <Link to="/appointments" className="appointment-link"> ¡Haz clic acá y agenda tu cita médica! </Link>
                </p>
            </section>  

            {/* Botón "Subir" */}
            {showScrollToTopButton && (
                <button className="scroll-to-top" onClick={scrollToTop}>Subir</button>
            )}
        </div>  
    );  
};  

export default Home;
