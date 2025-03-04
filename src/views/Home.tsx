// src/views/Home.tsx  
import React, { useRef, useState, useEffect } from 'react';  
import ServiceList from '../components/ServiceList';  
import servicesData from '../components/ServicesData';  
import './Home.css';  
import { Link } from 'react-router-dom';  
import { Modal } from 'react-bootstrap';  
import translations from '../translations';   
import { useLanguage } from '../components/contexts/LanguageContext';   

const Home: React.FC = () => {  
  const serviceSectionRef = useRef<HTMLElement>(null);  
  const aboutSectionRef = useRef<HTMLElement>(null);  
  const [showScrollToTopButton, setShowScrollToTopButton] = useState<boolean>(false);  
  const [showAppointmentModal, setShowAppointmentModal] = useState<boolean>(false);  
  const { language, changeLanguage } = useLanguage(); // Ahora incluye changeLanguage  
  const t = translations[language] || translations['es']; // Carga el idioma desde las traducciones  

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {  
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

  useEffect(() => {  
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
      <picture>  
        <source media="(max-width: 768px)" srcSet="src/assets/banner_mobile.webp" />  
        <img src="src/assets/banner_desk.jpg" alt={t.home.title} className="banner" />  
      </picture>  
      <br />  
      {/* Botones de navegación */}  
      <nav className="button-container">  
        <button className="banner-button" onClick={() => scrollToSection(serviceSectionRef)}>{t.home.services}</button>  
        <button className="banner-button" onClick={() => scrollToSection(aboutSectionRef)}>{t.home.about}</button>  
      </nav>  

      <section ref={serviceSectionRef}>  
        <ServiceList services={servicesData} />  
      </section>  

      <br />  
      <br />  

      <section className="about-center" ref={aboutSectionRef}>  
        <div className="about-content">  
          <img src="src/assets/logo_footer.webp" alt="Descripción de la imagen" className="about-image" />  
          <h2>{t.home.title}</h2>  
          <p>{t.home.subtitle}</p>  
        </div>  
        <br />  
        <div className="about-content">  
          <h3>{t.home.whyChooseUs}</h3>  
          <ul>  
            {t.home.whyChooseUsList.map((item, index) => (  
              <li key={index}>{item}</li>  
            ))}  
          </ul>  
        </div>  

        <br />  
        <div className="about-content">  
          <h3>{t.home.services}</h3>  
          <ul>  
            {t.home.servicesList.map((item, index) => (  
              <li key={index}>{item}</li>  
            ))}  
          </ul>  
        </div>  

        <br />  
        <div className="about-content">  
          <h3>{t.home.location}</h3>  
          <ul>  
            <li>{t.home.locationText}</li>  
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
          <Modal.Title>{t.home.location}</Modal.Title>  
        </Modal.Header>  
        <Modal.Body>  
          <p>{t.home.loginRequired}</p> {/* Cambiado a una propiedad de traducción existente */}  
        </Modal.Body>  
      </Modal>  

      {showScrollToTopButton && (  
        <button className="scroll-to-top" onClick={scrollToTop}>Subir</button>  
      )}  

      {/* Botones para cambiar idioma */}  
      <div className="language-switcher">  
        <button onClick={() => changeLanguage('es')}>Español</button>  
        <button onClick={() => changeLanguage('en')}>English</button>  
      </div>  
    </div>  
  );  
};  

export default Home;