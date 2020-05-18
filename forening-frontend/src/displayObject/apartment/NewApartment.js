import React, {Component} from "react";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";
import {createNewApartment} from "../../util/CreateAPI";

export default class NewApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            roomAndKitchen: 0,
            area: 0,
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
            const createNewApartmentRequest = {
                houseId: this.props.match.params.houseId,
                number: this.state.number,
                roomAndKitchen: this.state.roomAndKitchen,
                area: this.state.area,
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
        this.setState({validated:true})
    }

    render() {

        return (
            <div>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Lägenhetsnummer</Form.Label>
                        <Form.Control required type={"number"} placeholder="Skriv in lägenhetsnummer" name={"number"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in lägenhetsnummer
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Area</Form.Label>
                        <Form.Control required type={"number"} placeholder="Skriv in area" name={"roomAndKitchen"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in area
                        </Form.Control.Feedback>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rum och kök</Form.Label>
                        <Form.Control  required type={"number"} placeholder="Skriv in rum och kök" name={"area"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in rum och kök
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