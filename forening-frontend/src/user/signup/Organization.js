import React, {Component} from 'react';

class Organization extends Component {
    render() {
        return (
            <div>
                <input type="text" name={this.props.keyId+'number'}/>
            </div>
        );
    }
}

export default Organization;