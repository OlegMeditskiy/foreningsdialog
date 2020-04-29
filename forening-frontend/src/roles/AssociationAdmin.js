import React, {Component} from 'react';
import AssociationList from "../displayObject/AssociationList";
import '../displayObject/list.css'

class AssociationAdmin extends Component{
    render() {

        return (
            <div className="list-container">
        <div className="list-content">
            <AssociationList
                             currentUser={this.props.currentUser}
                             username={this.props.currentUser.username}
                             {...this.props} type="USER_CREATED_POLLS"/>
        </div>
            </div>

        )}


}
export default AssociationAdmin;