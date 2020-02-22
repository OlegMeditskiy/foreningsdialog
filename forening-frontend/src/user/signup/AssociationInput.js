import React from 'react';
import {Button, Form} from "react-bootstrap";
import ContactInput from "./ContactInput";
import HouseInput from "./HouseInput";


const AssociationInput = (props)=>{
    return(
        props.associations.map((val,idx)=>{
            let associationNameId = `associationName-${idx}`
            return(
                <div key={idx}>
                    <Form.Group>
                        <Form.Label>Forenings namn {idx+1}</Form.Label>
                        <Form.Control
                            type="text"
                            name={associationNameId}
                            data-id={idx}
                            autoComplete="off"
                            data-organization={props.organization}
                            id={associationNameId}
                            placeholder="Forenings namn"
                            // value={props.organizations[idx].orgNumber}
                            className={"associationName"}
                        />
                    </Form.Group>
                    <div className={"contact"}>
                        <Button onClick={(event)=>props.addContact(event,props.organization,idx)}>Lagga contact</Button>
                        <ContactInput errors={props.errors} organization={props.organization} association={idx} contacts={props.associations[idx].contacts}/>
                    </div>
                    <hr/>
                </div>
            )
        })
    )
}

export default AssociationInput;