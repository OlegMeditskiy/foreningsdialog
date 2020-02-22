import React from 'react';
import {Button, Form} from "react-bootstrap";
import OrganizationInput from "./OrganizationInput";



const HouseInput = (props)=>{
    return(
        props.houses.map((val,idx)=>{
            let addressId = `address-${idx}`,cityId = `city-${idx}`,zipCodeId = `zipCode-${idx}`
            return(
                <div key={idx}>
                    <div>Hus {idx+1}</div>
                    <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name={addressId}
                            data-id={idx}
                            data-organization={props.organization}
                            id={addressId}
                            placeholder="Address"
                            // value={props.organizations[idx].orgNumber}
                            className={"address"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ort</Form.Label>
                        <Form.Control
                            type="text"
                            name={cityId}
                            data-id={idx}
                            data-organization={props.organization}
                            id={cityId}
                            placeholder="Ort"
                            // value={props.organizations[idx].orgNumber}
                            className={"city"}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Postnummer</Form.Label>
                        <Form.Control
                            type="number"
                            name={zipCodeId}
                            data-id={idx}
                            data-organization={props.organization}
                            id={zipCodeId}
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                            }}
                            placeholder="Postnummer"
                            // value={props.organizations[idx].orgNumber}
                            className={"zipCode"}
                        />
                        {props.errors.zipCode.length > 0 &&
                        <span className='error'>{props.errors.zipCode}</span>}
                    </Form.Group>
                    <hr/>
                </div>
            )
        })
    )
}

export default HouseInput;