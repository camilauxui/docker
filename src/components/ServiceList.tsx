import React, { useState } from 'react';  
import './ServiceList.css';  
import Modal from './Modal';  

interface Service {  
  id: number;  
  title: string;  
  description: string;  
  image: string;  
}  

interface ServiceListProps {  
  services: Service[];  
}  

const ServiceList: React.FC<ServiceListProps> = ({ services = [] }) => {  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);  
  const [selectedService, setSelectedService] = useState<Service | null>(null);  

  const openModal = (service: Service) => {  
    setSelectedService(service);  
    setIsModalOpen(true);  
  };  

  const closeModal = () => {  
    setIsModalOpen(false);  
    setSelectedService(null);  
  };  

  return (  
    <section id="services" className="section-services">  
      <br />  
      <h1>Centro Médico</h1>  
      <h3>  
        Conoce todos los servicios disponibles para garantizar una atención de calidad:  
      </h3>  
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
    </section>  
  );  
};  

export default ServiceList;