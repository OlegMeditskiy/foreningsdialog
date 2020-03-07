import React,{Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import AssociationsList from "./AssociationsList";
import {Table} from "antd";
const HousesPage =(props)=>{
    console.log(props)
    const columns=[
        {
            title: 'Gatudaddress',
            dataIndex: 'street',
            key: 'street',
            sorter: {
                compare: (a, b) => a.street - b.street
            },
        },
        {
            title: 'Ort',
            dataIndex: 'city',
            key: 'city',
            sorter: {
                compare: (a, b) => a.city - b.city
            },
        },
        {
            title: 'Postnummer',
            dataIndex: 'zipCode',
            key: 'zipCode',
            sorter: {
                compare: (a, b) => a.zipCode - b.zipCode
            },
        },
    ]
    const dataSource=[]
    props.location.state.houses.map((org,idx)=>{
        dataSource.push({
            key:idx+1,
            id:org.id,
            street:org.street,
            city:org.city,
            zipCode:org.zipCode
        })

    })
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return(
        <div>
            <Table
                dataSource={dataSource} onChange={onChange} columns={columns} />;

        </div>
    );
}

export default HousesPage;