import React, {Component} from "react";
import {createNewAssociation} from "../../util/APIUtils";
import {notification} from "antd";
import {Button, Form} from "react-bootstrap";

export  default class AddNew extends Component{
    constructor(props) {
        super(props);
        this.state={
            associationName:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({associationName: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();

        const createNewAssociationRequest ={
            userId: this.props.currentUser.id,
            organizationId:this.props.match.params.organisationId,
            associationName:this.state.associationName
        }
        createNewAssociation(createNewAssociationRequest)
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
                        <Form.Label>Foreningsnamn</Form.Label>
                        <Form.Control type={"text"} placeholder="Skriv in foreningsnamn" onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

        )
    }


}