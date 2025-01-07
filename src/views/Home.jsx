import React from 'react';  
import ServiceList from '../components/ServiceList';  
import servicesData from '../components/ServicesData'; // Asegúrate de importar servicesData  

const Home = () => {  
    return (  
        <div className="home">  
            <h1>Bienvenido al Centro Médico</h1>  
            <ServiceList services={servicesData} />  {/* Pasa servicesData como prop aquí */}  
            <section className="about-center">  
                <h2>Información del Centro Médico</h2>  
                <p>  
                    Aquí puedes agregar información relevante sobre el centro médico, su misión, servicios ofrecidos,  
                    y cualquier otra cosa que consideres importante para los usuarios.  
                </p>  
            </section>  
        </div>  
    );  
};  

export default Home;