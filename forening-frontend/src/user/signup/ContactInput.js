import React from 'react';
import {Accordion, Button, Card, Form, useAccordionToggle} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const ContactInput = (props) => {
    return (
        props.contacts.map((val, idx) => {
            let contactNameId = `contactName-${idx}`, contactTelephoneId = `contactTelephone-${idx}`,
                contactEmailId = `contactEmail-${idx}`;
            return (
                <div key={idx}>
                    <Card>
                        <Card.Header>
                            <Button data-organization={props.organization} data-association={props.association}
                                    className={"pull-right"} variant={"danger"}
                                    onClick={(event) => props.remove(event, idx, 'contact')}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                            <CustomToggle eventKey={'contact' + idx}>
                                Kontakt {idx + 1}
                            </CustomToggle>
                        </Card.Header>

                        <Accordion.Collapse eventKey={'contact' + idx} id={'contact' + {idx}}>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Namn</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={contactNameId}
                                        data-id={idx}
                                        autoComplete="off"
                                        data-organization={props.organization}
                                        data-association={props.association}
                                        id={contactNameId}
                                        placeholder="Namn"
                                        value={props.contacts[idx].contactName}
                                        onChange={props.handleChange}
                                        className={"contactName"}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Skriva in namn
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Telefonnummer</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name={contactTelephoneId}
                                        data-id={idx}
                                        autoComplete="off"
                                        data-organization={props.organization}
                                        data-association={props.association}
                                        id={contactTelephoneId}
                                        placeholder="Telefonnummer"
                                        value={props.contacts[idx].contactTelephone}
                                        onChange={props.handleChange}
                                        className={"contactTelephone"}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Skriva in telefonnummer
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        name={contactEmailId}
                                        data-id={idx}
                                        data-organization={props.organization}
                                        data-association={props.association}
                                        id={contactEmailId}
                                        autoComplete="off"
                                        placeholder="E-mail"
                                        value={props.contacts[idx].contactEmail}
                                        onChange={props.handleChange}
                                        className={"contactEmail"}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Skriva in email
                                    </Form.Control.Feedback>
                                    {props.errors.contactEmail.length > 0 &&
                                    <span className='error'>{props.errors.contactEmail}</span>}
                                </Form.Group>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
            )
        })
    )
}

function CustomToggle({children, eventKey}) {

    const decoratedOnClick = useAccordionToggle(eventKey, () =>
        console.log('totally custom!'),
    );
    return (
        <div
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}


export default ContactInput;