import React from "react";
import {Table} from "antd";

const AssociationPage =(props)=>{
    console.log(props)
    const columns=[
        {
            title: 'Föreningsnamn',
            dataIndex: 'associationName',
            key: 'associationName',
            sorter: {
                compare: (a, b) => a.associationName - b.associationName
            },
        },
        {
            title: 'Houses',
            key: 'action',
            render: (text, record) => (
                <span>
                <a onClick={event => {redirectToHouses(event,record)}}>Houses</a>
      </span>
            ),
        },
    ]
    const dataSource=[]
    props.location.state.associations.map((org,idx)=>{
        dataSource.push({
            key:idx+1,
            id:org.id,
            associationName:org.associationName,
            houses: org.houses
        })

    })
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    function redirectToHouses(event,record){
        console.log(props);
        return props.history.push(`association/${record.id}/houses`,{houses: record.houses})
    }
        return(
            <div>
                <Table
                    dataSource={dataSource} onChange={onChange} columns={columns} />;

            </div>
        );
}

export default AssociationPage;