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
                        <Button type="secondary" htmlType="submit" className="login-form-button">
                            Logga in
                        </Button>
                        Or <a href="/signup">registrera nu!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};




export default Login;