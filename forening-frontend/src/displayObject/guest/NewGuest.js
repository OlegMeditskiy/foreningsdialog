import React, {Component} from "react";

import {notification} from "antd";
import {Button, Form} from "react-bootstrap";
import {createNewGuest} from "../../util/CreateAPI";

export default class NewGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
            const createNewGuestRequest = {
                apartmentId: this.props.match.params.apartmentId,
                email: this.state.email
            }
            createNewGuest(createNewGuestRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Thank you! You have created new association!",
                    });
                    this.props.load();
                }).catch(() => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Sorry! Something went wrong. Please try again!'
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
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control required type={"email"} placeholder="Skriv in e-mail" name={"email"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in e-mail
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