import React, {Component} from "react";
import {createNewApartment} from "../../util/APIUtils";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";

export  default class NewApartment extends Component{
    constructor(props) {
        super(props);
        this.state={
            number:0,
            roomAndKitchen:0,
            area:0
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
        const createNewApartmentRequest = {
            houseId: this.props.match.params.houseId,
            number:this.state.number,
            roomAndKitchen:this.state.roomAndKitchen,
            area:this.state.area,
        }
        createNewApartment(createNewApartmentRequest)
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
                        <Form.Label>Lägenhetsnummer</Form.Label>
                        <Form.Control type={"number"} placeholder="Skriv in foreningsnamn" name={"number"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Area</Form.Label>
                        <Form.Control type={"number"} placeholder="Skriv in foreningsnamn" name={"roomAndKitchen"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rum och kök</Form.Label>
                        <Form.Control type={"number"} placeholder="Skriv in foreningsnamn" name={"area"} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }


}