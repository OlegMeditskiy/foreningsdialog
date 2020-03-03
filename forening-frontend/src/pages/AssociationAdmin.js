import React, {Component} from 'react';
import AssociationList from "./AssociationList";
import '../user/signup/list.css'
class AssociationAdmin extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {

        return (
            <div className="list-container">
        <div className="list-content">
            <AssociationList isAuthenticated={this.props.isAuthenticated}
                             currentUser={this.props.currentUser} handleLogout={this.props.handleLogout} username={this.props.currentUser.username} type="USER_CREATED_POLLS"/>
        </div>
            </div>

        )}


}
export default AssociationAdmin;