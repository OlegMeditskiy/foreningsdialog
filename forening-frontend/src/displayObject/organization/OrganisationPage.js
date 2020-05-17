import React, {useState} from 'react';
import {Modal, Tab, Tabs} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import Button from "react-bootstrap/Button";
import '../../user/signup/Signup.css';
import CreateNewOrganisations from "./CreateNewOrganisations";
import '../list.css';
import OrganizationTable from "./OrganizationTable";
import {saveActivatedOrganization, saveDeclinedOrganization, saveNotActivatedOrganization} from "../../util/SaveAPI";

const OrganizationsPage = (props) => {
    const activated = []
    const notActivated = []
    const declined = []
    props.organizations.forEach((org, idx) => {
        console.log(org);
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
            if(org.declined){
                declined.push({
                    key: idx,
                    id: org.id,
                    orgNumber: org.orgNumber,
                    totalArea: org.totalArea,
                    numberOfApartments: org.numberOfApartments,
                    associations: org.associations
                })
            }
            else{
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


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Ny organisation
            </Button>

            <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                <Tab eventKey="activated" title={"Bekräftade (" + activated.length + ")"}>
                    <OrganizationTable originData={activated} update={props.update} saveMethod={saveActivatedOrganization} {...props}/>
                    {/*<Table*/}
                    {/*    dataSource={activated}  columns={columns}/>*/}
                </Tab>
                <Tab eventKey="not activated" title={"Väntar på bekräfting (" + notActivated.length + ")"}>
                    {/*<Table*/}
                    {/*    dataSource={notActivated}  columns={columns}/>*/}
                    <OrganizationTable originData={notActivated} update={props.update} saveMethod={saveNotActivatedOrganization} {...props}/>
                </Tab>
                <Tab eventKey="declined" title={"Neckade (" + declined.length + ")"}>
                    <OrganizationTable originData={declined} update={props.update} saveMethod={saveDeclinedOrganization} {...props}/>
                    {/*<Table*/}
                    {/*    dataSource={declined}  columns={columns}/>*/}
                </Tab>

            </Tabs>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>Nya organisationer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="signup-container">
                        <div className="signup-content">
                            <CreateNewOrganisations handleClose={handleClose} update={props.update} currentUser={props.currentUser} {...props}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>


    )
}


export default withRouter(OrganizationsPage);