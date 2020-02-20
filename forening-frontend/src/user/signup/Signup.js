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

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            association:{
                name:'new',

            },
            organizations:[{
                orgNumber:''
            }],
            house:{
                address: '',
                city: '',
                zipCode:'',
            },
            associationsName:{
              name:{},
              contacts:[]
            },
            contact:{
                name: '',
                telephone:'',
                email: ''
            },
            name: {
                value: ''
            },
            countContacts:0,
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleOrganizationInputChange=this.handleOrganizationInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewOrganization = this.addNewOrganization.bind(this);
    }



    handleHouseInputChange(event, validationFun){
        var i;
        for (i=0;i<this.state.countContacts;i++) {
            const target44 = event.target+i;

        }
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            house: {
                [inputName]: inputValue,
                    ...validationFun(inputValue)
            }
        })
    }



    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }


    handleSubmit(event) {
        event.preventDefault();
        const signupRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value,
            organization: this.state.organization
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
                message: 'Forenings App',
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

    handleOrganizationInputChange(event, validationFun,whichOrganization){
        console.log('Change org '+ whichOrganization);
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState(state=>{

            const number = state.organizationNumber[whichOrganization];
            number.value=inputValue;
            const list = state.association.organizations.map((organization,index)=>{
               if (whichOrganization==index){
                   return organization.organizationNumber = inputValue;
               }
            });
            return{
                list,
                number
            };
        });
        console.log(this.state.association.organizations[0].organizationNumber);
    }
    createNewOrganization(){
        const organization = {
            organizationNumber: '123',
                numberOfApartments: '',
                totalArea: '',
                associationsNames: [],
                houses: []
        }
        const number ={
            value:''
        }
          this.setState(state=>{
              const list = state.association.organizations.push(organization);
            return{
                list
            }
          })
        console.log(this.state.association);
    }

    handleChange = (e) =>{
        if(["orgNumber"].includes(e.target.className) ){
            let organizations = this.state.organizations
            organizations[e.target.dataset.id][e.target.className]=e.target.value.toUpperCase()
            this.setState({organizations},()=>console.log(this.state.organizations))
        }
        else{
            this.setState({[e.target.className]:e.target.value.toUpperCase()})
        }
    }
    addNewOrganization=(e)=>{
        this.setState((prevState)=>({
            organizations: [...prevState.organizations,{orgNumber:""}]
        }));
    }


    render() {
        let {organizations} = this.state
        console.log(organizations);
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>


                <div className="signup-content">

                    <Form onSubmit={this.handleSubmit} className="signup-form">
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
                    </Form>
                    <Form  onChange={this.handleChange}>
                        <div>
                            <h1>Organization</h1>
                        </div>
                        <button onClick={this.addNewOrganization}>Add organization</button>
                        <OrganizationInput organizations={organizations}/>
                        <input type="submit" value="Submit"/>
                    </Form>
                </div>
                </div>
        );
    }

    // Validation Functions


    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateAddress = (address) => {
        if(address.length < ADDRESS_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Address is too short (Minimum ${ADDRESS_MIN_LENGTH} characters needed.)`
            }
        } else if (address.length > ADDRESS_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Address is too long (Maximum ${ADDRESS_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateEmail = (email) => {
        if(!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'                
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if(!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if(email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

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
    validateOrganizationNumber = (organizationNumber) => {
        if(organizationNumber.length < ORG_NUMBER_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Number is too short (Minimum ${ORG_NUMBER_MIN_LENGTH} characters needed.)`
            }
        } else if (organizationNumber.length > ORG_NUMBER_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Number is too long (Maximum ${ORG_NUMBER_MAX_LENGTH} characters allowed.)`
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