import React from 'react';
import {Accordion, Card, useAccordionToggle} from "react-bootstrap";

const ContactsList =(props)=>{
    return(
        props.contacts.map((org,idx)=>{
            return(
                <div key={idx}>
                    <Card>
                        <Card.Header>
                            <CustomToggle eventKey={'organisation'+idx}>
                                Contact {idx+1}
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={'organisation'+idx} id={'organisation'+{idx}}>
                            <Card.Body>
                                <p>
                                    {org.contactName}
                                </p>
                                <p>
                                    {org.contactEmail}
                                </p>
                                <p>
                                    {org.contactTelephone}
                                </p>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>

            )
        })

    )
}
function CustomToggle({ children, eventKey }) {
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


export default ContactsList;