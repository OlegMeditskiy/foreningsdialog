import React from 'react';
import {Accordion, Card, useAccordionToggle} from "react-bootstrap";
import HousesList from "./HousesList";
import ContactsList from "./ContactList";
import {Link} from "react-router-dom";

const AssociationsList =(props)=>{
    return(
        props.associations.map((org,idx)=>{
            return(
                <div key={idx}>
                    <Card>
                        <Card.Header>
                            <CustomToggle eventKey={'organisation'+idx}>
                                Förening {idx+1}
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={'organisation'+idx} id={'organisation'+{idx}}>
                            <Card.Body>
                                <div>
                                    <Link to={{pathname:`${props.match.url}/association/${org.id}`,state:{
                                            association: org,
                                        }}}>To association</Link>
                                    <p>
                                        Föreningsnamn: {org.associationName}
                                    </p>
                                    <div className={"contact"}>
                                        <Accordion defaultActiveKey="0">
                                            <ContactsList contacts={org.contacts}/>
                                        </Accordion>
                                    </div>
                                    <div className={"house"}>
                                        <Accordion defaultActiveKey="0">
                                            <HousesList houses={org.houses}/>
                                        </Accordion>
                                    </div>
                                </div>

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


export default AssociationsList;