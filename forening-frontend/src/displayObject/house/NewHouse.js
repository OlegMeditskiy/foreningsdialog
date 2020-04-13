import React, {Component} from "react";
import {createNewAssociation, createNewHouse} from "../../util/APIUtils";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";

export  default class NewHouse extends Component{
    constructor(props) {
        super(props);
        this.state={
            street:'',
            city:'',
            zipCode:0
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
        const createNewHouseRequest = {
            associationId: this.props.match.params.associationId,
            street:this.state.street,
            city:this.state.city,
            zipCode:this.state.zipCode,
        }
        createNewHouse(createNewHouseRequest)
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
                        <Form.Label>Gatuadress</Form.Label>
                        <Form.Control type={"text"} placeholder="Skriv in foreningsnamn" name={"street"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ort</Form.Label>
                        <Form.Control type={"text"} placeholder="Skriv in foreningsnamn" name={"city"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postnummer</Form.Label>
                        <Form.Control type={"number"} placeholder="Skriv in foreningsnamn" name={"zipCode"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }


}