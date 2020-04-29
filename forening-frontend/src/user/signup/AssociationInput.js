import React from 'react';
import {Accordion, Button, Card, Form} from "react-bootstrap";
import ContactInput from "./ContactInput";
import HouseInput from "./HouseInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const AssociationInput = (props)=>{
    return(
        props.associations.map((val,idx)=>{
            let associationNameId = `associationName-${idx}`;
            let organizationId=props.organization;
            console.log(organizationId)
            return(
                <div key={idx}>
                    <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={'association'+idx}>
                                Förening {idx+1}
                                <Button data-organization={organizationId} className={"pull-right"} variant={"danger"} onClick={(event)=>props.remove(event,idx,'association')} >
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </Accordion.Toggle>
                        {/*<Card.Header>*/}
                        {/*    <Button data-organization={props.organization} data-association={props.association} className={"pull-right"} variant={"danger"} onClick={(event)=>props.remove(event,idx,'house')} >*/}
                        {/*        <FontAwesomeIcon icon={faTrash}/>*/}
                        {/*    </Button>*/}
                        {/*    <CustomToggle eventKey={'house'+idx}>*/}
                        {/*        Hus {idx+1}*/}
                        {/*    </CustomToggle>*/}
                        {/*</Card.Header>*/}
                        <Accordion.Collapse eventKey={'association'+idx} id={'organisation'+{idx}}>
                            <Card.Body>

                            <Form.Group>
                        <Form.Label>Förenings namn {idx+1}</Form.Label>
                        <Form.Control
                            type="text"
                            name={associationNameId}
                            data-id={idx}
                            autoComplete="off"
                            data-organization={props.organization}
                            id={associationNameId}
                            placeholder="Forenings namn"
                            value={props.associations[idx].associationName}
                            onChange={props.handleChange}
                            className={"associationName"}
                        />
                    </Form.Group>
                    <div className={"contact"}>
                        <Button className="signup-form-button" onClick={(event)=>props.addContact(event,props.organization,idx)}>Lägga contact</Button>
                        <Accordion defaultActiveKey={"0"}>
                        <ContactInput remove={props.remove} handleChange={props.handleChange} errors={props.errors} organization={props.organization} association={idx} contacts={props.associations[idx].contacts}/>
                        </Accordion>
                    </div>
                    <div className={"house"}>
                        <Accordion defaultActiveKey={"0"}>
                        <Button className="signup-form-button" onClick={(event)=>props.addHouse(event,props.organization,idx)}>Lägga hus</Button>
                        <HouseInput remove={props.remove} handleChange={props.handleChange} errors={props.errors} organization={props.organization} association={idx} houses={props.associations[idx].houses}/>
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

export default AssociationInput;