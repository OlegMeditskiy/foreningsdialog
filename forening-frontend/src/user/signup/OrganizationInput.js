import React from 'react';
import {Accordion, Button, Card, Form, useAccordionToggle} from "react-bootstrap";
import AssociationInput from "./AssociationInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const OrganizationInput = (props)=>{

    return(
        props.organizations.map((val,idx)=>{
            let orgNumberId = `orgNumber-${idx}`, totalAreaId = `totalArea-${idx}`,numberOfApartmentsId = `numberOfApartments-${idx}`
            return(
                <div key={idx} id={"organization"+idx}>
                        <Card>
                            <Card.Header>
                                <Button className={"pull-right"} variant={"danger"} onClick={(event)=>props.remove(event,idx,'organization')} >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                                <CustomToggle eventKey={'organisation'+idx}>
                                    Organisation {idx+1}
                                </CustomToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={'organisation'+idx} id={'organisation'+{idx}}>
                                <Card.Body>

                                    <Form.Group>
                                        <Form.Label>Organisationsnummer</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name={orgNumberId}
                                            data-id={idx}
                                            id={orgNumberId}
                                            autoComplete="off"
                                            onInput = {(e) =>{
                                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                                            }}
                                            placeholder="Organisationsnummer"
                                            value={val.orgNumber}
                                            className={"orgNumber"}
                                            onChange={props.handleChange}
                                        />
                                        {props.errors.orgNumber.length > 0 &&
                                        <span className='error'>{props.errors.orgNumber}</span>}
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Total area</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Total area"
                                            name={totalAreaId}
                                            data-id={idx}
                                            autoComplete="off"
                                            id={totalAreaId}
                                            value={val.totalArea}
                                            onChange={props.handleChange}
                                            className="totalArea"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Antal lägenheter</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Antal lagenheter"
                                            name={numberOfApartmentsId}
                                            data-id={idx}
                                            autoComplete="off"
                                            id={numberOfApartmentsId}
                                            value={val.numberOfApartments}
                                            onChange={props.handleChange}
                                            className="numberOfApartments"
                                        />
                                    </Form.Group>
                                    <div className={"association"}>
                                        <Button className="signup-form-button" onClick={(event)=>props.addAssociation(event,idx)}>Lägga förening</Button>
                                        <Accordion defaultActiveKey="0">
                                            <AssociationInput remove={props.remove} errors={props.errors} handleChange={props.handleChange} addContact={props.addContact} addHouse={props.addHouse} organization={idx} associations={props.organizations[idx].associations}/>
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

export default OrganizationInput;