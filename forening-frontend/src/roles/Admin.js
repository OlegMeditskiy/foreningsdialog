import React from "react";
import MainAdmin from "./MainAdmin/MainAdmin";
import AssociationAdmin from "./AssociationAdmin";
import {Redirect} from "react-router-dom";

const Admin = (props) => {
    function Who() {
        if (props.currentUser.authorities.some(authority => authority.authority === 'ROLE_ADMIN')) {
            return <AssociationAdmin isAuthenticated={props.isAuthenticated}
                                     currentUser={props.currentUser} handleLogout={props.handleLogout} {...props} />
        } else if (props.currentUser.authorities.some(authority => authority.authority === 'ROLE_MAIN_ADMIN')) {
            return <MainAdmin isAuthenticated={props.isAuthenticated}
                              currentUser={props.currentUser} handleLogout={props.handleLogout} {...props} />
        } else {
            return "nothing";
        }
    }
    if (!props.currentUser) {
        return <Redirect
            to={{
                pathname: '/login',
                state: {from: props.location}
            }}
        />

    } else {
        return (
            <div>
                <Who/>
            </div>
        )
    }

}

export default Admin;