import React, {Component} from "react";
import MainAdmin from "./MainAdmin";
import {Container, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MainPage from '../pages/MainPage';
import AssociationAdmin from "./AssociationAdmin";
const Admin=(props) =>{


   function Who(){

       if(props.currentUser.authorities.some(authority=>authority.authority==='ROLE_ADMIN')){
           return <AssociationAdmin/>
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