import React from 'react';
import {Form} from "react-bootstrap";



const OrganizationInput = (props)=>{
    return(
        props.organizations.map((val,idx)=>{
            let orgNumberId = `orgNumber-${idx}`, totalAreaId = `totalArea-${idx}`,numberOfApartmentsId = `numberOfApartments-${idx}`
            return(
                <div key={idx}>
                    <Form.Group>
                        <Form.Label>Organisation #{idx+1}</Form.Label>
                        <Form.Control
                            type="text"
                            name={orgNumberId}
                            data-id={idx}
                            id={orgNumberId}
                            placeholder="Organisationsnummer"
                            // value={props.organizations[idx].orgNumber}
                            className={"orgNumber"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total area</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Total area"
                            name={totalAreaId}
                            data-id={idx}
                            id={totalAreaId}
                            // value={props.organizations[idx].orgNumber}
                            className="totalArea"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Total area</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Antal lagenheter"
                            name={numberOfApartmentsId}
                            data-id={idx}
                            id={numberOfApartmentsId}
                            // value={props.organizations[idx].orgNumber}
                            className="numberOfApartments"
                        />
                    </Form.Group>
                    <hr/>
                </div>
            )
        })
    )
}

export default OrganizationInput;