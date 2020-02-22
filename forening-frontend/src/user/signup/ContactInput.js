import React from 'react';
import {Button, Form} from "react-bootstrap";



const ContactInput = (props)=>{
    return(
        props.contacts.map((val,idx)=>{
            let contactNameId = `contactName-${idx}`,contactTelephoneId = `contactTelephone-${idx}`,contactEmailId = `contactEmail-${idx}`
            return(
                <div key={idx}>
                    <div>Contact {idx+1}</div>
                    <Form.Group>
                        <Form.Label>Namn</Form.Label>
                        <Form.Control
                            type="text"
                            name={contactNameId}
                            data-id={idx}
                            autoComplete="off"
                            data-organization={props.organization}
                            data-association={props.association}
                            id={contactNameId}
                            placeholder="Namn"
                            // value={props.organizations[idx].orgNumber}
                            className={"contactName"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefonnummer</Form.Label>
                        <Form.Control
                            type="number"
                            name={contactTelephoneId}
                            data-id={idx}
                            autoComplete="off"
                            data-organization={props.organization}
                            data-association={props.association}
                            id={contactTelephoneId}
                            placeholder="Telefonnummer"
                            // value={props.organizations[idx].orgNumber}
                            className={"contactTelephone"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            name={contactEmailId}
                            data-id={idx}
                            data-organization={props.organization}
                            data-association={props.association}
                            id={contactEmailId}
                            autoComplete="off"
                            placeholder="E-mail"
                            // value={props.organizations[idx].orgNumber}
                            className={"contactEmail"}
                        />
                        {props.errors.contactEmail.length > 0 &&
                        <span className='error'>{props.errors.contactEmail}</span>}
                    </Form.Group>
                    <hr/>
                </div>
            )
        })
    )
}

export default ContactInput;