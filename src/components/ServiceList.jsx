import React, { useState } from 'react';  
import PropTypes from 'prop-types';  
import './ServiceList.css';  
import Modal from './Modal'; 

const ServiceList = ({ services }) => {  
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedService, setSelectedService] = useState(null);  

    const openModal = (service) => {  
        setSelectedService(service);  
        setIsModalOpen(true);  
    };  

    const closeModal = () => {  
        setIsModalOpen(false);  
        setSelectedService(null);  
    };  

    return (  
        <section id="services" className="section-services">  
            <h2>Servicios Médicos</h2>  
            <p>  
                Conoce todos los servicios disponibles para garantizar una atención de calidad:  
            </p>  
            <br /><br />  
            <div className="services-grid">  
                {services.map((service) => (  
                    <article className="services-item" key={service.id}>  
                        <img  
                            src={service.image}   
                            alt={service.title}  
                            className="responsive-img"  
                        />  
                        <h3>{service.title}</h3>  
                        <p>{service.description}</p>  
                        <button onClick={() => openModal(service)}>Ver Más</button> {/* Botón de "Ver Más" */}  
                    </article>  
                ))}  
            </div>  

            {/* Modal para mostrar información del servicio seleccionado */}  
            <Modal isOpen={isModalOpen} onClose={closeModal}>  
                {selectedService && (  
                    <>  
                        <h2>{selectedService.title}</h2>  
                        <img src={selectedService.image} alt={selectedService.title} className="responsive-img" />  
                        <p>{selectedService.description}</p>  
                        {/* Puedes añadir más información aquí si lo deseas */}  
                    </>  
                )}  
            </Modal>  
        </section>  
    );  
};  

ServiceList.propTypes = {  
    services: PropTypes.arrayOf(  
        PropTypes.shape({  
            id: PropTypes.number.isRequired,  
            title: PropTypes.string.isRequired,  
            description: PropTypes.string.isRequired,  
            image: PropTypes.string.isRequired  
        })  
    ).isRequired  
};  

export default ServiceList;