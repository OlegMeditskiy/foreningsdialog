import React from 'react';
import {Accordion, Card, useAccordionToggle} from "react-bootstrap";

const HousesList =(props)=>{
    return(
        props.houses.map((org,idx)=>{
            return(
                <div key={idx}>
                    <Card>
                        <Card.Header>
                            <CustomToggle eventKey={'organisation'+idx}>
                                {org.street}
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={'organisation'+idx} id={'organisation'+{idx}}>
                            <Card.Body>
                                <div>
                                    <p>
                                        Gatuadress: {org.street}
                                    </p>
                                    <p>
                                        Ort: {org.city}
                                    </p>
                                    <p>
                                        Postnummer: {org.zipCode}
                                    </p>
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


export default HousesList;