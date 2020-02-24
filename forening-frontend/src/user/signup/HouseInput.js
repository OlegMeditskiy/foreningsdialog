import React from 'react';
import {Accordion, Button, Card, Form, useAccordionToggle} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const HouseInput = (props)=>{
    return(
        props.houses.map((val,idx)=>{
            let streetId = `street-${idx}`,cityId = `city-${idx}`,zipCodeId = `zipCode-${idx}`
            return(
                <div key={idx}>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={'house'+idx}>
                            Hus {idx+1}
                            <Button data-organization={props.organization} data-association={props.association} className={"pull-right"} variant={"danger"} onClick={(event)=>props.remove(event,idx,'house')} >
                                <FontAwesomeIcon icon={faTrash}/>
                            </Button>
                        </Accordion.Toggle>

                        <Accordion.Collapse eventKey={'house'+idx} id={'organisation'+{idx}}>
                            <Card.Body>

                            <Form.Group>
                        <Form.Label>Gatuadress</Form.Label>
                        <Form.Control
                            type="text"
                            name={streetId}
                            data-id={idx}
                            data-organization={props.organization}
                            id={streetId}
                            data-association={props.association}
                            autoComplete="off"
                            placeholder="Gata"
                            className={"street"}
                            value={props.houses[idx].street}
                            onChange={props.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Ort</Form.Label>
                        <Form.Control
                            type="text"
                            name={cityId}
                            data-id={idx}
                            data-organization={props.organization}
                            data-association={props.association}
                            id={cityId}
                            autoComplete="off"
                            placeholder="Ort"
                            value={props.houses[idx].city}
                            onChange={props.handleChange}
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
                            data-association={props.association}
                            id={zipCodeId}
                            autoComplete="off"
                            onInput = {(e) =>{
                                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,5)
                            }}
                            placeholder="Postnummer"
                            value={props.houses[idx].zipCode}
                            onChange={props.handleChange}
                            className={"zipCode"}
                        />
                        {props.errors.zipCode.length > 0 &&
                        <span className='error'>{props.errors.zipCode}</span>}
                    </Form.Group>
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
        children
    );
}

export default HouseInput;