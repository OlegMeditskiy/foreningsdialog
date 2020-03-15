import React,{Component} from "react";
import {getGuestRegister, signup, signupGuest} from "../../util/APIUtils";
import {Button, Form} from "react-bootstrap";
import {notification} from "antd";

class GuestRegister extends Component{
    constructor(props) {
        super(props);
        this.state={
            username:"",
            password:"",
            address:"",
            number:0,
            area:0,
            roomAndKitchen:0,
            isLoading: false
        }
        this.loadGuestUser=this.loadGuestUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadGuestUser(uniqueKey){
        this.setState({
            isLoading: true
        });

        getGuestRegister(uniqueKey).then(response => {
            console.log(response);
            this.setState({
                address: response.address,
                number: response.number,
                area: response.area,
                roomAndKitchen: response.roomAndKitchen,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
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
        if(this.props.match.params.uniqueKey !== nextProps.match.params.uniqueKey) {
            this.loadGuestUser(nextProps.match.params.username);
        }

    }
    handleSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            username: this.state.username,
            password: this.state.password
        };
        signupGuest(signupRequest)
            .then(response => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push("/login");
            }).catch(error => {
            notification.error({
                message: 'Föreningsdialog App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    handleChange(event) {

        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <p>{this.state.address}</p>
                <p>{this.state.number}</p>
                <p>{this.state.area}</p>
                <p>{this.state.roomAndKitchen}</p>
                <Form onSubmit={this.handleSubmit} className="signup-form" >
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
                    <Button variant="primary" type="submit">Register</Button>
                </Form>
            </div>
        )
    }
}
export default GuestRegister;