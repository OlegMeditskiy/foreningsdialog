import React from 'react';
import './Login.css';
import {ACCESS_TOKEN} from '../../constants';
import {Button, Form, Input, notification} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {login} from "../../util/AuthorizationAPI";

const Login = (props) => {
    const onFinish = values => {
        const loginRequest = values;
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                props.onLogin();
            }).catch(error => {
            if (error.status === 401) {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: 'Your Username or Password is incorrect. Please try again!'
                });
            } else {
                notification.error({
                    message: 'Föreningsdialog App',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        })
    };

    return (
        <div className="login-container">
            <h1 className="page-title">Login</h1>
            <div className="login-content">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="/signup">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

// class Login extends Component {
//     render() {
//         const AntWrappedLoginForm = Form.create()(LoginForm)
//         return (
//             <div className="login-container">
//                 <h1 className="page-title">Login</h1>
//                 <div className="login-content">
//                     <AntWrappedLoginForm onLogin={this.props.onLogin} />
//                 </div>
//             </div>
//         );
//     }
// }
//
// class LoginForm extends Component {
//     constructor(props) {
//         super(props);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//
//
//     render() {
//         const { getFieldDecorator } = this.props.form;
//         return (
//             <Form onSubmit={this.handleSubmit} className="login-form">
//                 <FormItem>
//                     {getFieldDecorator('username', {
//                         rules: [{ required: true, message: 'Please input your email!' }],
//                     })(
//                     <Input
//                         type="email"
//                         prefix={<Icon type="user" />}
//                         size="large"
//                         name="username"
//                         placeholder="E-mail" />
//                     )}
//                 </FormItem>
//                 <FormItem>
//                 {getFieldDecorator('password', {
//                     rules: [{ required: true, message: 'Please input your Password!' }],
//                 })(
//                     <Input
//                         prefix={<Icon type="lock" />}
//                         size="large"
//                         name="password"
//                         type="password"
//                         placeholder="Password"  />
//                 )}
//                 </FormItem>
//                 <FormItem>
//                     <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
//                     Or <Link to="/signup">register now!</Link>
//                 </FormItem>
//             </Form>
//         );
//     }
// }


export default Login;