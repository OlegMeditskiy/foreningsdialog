import React, {Component} from "react";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";
import {createNewHouse} from "../../util/CreateAPI";

export default class NewHouse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            street: '',
            city: '',
            zipCode: 0,
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
            const createNewHouseRequest = {
                associationId: this.props.match.params.associationId,
                street: this.state.street,
                city: this.state.city,
                zipCode: this.state.zipCode,
            }
            createNewHouse(createNewHouseRequest)
                .then(() => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har skapat hus",
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
                        <Form.Label>Gatuadress</Form.Label>
                        <Form.Control required type={"text"} placeholder="Skriv in gatuadress" name={"street"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in gatuadress
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ort</Form.Label>
                        <Form.Control required type={"text"} placeholder="Skriv in ort" name={"city"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in ort
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Postnummer</Form.Label>
                        <Form.Control required type={"number"} placeholder="Skriv in postnummer" name={"zipCode"}
                                      onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in postnummer
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