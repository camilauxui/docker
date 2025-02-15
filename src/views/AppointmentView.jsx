import React from 'react';  
import { useAuth } from './../components/hooks/AuthHooks';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';  

const AppointmentView = () => {  
    const { user } = useAuth();  

    return (  
        <Container className="py-5">  
            <Row className="justify-content-center">  
                <Col xs={12} md={8}>  
                    <h1 className="mb-4 text-center">Agendar Cita</h1>  
                    {user && (  
                        <h2 className="text-center mb-4">  
                            Bienvenido, {user.name}  
                        </h2>  
                    )}  
                    <Form>  
                        <Form.Group as={Row} className="mb-3" controlId="formNombreCompleto">  
                            <Form.Label column>Nombre Completo</Form.Label>  
                            <Col sm={10}>  
                                <Form.Control type="text" required />  
                            </Col>  
                        </Form.Group>  

                        <Form.Group as={Row} className="mb-3" controlId="formFecha">  
                            <Form.Label column>Fecha de la cita</Form.Label>  
                            <Col sm={10}>  
                                <Form.Control type="date" required />  
                            </Col>  
                        </Form.Group>  

                        <Form.Group as={Row} className="mb-3" controlId="formHora">  
                            <Form.Label column>Hora de la cita</Form.Label>  
                            <Col sm={10}>  
                                <Form.Control type="time" required />  
                            </Col>  
                        </Form.Group>  

                        <Form.Group as={Row} className="mb-3">  
                            <Col sm={{ span: 10, offset: 2 }}>  
                                <Button type="submit" variant="primary">  
                                    Reservar Cita  
                                </Button>  
                            </Col>  
                        </Form.Group>  
                    </Form>  
                </Col>  
            </Row>  
        </Container>  
    );  
};  

export default AppointmentView;