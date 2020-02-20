import React from 'react';

const OrganizationInput = (props)=>{
    return(
        props.organizations.map((val,idx)=>{
            let orgNumberId = `orgNumber-${idx}`
            return(
                <div key={idx}>
                    <label htmlFor={orgNumberId}>{`OrgNumber #${idx+1}`}</label>
                    <input
                        type="text"
                        name={orgNumberId}
                        data-id={idx}
                        id={orgNumberId}
                        // value={props.organizations[idx].orgNumber}
                        className="orgNumber"
                    />
                </div>
            )
        })
    )
}

export default OrganizationInput;