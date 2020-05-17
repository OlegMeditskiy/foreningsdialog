import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import {signup} from "../../util/AuthorizationAPI";
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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log("false");
        }
        else{
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
                    this.props.history.push("/login");
                }).catch(error => {
                if (this.state.validated===true){
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Fylla i alla former på rätt sätt!'
                    });
                }
                else {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });
                }

            });

        }
        this.setState({validated:true})
    }
    render() {
        console.log(this.state.protokol)
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
                <Button variant="primary" type="submit">Uppdatera</Button>
            </Form>
        </div>)
    }


}
export default ProtokolUpload;