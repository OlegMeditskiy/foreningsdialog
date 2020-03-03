import React from "react";
import MainAdmin from "./MainAdmin";
import AssociationAdmin from "./AssociationAdmin";

const Admin=(props) =>{


   function Who(){

       if(props.currentUser.authorities.some(authority=>authority.authority==='ROLE_ADMIN')){
           return <AssociationAdmin isAuthenticated={props.isAuthenticated}
                                    currentUser={props.currentUser} handleLogout={props.handleLogout} />
       }
       else if(props.currentUser.authorities.some(authority=>authority.authority==='ROLE_MAIN_ADMIN')){
           return <MainAdmin/>
       }
       else{
           return "nothing";
       }
    }

        return(
            <div>
                <Who/>
            </div>

        )
}

export  default Admin;