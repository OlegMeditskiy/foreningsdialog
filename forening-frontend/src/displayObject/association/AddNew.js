import React, {Component} from "react";

import {notification} from "antd";
import {Button, Form} from "react-bootstrap";
import {createNewAssociation} from "../../util/CreateAPI";

export default class AddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            associationName: '',
            validated:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({associationName: event.target.value});
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            event.preventDefault();
            this.setState({validated:true})
            const createNewAssociationRequest = {
                userId: this.props.currentUser.id,
                organizationId: this.props.match.params.organisationId,
                associationName: this.state.associationName
            }
            createNewAssociation(createNewAssociationRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har skapat förening",
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
                        <Form.Label>Foreningsnamn</Form.Label>
                        <Form.Control required type={"text"} placeholder="Skriv in föreningsnamn" onChange={this.handleChange}/>
                        <Form.Control.Feedback type="invalid">
                            Skriva in föreningsnamn
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