import React, {Component} from "react";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";
import {createNewContact} from "../../util/CreateAPI";

export default class NewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactName: '',
            contactEmail: '',
            contactTelephone: '',
            validated:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();

        }
        else {
            event.preventDefault();
            this.setState({validated:true})
            const createNewContactRequest = {
                associationId: this.props.match.params.associationId,
                contactEmail: this.state.contactEmail,
                contactName: this.state.contactName,
                contactTelephone: this.state.contactTelephone,
            }
            createNewContact(createNewContactRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Thank you! You have created new association!",
                    });
                    this.props.load();
                }).catch(error => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        }
        this.setState({validated:true})

    }

    render() {

        return (
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Namn</Form.Label>
                        <Form.Control required type={"text"} placeholder="Skriv in namn" name={"contactName"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in namn
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type={"email"} placeholder="Skriv in e-mail" name={"contactTelephone"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in e-mail
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefonnummer</Form.Label>
                        <Form.Control required type={"number"} placeholder="Skriv in telefonnummer" name={"contactEmail"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in telefonnummer
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="secondary" type="submit">
                        Lägga till
                    </Button>
                </Form>
            </div>

        )
    }


}