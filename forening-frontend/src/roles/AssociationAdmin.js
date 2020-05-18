import React, {Component} from 'react';
import AdminMainPage from "../displayObject/AdminMainPage";
import '../displayObject/list.css'

class AssociationAdmin extends Component {
    render() {

        return (
            <div className="list-container">
                <div className="list-content">
                    <AdminMainPage
                        currentUser={this.props.currentUser}
                        username={this.props.currentUser.username}
                        {...this.props} type="USER_CREATED_POLLS"/>
                </div>
            </div>

        )
    }


}

export default AssociationAdmin;