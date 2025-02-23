import React, { useState } from "react";  
import { useNavigate } from "react-router-dom";  
import CryptoJS from "crypto-js"; // Importar crypto-js  
import { Button, Modal, Form } from "react-bootstrap";  
import { useAuth } from "./contexts/AuthContext";  

const LoginForm: React.FC = () => {  
  const { login } = useAuth();  
  const navigate = useNavigate(); // Hook de navegación  
  const [username, setUsername] = useState<string>("");  
  const [password, setPassword] = useState<string>("");  
  const [show, setShow] = useState<boolean>(false);  

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {  
    e.preventDefault();  

    // ENCRIPTAR CONTRASEÑA usando CryptoJS  
    const secretKey = "clave_secreta"; // ¡Cambia esta clave a algo seguro y guárdala solo en el backend!  
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();  

    console.log("Contraseña original:", password); // Solo para pruebas  
    console.log("Contraseña encriptada:", encryptedPassword); // Contraseña encriptada  

    // Llamar a la función de login con la contraseña encriptada  
    const loginSuccess = await login(username, encryptedPassword);  

    if (loginSuccess) {  
      setShow(false);  
      setUsername("");  
      setPassword("");  
      navigate("/appointments"); // Redirige al usuario a la página de citas  
    }  
  };  

  const toggleModal = () => setShow(!show);  

  return (  
    <>  
      <Button variant="outline-primary" onClick={toggleModal}>  
        Iniciar Sesión  
      </Button>  

      <Modal show={show} onHide={toggleModal}>  
        <Modal.Header closeButton>  
          <Modal.Title>Iniciar Sesión</Modal.Title>  
        </Modal.Header>  
        <Modal.Body>  
          <Form onSubmit={handleLogin}>  
            <Form.Group className="mb-3">  
              <Form.Label>Nombre de usuario</Form.Label>  
              <Form.Control  
                type="text"  
                value={username}  
                onChange={(e) => setUsername((e.target as HTMLInputElement).value)}  
                required  
              />  
            </Form.Group>  
            <Form.Group className="mb-3">  
              <Form.Label>Contraseña</Form.Label>  
              <Form.Control  
                type="password"  
                value={password}  
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}  
                required  
              />  
            </Form.Group>  
            <Button type="submit" variant="primary">  
              Acceder  
            </Button>  
          </Form>  
        </Modal.Body>  
      </Modal>  
    </>  
  );  
};  

export default LoginForm;