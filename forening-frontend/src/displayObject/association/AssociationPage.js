import React from 'react';
import AddNew from "./AddNew";
import AssociaionTable from "../Tables/AssociaionTable";

const AssociationPage =(props)=>{
    const originData = []

            props.associations.forEach((association,idx)=>{
                originData.push({
                    key:idx+1,
                    id:association.id,
                    associationName:association.associationName,
                    houses: association.houses,
                    contacts: association.contacts,
                    association:association,
                })
            });

        return(
            <div>
                <AddNew {...props} update={props.update}/>
                <AssociaionTable originData={originData} {...props} />
            </div>
        );


}

export default AssociationPage;