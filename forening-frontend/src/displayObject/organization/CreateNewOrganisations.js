import React, {Component} from 'react';
import '../../user/signup/Signup.css';
import {notification} from 'antd';
import {Accordion, Button, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import OrganizationInput from "../../user/signup/OrganizationInput";
import {createNewOrganisations} from "../../util/CreateAPI";

class CreateNewOrganisations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validated:false,
            errors: {
                orgNumber: '',
                zipCode: '',
                contactEmail: '',
                username: ''

            },
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
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewOrganization = this.addNewOrganization.bind(this);
        this.addNewAssociation = this.addNewAssociation.bind(this);
        this.addNewHouse = this.addNewHouse.bind(this);
        this.addNewContact = this.addNewContact.bind(this);
        this.remove = this.remove.bind(this);
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
                    value.length < 10 ? 'Organisations måste vara 10 lång' :
                        '';
                break;
            case 'zipCode':
                errors.zipCode = value.length === 0 ? '' :
                    value.length < 5 ? 'Postnummer måste vara 5 symboler lang' :
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

    addNewOrganization = (e) => {
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
        }
        else{
            event.preventDefault();
            this.props.handleClose();
            const createNewOrganisationsRequest = {
                association: this.state.association,
                userId: this.props.currentUser.id
            };
            createNewOrganisations(createNewOrganisationsRequest)
                .then(response => {
                    notification.success({
                        message: 'Föreningsdialog App',
                        description: "Thank you! You have created new organization! Please wait for their acceptation",
                    });
                    this.props.update();
                }).catch(error => {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            });
        }
        this.setState({validated:true})

    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        let {organizations} = this.state.association

        return (

            <Form onSubmit={this.handleSubmit} className="signup-form">
                <Button variant={"secondary"} className="signup-form-button" onClick={this.addNewOrganization}>Lägga organisation</Button>
                <Accordion defaultActiveKey="0">
                    <OrganizationInput remove={this.remove} errors={this.state.errors} handleChange={this.handleChange}
                                       addContact={this.addNewContact} addHouse={this.addNewHouse}
                                       addAssociation={this.addNewAssociation} organizations={organizations}/>
                </Accordion>
                <Button variant="secondary" type="submit">Register</Button>
            </Form>

        );
    }


}

export default CreateNewOrganisations;