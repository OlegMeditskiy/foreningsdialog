import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {notification} from "antd";
import {GDPRUpload, VillkorUpload} from "../../util/APIUtils";

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
        this.uploadGDPR = this.uploadGDPR.bind(this);
        this.uploadVillkor = this.uploadVillkor.bind(this);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
    }

    uploadGDPR(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.GDPR)
        GDPRUpload(formData)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Filen var laddat upp",
                });
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    uploadVillkor(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.AllmannaVillkor)
        VillkorUpload(formData)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Fillen var laddat upp",
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



    render() {
        return (
            <Container>
                <Row>
                    <Col md={6}>

                        <Form onSubmit={this.uploadGDPR}>
                            <Form.Label>Ladda upp GDPR</Form.Label>
                            <Form.File
                                id="GDPR"
                                name="GDPR"
                                label="Custom file input"
                                onChange={this.handleOnFileChange}
                            />
                            <Button type="submit">Ladda upp</Button>
                        </Form>
                    </Col>
                    <Col md={6}>

                        <Form onSubmit={this.uploadVillkor}>
                            <Form.Label>Ladda upp Allmänna villkor</Form.Label>
                            <Form.File
                                id="AllmannaVillkor"
                                name="AllmannaVillkor"
                                label="Custom file input"
                                onChange={this.handleOnFileChange}
                            />
                            <Button type="submit">Ladda upp</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default FileUpload;