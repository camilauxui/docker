import React, { useState } from 'react';  
import './ServiceList.css';  
import Modal from './Modal';  
import { useLanguage } from './contexts/LanguageContext';  

// Definir la interfaz Service en este archivo  
interface Service {  
    id: number;  
    title: string;  
    description: string;  
    image: string;  
}  

interface ServiceListProps {  
    services: Service[];  
}  

const ServiceList = ({ services = [] }: ServiceListProps) => {  
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedService, setSelectedService] = useState<Service | null>(null);  
    const { language } = useLanguage();  

    const openModal = (service: Service) => {  
        setSelectedService(service);  
        setIsModalOpen(true);  
    };  

    const closeModal = () => {  
        setIsModalOpen(false);  
        setSelectedService(null);  
    };  

    return (  
        <div className="services-container">  
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
                        <button onClick={() => openModal(service)}>Ver Más</button>  
                    </article>  
                ))}  
            </div>  

            <Modal isOpen={isModalOpen} onClose={closeModal}>  
                {selectedService && (  
                    <>  
                        <h2>{selectedService.title}</h2>  
                        <img src={selectedService.image} alt={selectedService.title} className="modal-image" />  
                        <p>{selectedService.description}</p>  
                    </>  
                )}  
            </Modal>  
        </div>  
    );  
};  

export default ServiceList;