import React from 'react';
import {Accordion, Card, useAccordionToggle} from "react-bootstrap";
import AssociationsList from "./AssociationsList";

const OrganizationsList =(props)=>{
return(
        props.association.organizations.map((org,idx)=>{
            return(
                <div key={idx}>
                    <Card>
                        <Card.Header>
                            <CustomToggle eventKey={'organisation'+idx}>
                                Organisation {idx+1}
                            </CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={'organisation'+idx} id={'organisation'+{idx}}>
                            <Card.Body>
                                <p>
                                    Organisationsnummer: {org.orgNumber}
                                </p>
                                <p>
                                    Total area: {org.totalArea}
                                </p>
                                <p>
                                    Antal lägenheter: {org.numberOfApartments}
                                </p>
                                <div className={"association"}>
                                    <Accordion defaultActiveKey="0">
                                        <AssociationsList associations={org.associations}/>
                                    </Accordion>

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


export default OrganizationsList;