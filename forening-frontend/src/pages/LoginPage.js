import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './style.css'

class LoginPage extends  Component{

    render() {
        return(

            <div>
                <div className="mainContent login">

                <Container>
                    <Row>
                            <Col className="login-block" xs={6}>
                                <Form>
                                    <Form.Group>
                                        <Form.Label className="bebasStyle">FÖRENINGNAMN</Form.Label>
                                        <Form.Control as="select">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicAdress">
                                        <Form.Label className="bebasStyle">ADRESS</Form.Label>
                                        <Form.Control type="text" placeholder="Enter adress" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className="bebasStyle">LÖSENORD</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" />
                                    </Form.Group>
                                    <div className="text-right">
                                        <Button variant="grayButton" type="submit">
                                            LOGGA IN
                                        </Button>
                                    </div>

                                </Form>
                            </Col>

                    </Row>
                </Container>
            </div>
                <div>
                    <footer>
                       <a href="/registration"> Registrera förening här </a>
                    </footer>

                </div>
            </div>

        )
    }
}

export  default LoginPage;