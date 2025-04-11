import React, { useState } from 'react';  
import { Link } from 'react-router-dom';  
import { Modal } from 'react-bootstrap';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";  

const Footer: React.FC = () => {  
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);  

  return (  
    <footer className="footer mt-5 py-4 bg-secondary text-white">  
      <div className="container">  
        <div className="row">  
          {/* Logo con breve descripción */}  
          <div className="col-12 col-md-4 mb-4">  
            <img  
              src="https://raw.githubusercontent.com/camilauxui/Integrac-Completa-CentroMedico-con-ReactJS/refs/heads/M6EP3/src/assets/logo_footer.webp"  
              alt="Logo Medical Center"  
              className="footer-logo mb-3"  
            />  
            <p className="text-white-50">  
              Salud de calidad  
            </p>  
          </div>  

          {/* Navegación rápida */}  
          <div className="col-12 col-md-4 mb-4">  
            <h5>Enlaces Rápidos</h5>  
            <ul className="list-unstyled">  
              <li className="mb-2">  
                <Link  
                  to="/team"  
                  className="text-white-50 text-decoration-none"  
                >  
                  Equipo Médico  
                </Link>  
              </li>  
              <li className="mb-2">  
                <button  
                  className="text-white-50 text-decoration-none bg-transparent border-none"  
                  onClick={() => setShowLoginModal(true)}  
                >  
                  Agendar Cita  
                </button>  
              </li>  

            </ul>  
          </div>  

          {/* Información de contacto */}  
          <div className="col-12 col-md-4 mb-4">  
            <h5>Contáctanos</h5>  
            <address className="text-white-50">  
              Dirección: Calle Falsa 123, Ciudad Falsa <br />  
              Teléfono: <a href="tel:+56212345678" className="text-white">+56 2 12345678</a> <br />  
              Email: <a href="mailto:info@medicalcenter.com" className="text-white">info@medicalcenter.com</a>  
            </address>  
          </div>  

          {/* Redes Sociales */}  
          <div className="col-12 text-center mt-4">  
            <h6 className="mb-3">Síguenos en</h6>  
            <div className="d-flex justify-content-center gap-3">  
              <a  
                href="https://facebook.com/"  
                target="_blank"  
                rel="noopener noreferrer"  
                className="text-white-50 text-decoration-none"  
              >  
                <FontAwesomeIcon icon={faFacebook} className="fa-2x" />  
              </a>  
              <a  
                href="https://twitter.com/"  
                target="_blank"  
                rel="noopener noreferrer"  
                className="text-white-50 text-decoration-none"  
              >  
                <FontAwesomeIcon icon={faTwitter} className="fa-2x" />  
              </a>  
              <a  
                href="https://instagram.com/"  
                target="_blank"  
                rel="noopener noreferrer"  
                className="text-white-50 text-decoration-none"  
              >  
                <FontAwesomeIcon icon={faInstagram} className="fa-2x" />  
              </a>  
            </div>  
          </div>  
        </div>  
        {/* Modal de Mensaje de Contacto */}  
        <Modal  
          show={showLoginModal}  
          onHide={() => setShowLoginModal(false)}  
          centered  
        >  
          <Modal.Header closeButton>  
            <Modal.Title>Reservar Cita</Modal.Title>  
          </Modal.Header>  
          <Modal.Body>  
            <p>Para reservar una cita, por favor inicia sesión</p>  
          </Modal.Body>  
        </Modal>  

        {/* Separador linea horizontal */}  
        <div className="border-top my-3"></div>  
        <div className="text-center">  
          <p className="text-white-50 mb-0">© 2025 Medical Center. Todos los derechos reservados.</p>  
        </div>  
      </div>  
    </footer>  
  );  
};  

export default Footer;