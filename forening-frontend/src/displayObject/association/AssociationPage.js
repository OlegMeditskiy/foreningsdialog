import React, {useState} from 'react';
import {Form, Input, InputNumber, notification, Popconfirm, Table} from 'antd';
import {deleteAssociationFromOrganization, saveAssociation} from "../../util/APIUtils";
import AddNew from "./AddNew";
import {EditableCell} from "../Tables/EditableCell";
import AssociaionTable from "../Tables/AssociaionTable";

const AssociationPage =(props)=>{
    const originData = []
    props.organizations.map((org1,idx)=>{
        if (org1.id==props.match.params.organisationId){
            org1.associations.map((association,idx)=>{
                originData.push({
                    key:idx+1,
                    id:association.id,
                    associationName:association.associationName,
                    houses: association.houses,
                    contacts: association.contacts,
                    association:association,
                    organisation: org1
                })
            })
        }

    });
        return(
            <div>
                <AddNew {...props} update={props.update}/>
                <AssociaionTable originData={originData} {...props} />
            </div>
        );


}

export default AssociationPage;