import { useNavigate } from "react-router-dom";  

const LoginForm = () => {  
    const { login } = useAuth();  
    const navigate = useNavigate(); // Hook de navegación  
    const [username, setUsername] = useState("");  
    const [password, setPassword] = useState("");  
    const [show, setShow] = useState(false);  

    const handleLogin = async (e) => {  
        e.preventDefault();  
        const loginSuccess = await login(username, password);  

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
                                onChange={(e) => setUsername(e.target.value)}  
                                required  
                            />  
                        </Form.Group>  
                        <Form.Group className="mb-3">  
                            <Form.Label>Contraseña</Form.Label>  
                            <Form.Control  
                                type="password"  
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)}  
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