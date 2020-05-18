import React from 'react';
import AddNew from "./AddNew";
import AssociationTable from "../Tables/AssociationTable";

const AssociationsList = (props) => {
    const originData = []

    props.associations.forEach((association, idx) => {
        originData.push({
            key: idx + 1,
            id: association.id,
            associationName: association.associationName,
            houses: association.houses,
            contacts: association.contacts,
            association: association,
        })
    });

    return (
        <div>
            <div className={"site-block"}>
                <AddNew {...props} update={props.update}/>
            </div>
            <div className={"site-block"}>
                <AssociationTable originData={originData} {...props} />
            </div>


        </div>
    );


}

export default AssociationsList;