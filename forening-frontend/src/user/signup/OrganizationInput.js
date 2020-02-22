import React from 'react';
import {Button, Form} from "react-bootstrap";
import AssociationInput from "./AssociationInput";
import HouseInput from "./HouseInput";
import {ORG_NUMBER_MAX_LENGTH, ORG_NUMBER_MIN_LENGTH} from "../../constants";

const OrganizationInput = (props)=>{
    return(
        props.organizations.map((val,idx)=>{
            let orgNumberId = `orgNumber-${idx}`, totalAreaId = `totalArea-${idx}`,numberOfApartmentsId = `numberOfApartments-${idx}`
            return(
                <div key={idx}>
                    <Form.Group>
                        <Form.Label>Organisation {idx+1}</Form.Label>
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
                            // value={props.organizations[idx].orgNumber}
                            className={"orgNumber"}
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
                            id={totalAreaId}
                            // value={props.organizations[idx].orgNumber}
                            className="totalArea"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Antal lagenheter</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Antal lagenheter"
                            name={numberOfApartmentsId}
                            data-id={idx}
                            id={numberOfApartmentsId}
                            // value={props.organizations[idx].orgNumber}
                            className="numberOfApartments"
                        />
                    </Form.Group>
                    <div className={"association"}>
                        <Button onClick={(event)=>props.addAssociation(event,idx)}>Lagga forening</Button>
                        <AssociationInput addContact={props.addContact} organization={idx} associations={props.organizations[idx].associations}/>
                    </div>
                    <div className={"house"}>
                        <Button onClick={(event)=>props.addHouse(event,idx)}>Lagga hus</Button>
                        <HouseInput errors={props.errors} organization={idx} houses={props.organizations[idx].houses}/>
                    </div>

                    <hr/>
                </div>
            )
        })
    )
}


export default OrganizationInput;