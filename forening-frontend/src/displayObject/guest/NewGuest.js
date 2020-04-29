import React, {Component} from "react";
import {createNewGuest} from "../../util/APIUtils";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";

export  default class NewGuest extends Component{
    constructor(props) {
        super(props);
        this.state={
            email:''
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
        const createNewGuestRequest = {
            apartmentId: this.props.match.params.apartmentId,
            email:this.state.email
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
    render() {

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type={"email"} placeholder="Skriv in foreningsnamn" name={"email"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }


}