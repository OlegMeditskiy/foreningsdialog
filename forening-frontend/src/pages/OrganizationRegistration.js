import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from 'react-bootstrap';
import $ from 'jquery';
import './style.css'

class OrganizationRegistration extends Component{
    emptyItem = {
        organizationName: '',
        organizationNumber: ''
    };
    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event){
        event.preventDefault();
        const {item} = this.state;
        await fetch('/registerOrganization',{method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify(item),
        });


    }

    render() {
        const{item} =this.state;
        const title = <h2>{'Add Organization'}</h2>
        return(
            <div>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label for="organizationName">Name</Form.Label>
                        <Form.Control type="text" name="organizationName" id="organizationName" value={item.organizationName || ''}
                               onChange={this.handleChange} autoComplete="some"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="organizationNumber">Number</Form.Label>
                        <Form.Control type="number" name="organizationNumber" id="organizationNumber" value={item.organizationNumber || ''}
                               onChange={this.handleChange} autoComplete="some"/>
                    </Form.Group>

                    <Form.Group>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        {/*<Button color="secondary" tag={Link} to="/groups">Cancel</Button>*/}
                    </Form.Group>
                </Form>

            </div>
        )
    }
}


export default OrganizationRegistration;