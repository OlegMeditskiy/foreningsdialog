import React, {Component} from "react";
import {createNewContact} from "../../util/APIUtils";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";

export  default class NewContact extends Component{
    constructor(props) {
        super(props);
        this.state={
            contactName:'',
            contactEmail:'',
            contactTelephone:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }
    handleSubmit(event) {
        event.preventDefault();

        const createNewContactRequest = {
            associationId: this.props.match.params.associationId,
            contactEmail:this.state.contactEmail,
            contactName:this.state.contactName,
            contactTelephone:this.state.contactTelephone,
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
    render() {

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Namn</Form.Label>
                        <Form.Control type={"text"} placeholder="Skriv in foreningsnamn" name={"contactName"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type={"email"} placeholder="Skriv in foreningsnamn" name={"contactTelephone"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefonnummer</Form.Label>
                        <Form.Control type={"text"} placeholder="Skriv in foreningsnamn" name={"contactEmail"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }


}