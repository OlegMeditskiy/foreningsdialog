import React from "react";
import "./showOrganizations.css";
import {Button, Col, Container, Form, Row, Tab, Tabs} from "react-bootstrap";
import {acceptOrganization, acceptOrganizationUpdate, declineOrganization} from "../../util/SaveAPI";
import {notification} from "antd";

const ShowOrganizations = (props) => {
    const activated = []
    const notActivated = []
    const declined = []

    props.organizations.forEach((org, idx) => {
        if (org.activated) {
            activated.push({
                key: idx,
                id: org.id,
                orgNumber: org.orgNumber,
                totalArea: org.totalArea,
                numberOfApartments: org.numberOfApartments,
                associations: org.associations
            })
        } else {
            if (org.declined) {
                declined.push({
                    key: idx,
                    id: org.id,
                    orgNumber: org.orgNumber,
                    totalArea: org.totalArea,
                    numberOfApartments: org.numberOfApartments,
                    associations: org.associations
                })
            } else {
                notActivated.push({
                    key: idx,
                    id: org.id,
                    orgNumber: org.orgNumber,
                    totalArea: org.totalArea,
                    numberOfApartments: org.numberOfApartments,
                    associations: org.associations
                })
            }


        }
    })
    const acceptOrganizationFunction = (event, organizationId) => {
        event.preventDefault();
        const acceptOrganizationRequest = {
            organizationId: organizationId
        };
        acceptOrganization(acceptOrganizationRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "You have accepted organization " + organizationId,
                });
                props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });


    }

    const declineOrganizationRequest = (event, organizationId) => {
        event.preventDefault();
        const acceptOrganizationRequest = {
            organizationId: organizationId
        };
        declineOrganization(acceptOrganizationRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Du har neckat organisation " + organizationId,
                });
                props.load();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });


    }

    const acceptOrganizationUpdateFunction = (event, organizationId, newOrganizationNumber,newNumberOfApartments,newTotalArea,acceptId)=>{
        event.preventDefault();
        const acceptOrganizationUpdateRequest = {
            organizationId: organizationId,
            newOrganizationNumber:newOrganizationNumber,
            newNumberOfApartments:newNumberOfApartments,
            newTotalArea:newTotalArea,
            acceptId:acceptId
        };
        acceptOrganizationUpdate(acceptOrganizationUpdateRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "You have accepted organization " + organizationId+" update",
                });
                props.updateAccept();
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });


    }

    function ShowActivated() {
        return (
            activated.map((organisation, idx) => {
                let organizationProtokol = "http://localhost:8080/files/organisation_"+organisation.id+"_ArsProtokoll.pdf";
                    return (
                        <div className={"organisations"} key={idx}>
                            <div>
                                <h3>Organisations id - {organisation.id}</h3>
                                <ul>
                                    <li>Organisationsnummer: {organisation.orgNumber}</li>
                                    <li>Total area: {organisation.totalArea}</li>
                                    <li>Antal lägenheter: {organisation.numberOfApartments}</li>
                                    <li><a href={organizationProtokol} target={"_blank"}>Protokol</a></li>
                                </ul>
                            </div>
                            <div className={"associations"}>
                                {organisation.associations.map((association, idx) => {
                                    return (
                                        <div key={idx}>
                                            <h5>Förening {idx + 1}</h5>
                                            <ul>
                                                <li>Föreningsnamn: {organisation.associationName}</li>
                                            </ul>
                                            <div className={"contacts"}>
                                                {association.contacts.map((contact, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Contact {idx + 1}</h5>
                                                            <ul>
                                                                <li>Namn: {contact.contactName}</li>
                                                                <li>Telefon: {contact.contactTelephone}</li>
                                                                <li>E-mail: {contact.contactEmail}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className={"adresses"}>
                                                {association.houses.map((house, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Address {idx + 1}</h5>
                                                            <ul>
                                                                <li>Gatuadress: {house.street}</li>
                                                                <li>Ort: {house.city}</li>
                                                                <li>Postnummer: {house.zipCode}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    )
                }
            )
        )
    }

    function ShowDeclined() {
        return (
            declined.map((organisation, idx) => {
                let organizationProtokol = "http://localhost:8080/files/organisation_"+organisation.id+"_ArsProtokoll.pdf";
                    return (
                        <div className={"organisations"} key={idx}>
                            <div>
                                <h3>Organisations id - {organisation.id}</h3>
                                <ul>
                                    <li>Organisationsnummer: {organisation.orgNumber}</li>
                                    <li>Total area: {organisation.totalArea}</li>
                                    <li>Antal lägenheter: {organisation.numberOfApartments}</li>
                                    <li><a href={organizationProtokol}></a></li>
                                </ul>
                            </div>
                            <div className={"associations"}>
                                {organisation.associations.map((association, idx) => {
                                    return (
                                        <div key={idx}>
                                            <h5>Förening {idx + 1}</h5>
                                            <ul>
                                                <li>Föreningsnamn: {organisation.associationName}</li>
                                            </ul>
                                            <div className={"contacts"}>
                                                {association.contacts.map((contact, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Contact {idx + 1}</h5>
                                                            <ul>
                                                                <li>Namn: {contact.contactName}</li>
                                                                <li>Telefon: {contact.contactTelephone}</li>
                                                                <li>E-mail: {contact.contactEmail}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className={"adresses"}>
                                                {association.houses.map((house, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Address {idx + 1}</h5>
                                                            <ul>
                                                                <li>Gatuadress: {house.street}</li>
                                                                <li>Ort: {house.city}</li>
                                                                <li>Postnummer: {house.zipCode}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    )
                }
            )
        )
    }

    function ShowNotActivated() {
        return (
            notActivated.map((organisation, idx) => {
                let organizationProtokol = "http://localhost:8080/files/organisation_"+organisation.id+"_ArsProtokoll.pdf";
                    return (
                        <div className={"organisations"} key={idx}>
                            <div>
                                <h3>Organisations id - {organisation.id}</h3>
                                <ul>
                                    <li>Organisationsnummer: {organisation.orgNumber}</li>
                                    <li>Total area: {organisation.totalArea}</li>
                                    <li>Antal lägenheter: {organisation.numberOfApartments}</li>
                                    <li><a href={organizationProtokol}></a></li>
                                </ul>
                            </div>
                            <div className={"associations"}>
                                {organisation.associations.map((association, idx) => {
                                    return (
                                        <div key={idx}>
                                            <h5>Förening {idx + 1}</h5>
                                            <ul>
                                                <li>Föreningsnamn: {organisation.associationName}</li>
                                            </ul>
                                            <div className={"contacts"}>
                                                {association.contacts.map((contact, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Contact {idx + 1}</h5>
                                                            <ul>
                                                                <li>Namn: {contact.contactName}</li>
                                                                <li>Telefon: {contact.contactTelephone}</li>
                                                                <li>E-mail: {contact.contactEmail}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className={"adresses"}>
                                                {association.houses.map((house, idx) => {
                                                    return (
                                                        <div key={idx}>
                                                            <h5>Address {idx + 1}</h5>
                                                            <ul>
                                                                <li>Gatuadress: {house.street}</li>
                                                                <li>Ort: {house.city}</li>
                                                                <li>Postnummer: {house.zipCode}</li>
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Form onSubmit={(event) => acceptOrganizationFunction(event, organisation.id)}>
                                <Button type={"submit"}>Bekräfta</Button>
                            </Form>

                            <Form onSubmit={(event) => declineOrganizationRequest(event, organisation.id)}>
                                <Button type={"submit"}>Necka</Button>
                            </Form>
                        </div>

                    )
                }
            )
        )
    }

    function AcceptUpdateList() {
        const acceptList = props.accept.map((accept, idx) => {
            let newOrgNumber;
            let newTotalArea;
            let newNumberOfApartments;
            if (accept.newOrganizationNumber!==accept.oldOrganizationNumber) {

                    newOrgNumber=<div>
                        <p>
                            Gammal organisationsnummer: {accept.oldOrganizationNumber}
                        </p>
                        <p>
                            Ny organisationsnummer: {accept.newOrganizationNumber}
                        </p>
                    </div>
            }
            if (accept.newTotalArea !== accept.oldTotalArea) {

                newTotalArea=<div>
                        <p>
                            Gammal total area: {accept.oldTotalArea}
                        </p>
                        <p>
                            Ny total area: {accept.newTotalArea}
                        </p>
                    </div>
            }
            if (accept.newNumberOfApartments !== accept.oldNumberOfApartments) {
                newNumberOfApartments=<div>
                        <p>
                            Gammal antal lägenheter: {accept.oldNumberOfApartments}
                        </p>
                        <p>
                            Ny antal lägenheter: {accept.newNumberOfApartments}
                        </p>
                    </div>


            }
            return (
                <div key={idx}>
                    Organisation Id: {accept.organizationId}
                    {newOrgNumber}
                    {newTotalArea}
                    {newNumberOfApartments}
                    <Form onSubmit={(event) => acceptOrganizationUpdateFunction(event, accept.organizationId,accept.newOrganizationNumber,accept.newNumberOfApartments,accept.newTotalArea,accept.acceptId)}>
                        <Button type={"submit"}>Acceptera</Button>
                    </Form>
                </div>
            )

        })
        return (<Col>
            {acceptList}
        </Col>)
    }

    return (
        <div>

            <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                <Tab eventKey="activated" title={"Bekräftade (" + activated.length + ")"}>
                    <ShowActivated/>

                </Tab>
                <Tab eventKey="not activated" title={"Inte bekräftade (" + notActivated.length + ")"}>
                    <ShowNotActivated/>

                </Tab>
                <Tab eventKey="declined" title={"Blev neckat (" + declined.length + ")"}>
                    <ShowDeclined/>

                </Tab>
                <Tab eventKey="accept" title={"To accept (" + props.accept.length + ")"}>
                    <Container>
                        <Row>
                            <AcceptUpdateList/>
                        </Row>
                    </Container>

                </Tab>
            </Tabs>

        </div>
    )
}

export default ShowOrganizations;