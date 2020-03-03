import React, {Component} from 'react';
import './NotFound.css';
import {Button, Result} from 'antd';

class NotFound extends Component {
    render() {

        return (
            <Result
                status="404"
                title="404"
                subTitle="Sorry, page not found."
                extra={<Button type="primary">Back Home</Button>}
            />
        );
    }
}

export default NotFound;