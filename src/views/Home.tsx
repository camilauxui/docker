import React, { useRef, useState, useEffect } from 'react';  
import ServiceList from '../components/ServiceList';  
import './Home.css';  
import { Link } from 'react-router-dom';  
import { Modal } from 'react-bootstrap';  
import translations from '../translations';  
import { useLanguage } from '../components/contexts/LanguageContext';  
import { getServicesData } from '../components/ServicesData';  

const Home = () => {  
    const serviceSectionRef = useRef<HTMLDivElement>(null);  
    const aboutSectionRef = useRef<HTMLDivElement>(null);  
    const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);  
    const [showAppointmentModal, setShowAppointmentModal] = useState(false);  
    const { language, changeLanguage } = useLanguage();  
    const t = translations[language] || translations['es'];  

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {  
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
                <source media="(max-width: 768px)" srcSet="https://raw.githubusercontent.com/camilauxui/Integrac-Completa-CentroMedico-con-ReactJS/refs/heads/M6EP3/src/assets/banner_mobile.jpg" />  
                <img src="https://raw.githubusercontent.com/camilauxui/Integrac-Completa-CentroMedico-con-ReactJS/refs/heads/M6EP3/src/assets/banner_desk.jpg" alt={t.home.title} className="banner" />  
            </picture>  
            <br />  
            <nav className="button-container">  
                <button  
                    className="banner-button"  
                    onClick={() => scrollToSection(serviceSectionRef)}  
                >  
                    {t.home.services}  
                </button>  
                <button  
                    className="banner-button"  
                    onClick={() => scrollToSection(aboutSectionRef)}  
                >  
                    {t.home.about}  
                </button>  
            </nav>  

            <section ref={serviceSectionRef}>  
                <h1>{t.home.title}</h1> {/* Título principal del Centro Médico */}  
                <ServiceList services={getServicesData(language)} />  
            </section>  

            <br />  
            <br />  

            <section className="about-center" ref={aboutSectionRef}>  
                <div className="about-content">  
                    <img src="https://raw.githubusercontent.com/camilauxui/Integrac-Completa-CentroMedico-con-ReactJS/refs/heads/M6EP3/src/assets/logo_footer.webp" alt="Description" className="about-image" />  
                    <h2>{t.home.title}</h2> {/* Repites el título si lo necesitas */}  
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
                            <Link  
                                to="/appointments"  
                                className="appointment-link"  
                                onClick={(e) => {  
                                    e.preventDefault();  
                                    setShowAppointmentModal(true);  
                                }}  
                            >  
                                {t.home.scheduleAppointment}  
                            </Link>  
                        </li>  
                    </ul>  
                </div>  
            </section>  
            <br />  

            <Modal  
                show={showAppointmentModal}  
                onHide={() => setShowAppointmentModal(false)}  
                centered  
            >  
                <Modal.Header closeButton>  
                    <Modal.Title>{t.home.location}</Modal.Title>  
                </Modal.Header>  
                <Modal.Body>  
                    <p>{t.home.loginRequired}</p>  
                </Modal.Body>  
            </Modal>  

            {showScrollToTopButton && (  
                <button className="scroll-to-top" onClick={scrollToTop}>  
                    {t.home.scrollToTop}  
                </button>  
            )}  

            <div className="language-switcher">  
                <button onClick={() => changeLanguage('es')}>{t.home.spanish}</button>  
                <button onClick={() => changeLanguage('en')}>{t.home.english}</button>  
            </div>  
        </div>  
    );  
};  

export default Home;