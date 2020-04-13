import React, {useState} from 'react';
import {Modal, Nav, Tab, Tabs} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {Table} from "antd";
import Button from "react-bootstrap/Button";
import '../../user/signup/Signup.css';
import CreateNewOrganisations from "./CreateNewOrganisations";
import '../list.css';
import {Switch} from 'react-router-dom';
const OrganizationsPage=(props)=>{
    const columns=[
        {
            title: 'Organisationsnummer',
            dataIndex: 'orgNumber',
            key: 'orgNumber',
            sorter: {
                compare: (a, b) => a.orgNumber - b.orgNumber
            },
        },
        {
            title: 'Area',
            dataIndex: 'totalArea',
            key: 'totalArea',
            sorter: {
                compare: (a, b) => a.totalArea - b.totalArea
            },

        },
        {
            title: 'Antal lägenheter',
            dataIndex: 'numberOfApartments',
            key: 'numberOfApartments',
            sorter: {
                compare: (a, b) => a.numberOfApartments - b.numberOfApartments
            },
        },
        {
            title: 'Organization',
            key: 'action',
            render: (text, record) => (
                <span>
                <a onClick={event => {redirectToOrganisation(event,record)}}>Visa
                </a>
      </span>
            ),
        },
    ]
    const activated=[]
    const notActivated=[]
    props.organizations.map((org,idx)=>{
        if (org.activated){
            activated.push({
                key:idx,
                id:org.id,
                orgNumber:org.orgNumber,
                totalArea:org.totalArea,
                numberOfApartments:org.numberOfApartments,
                associations:org.associations
            })
        }
        else{
            notActivated.push({
                key:idx,
                id:org.id,
                orgNumber:org.orgNumber,
                totalArea:org.totalArea,
                numberOfApartments:org.numberOfApartments,
                associations:org.associations
            })
        }


    })
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    function redirectToOrganisation(event,record){
        return props.history.push({pathname:`/organisation/${record.id}`})
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div>
            <Button  variant="primary" onClick={handleShow}>
                Ny organisation
            </Button>

            <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                <Tab eventKey="activated" title={"Bekräftade ("+activated.length+")"}>
                    <Table
                        dataSource={activated} onChange={onChange} columns={columns} />
                </Tab>
                <Tab eventKey="not activated" title={"Inte bekräftade ("+notActivated.length+")"}>
                    <Table
                        dataSource={notActivated} onChange={onChange} columns={columns} />
                </Tab>
            </Tabs>

            <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>Nya organisationer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="signup-container">
                        <div className="signup-content">
                    <CreateNewOrganisations update={props.update} currentUser={props.currentUser} {...props}/>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>


    )
}


export default withRouter(OrganizationsPage);