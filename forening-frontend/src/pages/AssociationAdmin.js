import React, {Component} from 'react';
import AssociationList from "./AssociationList";
class AssociationAdmin extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {

        return (
            <div className="login-container">
        <div className="login-content">
            <AssociationList isAuthenticated={this.props.isAuthenticated}
                             currentUser={this.props.currentUser} handleLogout={this.props.handleLogout}/>
        </div>
            </div>

        )}


}
export default AssociationAdmin;