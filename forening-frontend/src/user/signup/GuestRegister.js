import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {notification} from "antd";
import {signupGuest} from "../../util/AuthorizationAPI";
import {getGuestRegister} from "../../util/GetAPI";

class GuestRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            username: "",
            password: "",
            address: "",
            number: 0,
            area: 0,
            roomAndKitchen: 0,
            isLoading: false,
            uniqueKey: '',
            activated: false,
            name:''
        }
        this.loadGuestUser = this.loadGuestUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadGuestUser(uniqueKey) {
        this.setState({
            isLoading: true
        });

        getGuestRegister(uniqueKey).then(response => {

            this.setState({
                address: response.address,
                number: response.number,
                area: response.area,
                roomAndKitchen: response.roomAndKitchen,
                isLoading: false,
                uniqueKey: uniqueKey,
                activated: response.activated,
                id:response.id,
            });
        }).catch(error => {
            if (error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const uniqueKey = this.props.match.params.uniqueKey;
        this.loadGuestUser(uniqueKey);
    }

    componentDidUpdate(nextProps) {
        if (this.props.match.params.uniqueKey !== nextProps.match.params.uniqueKey) {
            this.loadGuestUser(nextProps.match.params.username);
        }

    }

    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            username: this.state.username,
            password: this.state.password,
            uniqueKey: this.state.uniqueKey,
            name:this.state.name,
            guestId:this.state.id
        };
        signupGuest(signupRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    handleChange(event) {

        this.setState({[event.target.name]: event.target.value});

    }


    render() {
         console.log(this.state.id)

        if (this.state.activated) {
            return (
                <div>ACTIVATED</div>
            )
        } else {
            return (
                <div>
                    <p>{this.state.address}</p>
                    <p>{this.state.number}</p>
                    <p>{this.state.area}</p>
                    <p>{this.state.roomAndKitchen}</p>
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="username"
                                type="text"
                                autoComplete="new-email"
                                className={"username"}
                                placeholder="Username"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                className={"password"}
                                placeholder="A password between 6 to 20 characters"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                size="large"
                                name="name"
                                type="text"
                                className={"name"}
                                placeholder="name"
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button variant="secondary" type="submit">Register</Button>
                    </Form>
                </div>
            )
        }
    }
}

export default GuestRegister;