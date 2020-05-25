import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN} from '../constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import Admin from "../roles/Admin";
import {Layout, notification} from 'antd';
import PrivateRoute from "../common/PrivateRoute";
import Profile from "../user/profile/Profile";
import GuestRegister from "../user/signup/GuestRegister";
import {getCurrentUser} from "../util/GetAPI";

const {Content} = Layout;


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: null,
            isLoading: false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAuthenticated: true,
                    isLoading: false
                });
            }).catch(() => {
            this.setState({
                isLoading: false
            });
        });

    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

        notification[notificationType]({
            message: 'Förenings App',
            description: description,
        });
    }


    handleLogin() {
        notification.success({
            message: 'Förenings App',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push("/");
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
                <Layout className="app-container">
                    <AppHeader isAuthenticated={this.state.isAuthenticated}
                               currentUser={this.state.currentUser}
                               onLogout={this.handleLogout}/>
                    <Content className="app-content">
                        <div className="container">
                            <Switch>

                                <Route path="/login"
                                       render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                                <Route path="/signup" component={Signup}/>
                                <Route path="/users/:username"
                                       render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                                   currentUser={this.state.currentUser} {...props}  />}>
                                </Route>
                                <Route path="/guestRegister/:uniqueKey"
                                       render={(props) => <GuestRegister {...props}  />}>
                                </Route>
                                {(this.state.isAuthenticated!==null)?<PrivateRoute authenticated={this.state.isAuthenticated} path="/" handleLogout={this.handleLogout}
                                                                                   currentUser={this.state.currentUser} component={Admin} />:null}
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            );

    }
}

export default withRouter(App);
