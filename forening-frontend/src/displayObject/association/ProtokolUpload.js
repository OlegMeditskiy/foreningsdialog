import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {notification} from "antd";
import {saveProtocol} from "../../util/SaveAPI";

class ProtokolUpload extends Component{
    constructor(props) {
        super(props);
        this.state = {
            protokol:null
        }
        this.handleOnFileChange=this.handleOnFileChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleOnFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.id]: file
        })
    }
    handleSubmit(event) {
            event.preventDefault();
            const formData = new FormData();
            formData.append('file', this.state.protokol)
            formData.append('properties',new Blob([JSON.stringify({
                "id": this.props.match.params.organisationId,
            })],{type: "application/json"}))
            saveProtocol(formData)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Du har uppdaterat årsprotokol!",
                    });
                }).catch(error => {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Sorry! Something went wrong. Please try again!'
                    });

            });

    }
    render() {

        return (<div>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label><h5>Ladda upp Årsprotokoll</h5></Form.Label>
                    <Form.File
                        id="protokol"
                        name="protokol"
                        onChange={this.handleOnFileChange}
                    />
                </Form.Group>
                <Button variant="secondary" type="submit">Uppdatera</Button>
            </Form>
        </div>)
    }


}
export default ProtokolUpload;