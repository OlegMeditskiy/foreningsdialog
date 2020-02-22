import React, { Component } from 'react';
import { signup, checkUsernameAvailability, checkEmailAvailability } from '../../util/APIUtils';
import './Signup.css';
import OrganizationInput from "./OrganizationInput";
import { Link } from 'react-router-dom';
import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH, 
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    EMAIL_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    ADDRESS_MIN_LENGTH,ADDRESS_MAX_LENGTH,
    ORG_NUMBER_MIN_LENGTH,ORG_NUMBER_MAX_LENGTH

} from '../../constants';

import {notification} from 'antd';
import {Button, Form} from "react-bootstrap";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {
                orgNumber: '',
                zipCode:'',
                contactEmail:''

            },
            association:{
                name:'',
                organizations:[{
                    orgNumber:'',
                    totalArea:'',
                    numberOfApartments: 0,
                    houses:[{
                        address:'',
                        city:'',
                        zipCode: 0
                    }],
                    associations:[{
                        associationName: '',
                        contacts: [{
                            contactName:'',
                            contactTelephone: '',
                            contactEmail:''
                        }]
                    }]
                }]
            },
            name: {
                value: ''
            },
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewOrganization = this.addNewOrganization.bind(this);
        this.addNewAssociation = this.addNewAssociation.bind(this);
        this.addNewHouse = this.addNewHouse.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
    }


    handleChange = (e) =>{
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        const className = e.target.className.split(" ")[0];
        console.log(className)
        const index = e.target.dataset.id;
        const value = e.target.value;
        const organizationId = e.target.dataset.organization;
        const associationId = e.target.dataset.association;
        let errors = this.state.errors;
        switch (className) {
            case 'orgNumber':
                errors.orgNumber = value.length==0?'':
                    value.length<10 ?'Organization must be 10 characters long':
                    '';
                break;
            case 'zipCode':
                errors.zipCode = value.length==0?'':
                    value.length<5 ?'Postnummer maste vara 5 symboler lang':
                        '';
                break;
            case 'contactEmail':
                errors.contactEmail = value.length==0?'':
                    EMAIL_REGEX.test(value) ?'':
                        'Email is invalid';
                break;
            default:
                break;
        }
        this.setState({errors, [className]: value}, ()=> {
            console.log(errors)
        })
        console.log(organizationId,associationId)
        if(["orgNumber","numberOfApartments","totalArea"].includes(className) ){
            let organizations = this.state.association.organizations;
            organizations[e.target.dataset.id][className]=value;
            this.setState({organizations},()=>console.log(this.state.organizations))
        }
        else if(["address","city","zipCode"].includes(className)){
            let houses = this.state.association.organizations[organizationId].houses;
            houses[e.target.dataset.id][className]=e.target.value;

            this.setState({houses},()=>console.log(this.state.association.organizations[organizationId].houses))
        }
        else if(["associationName"].includes(className)){
            let associations = this.state.association.organizations[organizationId].associations;
            associations[e.target.dataset.id][className]=e.target.value;
            this.setState({associations},   ()=>console.log(this.state.association.organizations[organizationId].associations))
        }
        else if(["contactName","contactTelephone","contactEmail"].includes(className)){
            let contacts = this.state.association.organizations[organizationId].associations[associationId].contacts;
            contacts[e.target.dataset.id][className]=e.target.value;
            this.setState({contacts},()=>console.log(this.state.association.organizations[organizationId].associations[associationId].contacts))
        }
        else{
            this.setState({[className]:{value:value}},()=>console.log(this.state))
        }
    }

    addNewHouse=(event,orgId)=>{
        const house = {
            street:'',
                city:'',
            zipCode: 0
        };

        this.setState((prevState)=>({
            association:{...prevState.association,
                organizations:[...prevState.association.organizations.slice(0,orgId),
                    {...prevState.association.organizations[orgId],
                        houses:[...prevState.association.organizations[orgId].houses,house]},
                    ...prevState.association.organizations.slice(orgId+1)
                ]}
        }));
    }
    addNewAssociation=(e,orgId)=>{
        const association = {
            associationName: '',
            contacts: [{
                contactName:'',
                contactTelephone: '',
                contactEmail:''
            }]
        };
        console.log(this.state.association.organizations[orgId])
        this.setState((prevState)=>({
            association:{...prevState.association,
                organizations:[...prevState.association.organizations.slice(0,orgId),
                    {...prevState.association.organizations[orgId],
                        associations:[...prevState.association.organizations[orgId].associations,association]},
                    ...prevState.association.organizations.slice(orgId+1)
                ]}
        }));

    }
    addNewContact=(e,orgId,associationId)=>{
        const contact ={
            contactName:'',
            contactTelephone: '',
            contactEmail:''
        }
        this.setState((prevState)=>({
            association:{...prevState.association,
                organizations:[...prevState.association.organizations.slice(0,orgId),

                    {...prevState.association.organizations[orgId],
                        associations:[...prevState.association.organizations[orgId].associations.slice(0,associationId),
                            {...prevState.association.organizations[orgId].associations[associationId],
                            contacts:[...prevState.association.organizations[orgId].associations[associationId].contacts,contact]
                            }
                        ]},


                    ...prevState.association.organizations.slice(orgId+1)
                ]}
        }));

    }

    addNewOrganization=(e)=>{
        const organization = {
            orgNumber:'',
            totalArea:'',
            numberOfApartments: 0,
            houses:[{
                street:'',
                city:'',
                zipCode: 0
            }
            ],
            associations:[{
                associationName: '',
                contacts: [{
                    contactName:'',
                    contactTelephone: '',
                    contactEmail:''
                }]
            }]

        };
        this.setState((prevState)=>({
            association: {...prevState.association,
                organizations:[...prevState.association.organizations,organization]}
        }));

    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            association: this.state.association,
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Polling App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: 'Polling App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
            // && this.state.address.validateStatus === 'success'
        );
    }

    render() {
        let {organizations} = this.state.association
        console.log(this.state.association)
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
{/*                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Full Name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </FormItem>
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username.value}
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)} />
                        </FormItem>
                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}>
                            <Input
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                placeholder="Your email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)} />
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="signup-form-button"
                                disabled={this.isFormInvalid()}>Sign up</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>*/}
                    <Form onSubmit={this.handleSubmit} onChange={this.handleChange} className="signup-form" >
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Your full name"
                                className={"name"}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="username"
                                autoComplete="off"
                                className={"username"}
                                placeholder="A unique username"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="email"
                                type="email"
                                autoComplete="off"
                                className={"email"}
                                placeholder="Your email"/>

                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                className={"password"}
                                placeholder="A password between 6 to 20 characters"/>
                        </Form.Group>
                        <Button className="signup-form-button" onClick={this.addNewOrganization}>Lagga organisation</Button>
                        <OrganizationInput errors={this.state.errors} validateOrgNumber={this.validateOrganizationNumber} handleChange={this.handleChange} addContact={this.addNewContact} addHouse={this.addNewHouse} addAssociation={this.addNewAssociation}  organizations={organizations}/>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>

                </div>
                </div>
        );
    }

    // Validation Functions

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    username: {
                        value: usernameValue,
                        validateStatus: 'error',
                        errorMsg: 'This username is already taken'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if(emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkEmailAvailability(emailValue)
        .then(response => {
            if(response.available) {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'success',
                        errorMsg: null
                    }
                });
            } else {
                this.setState({
                    email: {
                        value: emailValue,
                        validateStatus: 'error',
                        errorMsg: 'This Email is already registered'
                    }
                });
            }
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };            
        }
    }

}

export default Signup;