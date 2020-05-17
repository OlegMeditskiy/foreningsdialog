import React, {Component} from 'react';
import './Signup.css';
import OrganizationInput from "./OrganizationInput";
import {notification} from 'antd';
import {Accordion, Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {signup} from "../../util/AuthorizationAPI";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            errors: {
                orgNumber: '',
                zipCode: '',
                contactEmail: '',
                username: '',
                password:''
            },
            protokol:null,
            association: {
                name: '',
                organizations: [{
                    orgNumber: '',
                    totalArea: '',
                    numberOfApartments: '',
                    associations: [{
                        associationName: '',
                        contacts: [{
                            contactName: '',
                            contactTelephone: '',
                            contactEmail: ''
                        }],
                        houses: [{
                            street: '',
                            city: '',
                            zipCode: ''
                        }],
                    }]
                }]
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
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewOrganization = this.addNewOrganization.bind(this);
        this.addNewAssociation = this.addNewAssociation.bind(this);
        this.addNewHouse = this.addNewHouse.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
        this.remove = this.remove.bind(this);
        this.handleOnFileChange=this.handleOnFileChange.bind(this);
    }


    handleChange = (e) => {
        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        const className = e.target.className.split(" ")[0];
        const value = e.target.value;
        const organizationId = e.target.dataset.organization;
        const associationId = e.target.dataset.association;
        let errors = this.state.errors;
        switch (className) {
            case 'orgNumber':
                errors.orgNumber = value.length === 0 ? '' :
                    value.length < 10 ? 'Organization måste vara 10 symboler lång' :
                        '';
                break;
            case 'password':
                errors.password = value.length === 0 ? '' :
                    value.length < 10 ? 'Organization måste vara 6-20 symboler lång' :
                        value.length > 20 ? 'Organization måste vara 6-20 symboler lång' :
                '';
                break;
            case 'zipCode':
                errors.zipCode = value.length === 0 ? '' :
                    value.length < 5 ? 'Postnummer måste vara 5 symboler lång' :
                        '';
                break;
            case 'contactEmail':
                errors.contactEmail = value.length === 0 ? '' :
                    EMAIL_REGEX.test(value) ? '' :
                        'Email is invalid';
                break;
            case 'username':
                errors.username = value.length === 0 ? '' :
                    EMAIL_REGEX.test(value) ? '' :
                        'Email is invalid';
                break;
            default:
                break;
        }
        this.setState({errors, [className]: value}, () => {

        })

        if (["orgNumber", "numberOfApartments", "totalArea"].includes(className)) {
            let organizations = this.state.association.organizations;
            organizations[e.target.dataset.id][className] = value;
            this.setState({organizations})
        } else if (["street", "city", "zipCode"].includes(className)) {
            let houses = this.state.association.organizations[organizationId].associations[associationId].houses;
            houses[e.target.dataset.id][className] = e.target.value;
            this.setState({houses})
        } else if (["associationName"].includes(className)) {
            let associations = this.state.association.organizations[organizationId].associations;
            associations[e.target.dataset.id][className] = e.target.value;
            this.setState({associations})
        } else if (["contactName", "contactTelephone", "contactEmail"].includes(className)) {
            let contacts = this.state.association.organizations[organizationId].associations[associationId].contacts;
            contacts[e.target.dataset.id][className] = e.target.value;
            this.setState({contacts})
        } else {
            this.setState({[className]: {value: value}})
        }
    }

    addNewHouse = (event, orgId, associationId) => {

        const house = {
            street: '',
            city: '',
            zipCode: ''
        };

        this.setState((prevState) => ({
            association: {
                ...prevState.association,
                organizations: [...prevState.association.organizations.slice(0, orgId),

                    {
                        ...prevState.association.organizations[orgId],
                        associations: [...prevState.association.organizations[orgId].associations.slice(0, associationId),
                            {
                                ...prevState.association.organizations[orgId].associations[associationId],
                                houses: [...prevState.association.organizations[orgId].associations[associationId].houses, house]
                            }
                        ]
                    },
                    ...prevState.association.organizations.slice(orgId + 1)
                ]
            }
        }));
    }
    addNewAssociation = (e, orgId) => {
        const association = {
            associationName: '',
            contacts: [{
                contactName: '',
                contactTelephone: '',
                contactEmail: ''
            }],
            houses: [{
                street: '',
                city: '',
                zipCode: ''
            }
            ],
        };
        this.setState((prevState) => ({
            association: {
                ...prevState.association,
                organizations: [...prevState.association.organizations.slice(0, orgId),
                    {
                        ...prevState.association.organizations[orgId],
                        associations: [...prevState.association.organizations[orgId].associations, association]
                    },
                    ...prevState.association.organizations.slice(orgId + 1)
                ]
            }
        }));

    }
    addNewContact = (e, orgId, associationId) => {
        const contact = {
            contactName: '',
            contactTelephone: '',
            contactEmail: ''
        }
        this.setState((prevState) => ({
            association: {
                ...prevState.association,
                organizations: [...prevState.association.organizations.slice(0, orgId),

                    {
                        ...prevState.association.organizations[orgId],
                        associations: [...prevState.association.organizations[orgId].associations.slice(0, associationId),
                            {
                                ...prevState.association.organizations[orgId].associations[associationId],
                                contacts: [...prevState.association.organizations[orgId].associations[associationId].contacts, contact]
                            }
                        ]
                    },


                    ...prevState.association.organizations.slice(orgId + 1)
                ]
            }
        }));

    }

    addNewOrganization = () => {
        const organization = {
            orgNumber: '',
            totalArea: '',
            numberOfApartments: '',
            associations: [{
                associationName: '',
                contacts: [{
                    contactName: '',
                    contactTelephone: '',
                    contactEmail: ''
                }],
                houses: [{
                    street: '',
                    city: '',
                    zipCode: ''
                }]
            }]

        };
        this.setState((prevState) => ({
            association: {
                ...prevState.association,
                organizations: [...prevState.association.organizations, organization]
            }
        }));
    }

    remove = (event, index, whatToDelete) => {
        const organizationId = event.currentTarget.dataset.organization;
        const associationId = event.currentTarget.dataset.association;

        switch (whatToDelete) {
            case 'organization':
                if (this.state.association.organizations.length > 1) {
                    const newList = this.state.association.organizations.splice(index, 1);
                    this.setState({organizations: newList})
                    notification.success({
                        message: 'Foreningsdialog App',
                        description: 'Organisation har tagits bort'
                    });
                } else {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Kan inte ta bort sista Organisation!'
                    });
                }
                break;
            case 'association':
                if (this.state.association.organizations[organizationId].associations.length > 1) {
                    const newList = this.state.association.organizations[organizationId].associations.splice(index, 1);
                    this.setState({associations: newList})
                    notification.success({
                        message: 'Foreningsdialog App',
                        description: 'Förening har tagits bort'
                    });
                } else {

                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Kan inte ta bort sista Förening!'
                    });
                }
                break;
            case 'house':
                if (this.state.association.organizations[organizationId].associations[associationId].houses.length > 1) {
                    const newList = this.state.association.organizations[organizationId].associations[associationId].houses.splice(index, 1);
                    this.setState({associations: newList})
                    notification.success({
                        message: 'Foreningsdialog App',
                        description: 'Hus har tagits bort'
                    });
                } else {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Kan inte ta bort sista hus!'
                    });
                }
                break;
            case 'contact':
                if (this.state.association.organizations[organizationId].associations[associationId].contacts.length > 1) {
                    const newList = this.state.association.organizations[organizationId].associations[associationId].contacts.splice(index, 1);
                    this.setState({associations: newList})
                    notification.success({
                        message: 'Foreningsdialog App',
                        description: 'Kontakt har tagits bort'
                    });

                } else {
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: 'Kan inte ta bort sista kontakt!'
                    });
                }
                break;
            default:
                break;

        }
    }




    handleSubmit(event) {
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
                "association": this.state.association,
                "username": this.state.username.value,
                "password": this.state.password.value
            })],{type: "application/json"}))
            signup(formData)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Tack för registrering! Nu kan du logga in!",
                    });
                    this.props.history.push("/login");
                }).catch(error => {
                if (this.state.validated===true){
                    notification.error({
                        message: 'Föreningsdialog App',
                        description: error.message || 'Fylla i alla former på rätt sätt!'
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

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
            // && this.state.address.validateStatus === 'success'
        );
    }
    handleOnFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.id]: file
        })
    }

    render() {
        let {organizations} = this.state.association
        console.log(this.state.GDPR);
        return (
            <div className="signup-container">
                <h1 className="page-title">Registreting</h1>
                <div className="signup-content">

                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit} className="signup-form">
                        <Form.Group>
                            <Form.Control
                                required
                                size="large"
                                name="username"
                                type="email"
                                autoComplete="new-email"
                                className={"username"}
                                placeholder="Gemensam förenings e-mail"
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Skriva in email
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                required
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                className={"password"}
                                placeholder="Lösenord mellan 6 to 20 symboler"
                                onChange={this.handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Skriva in lösenord
                            </Form.Control.Feedback>
                            {this.state.errors.password.length > 0 &&
                            <span className='errnor'>{this.state.errors.password}</span>}
                        </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check>
                                    <Form.Check.Input required type={"checkbox"} />
                                    <Form.Check.Label>Jag accepterar <a href="http://localhost:8080/files/pdf/AllmännaVilkor.pdf" target="_blank">Allmänna villkor</a></Form.Check.Label>
                                </Form.Check>
                            </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check>
                                <Form.Check.Input required type={"checkbox"} />
                                <Form.Check.Label>Jag accepterar <a href="http://localhost:8080/files/pdf/GDPR.pdf" target="_blank">GDPR</a></Form.Check.Label>
                            </Form.Check>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            {/*<Form.Check*/}
                            {/*    required*/}
                            {/*    label="Agree to terms and conditions"*/}
                            {/*    feedback="You must agree before submitting."*/}
                            {/*/>*/}
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                        <Button className="signup-form-button" onClick={this.addNewOrganization}>Lägga
                            organisation</Button>
                        <Accordion defaultActiveKey="0">
                            <OrganizationInput handleOnFileChange={this.handleOnFileChange} remove={this.remove} errors={this.state.errors}
                                               handleChange={this.handleChange} addContact={this.addNewContact}
                                               addHouse={this.addNewHouse} addAssociation={this.addNewAssociation}
                                               organizations={organizations}/>
                        </Accordion>
                    </Form>

                </div>
            </div>
        );
    }


}

export default Signup;