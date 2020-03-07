import React from 'react';
import {Accordion, Card, useAccordionToggle} from "react-bootstrap";
import AssociationsList from "./AssociationsList";
import {Link, Redirect, Route, withRouter} from "react-router-dom";
import OrganisationPage from "./OrganisationPage";
import {Table} from "antd";

const OrganizationsList =(props)=>{
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
        title: 'Föreningar',
        key: 'action',
        render: (text, record) => (
            <span>
                <a onClick={event => {redirectToOrganisation(event,record)}}>Föreningar</a>
      </span>
        ),
    },


]
    const dataSource=[]
    console.log(props)
    props.organizations.map((org,idx)=>{
        dataSource.push({
            key:idx+1,
            id:org.id,
            orgNumber:org.orgNumber,
            totalArea:org.totalArea,
            numberOfApartments:org.numberOfApartments,
            associations:org.associations
        })

    })
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    function redirectToOrganisation(event,record){
    console.log(props);
        return props.history.push(`/a/organisation/${record.id}/foreningar`,{associations: record.associations})
    }
return(
    <div>
        <Table
            dataSource={dataSource} onChange={onChange} columns={columns} />;
    </div>


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


export default withRouter(OrganizationsList);