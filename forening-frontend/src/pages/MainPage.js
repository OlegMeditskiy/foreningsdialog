import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {Nav, Navbar} from "react-bootstrap";

class LoginPage extends  Component{

    render() {
        return(

            <div>

                <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">NYHETER</Nav.Link>
                            <Nav.Link href="#link">HYRA</Nav.Link>
                            <Nav.Link href="#home">STYRELSE</Nav.Link>
                            <Nav.Link href="#link">KALENDER</Nav.Link>
                            <Nav.Link href="#home">DOKUMENTER</Nav.Link>
                            <Nav.Link href="#link">KONTAKTA</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#home">KONTO</Nav.Link>
                            <Nav.Link href="#link">LOGGA UT</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="mainContent">

                </div>
                <div>
                    <footer>

                    </footer>

                </div>
            </div>

        )
    }
}

export  default LoginPage;