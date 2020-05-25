import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {notification} from "antd";
import {logoUpload} from "../../util/APIUtils";

class LogoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            logo:null
        }
        this.uploadAssociationLogo = this.uploadAssociationLogo.bind(this);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
    }

    uploadAssociationLogo(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.logo)
        formData.append('properties',new Blob([JSON.stringify({
            "associationId": this.props.match.params.associationId
        })],{type: "application/json"}))
        logoUpload(formData)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har uppdaterat logo",
                });
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }



    handleOnFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.id]: file
        })
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };



    render() {
        return (
            <Container>
                <Row className={"site-block"}>
                    <Col md={6}>
                        <img src={this.props.logo} alt="Logo image"/>
                       </Col>
                </Row>
                <Row className={"site-block"}>
                    <Col md={6}>
                        <Form onSubmit={this.uploadAssociationLogo}>
                            <Form.Group>
                                <Form.Label>Upload logo</Form.Label>
                                <Form.File
                                    id="logo"
                                    name="logo"
                                    onChange={this.handleOnFileChange}
                                />
                            </Form.Group>
                        <Button variant={"secondary"} type="submit">Ladda upp</Button>
                    </Form></Col>
                </Row>
            </Container>
        );
    }
}

export default LogoUpload;