import React from 'react';
import {Form} from "react-bootstrap";



const OrganizationInput = (props)=>{
    return(
        props.organizations.map((val,idx)=>{
            let orgNumberId = `orgNumber-${idx}`, totalAreaId = `totalArea-${idx}`,numberOfApartmentsId = `numberOfApartments-${idx}`
            return(
                <div key={idx}>
                    <Form.Group className>
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
                    {/*<FormItem htmlFor={orgNumberId} label={`Organisation #${idx+1}`}>*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        name={orgNumberId}*/}
                    {/*        data-id={idx}*/}
                    {/*        id={orgNumberId}*/}
                    {/*        placeholder="Organisationsnummer"*/}
                    {/*        // value={props.organizations[idx].orgNumber}*/}
                    {/*            className={"orgNumber"}*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
                    {/*<FormItem htmlFor={totalAreaId} label={`Total area`}>*/}

                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Total area"*/}
                    {/*        name={totalAreaId}*/}
                    {/*        data-id={idx}*/}
                    {/*        id={totalAreaId}*/}
                    {/*        // value={props.organizations[idx].orgNumber}*/}
                    {/*        className="totalArea"*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
                    {/*<FormItem htmlFor={numberOfApartmentsId}  label={`Antal lagenheter`}>*/}
                    {/*    <Input*/}
                    {/*        type="text"*/}
                    {/*        placeholder="Antal lagenheter"*/}
                    {/*        name={numberOfApartmentsId}*/}
                    {/*        data-id={idx}*/}
                    {/*        id={numberOfApartmentsId}*/}
                    {/*        // value={props.organizations[idx].orgNumber}*/}
                    {/*        className="numberOfApartments"*/}
                    {/*    />*/}
                    {/*</FormItem>*/}
                    <hr/>
                    {/*<label htmlFor={orgNumberId}>{`OrgNumber #${idx+1}`}</label>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name={orgNumberId}*/}
                    {/*    data-id={idx}*/}
                    {/*    id={orgNumberId}*/}
                    {/*    // value={props.organizations[idx].orgNumber}*/}
                    {/*    className="orgNumber"*/}
                    {/*/>*/}
                    {/*<label htmlFor={totalAreaId}>{`Total area`}</label>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name={totalAreaId}*/}
                    {/*    data-id={idx}*/}
                    {/*    id={totalAreaId}*/}
                    {/*    // value={props.organizations[idx].orgNumber}*/}
                    {/*    className="totalArea"*/}
                    {/*/>*/}
                    {/*<label htmlFor={numberOfApartmentsId}>{`Antal lagenheter`}</label>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    name={numberOfApartmentsId}*/}
                    {/*    data-id={idx}*/}
                    {/*    id={numberOfApartmentsId}*/}
                    {/*    // value={props.organizations[idx].orgNumber}*/}
                    {/*    className="numberOfApartments"*/}
                    {/*/>*/}
                </div>
            )
        })
    )
}

export default OrganizationInput;