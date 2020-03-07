import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import {Accordion} from "react-bootstrap";
import AssociationsList from "./AssociationsList";
const OrganisationPage =(props)=>{
    console.log(props)
    return(
            <div>
                gggg
                {/*<p>Organ {this.props.match.params.organisationId}</p>*/}
                {/*<p>*/}
                {/*    {this.props.location.state.organisation.orgNumber}*/}
                {/*</p>*/}
                {/*<p>{this.props.location.state.organisation.totalArea}</p>*/}
                {/*<p>{this.props.location.state.organisation.numberOfApartments}</p>*/}

                {/*<Accordion>*/}
                {/*    <AssociationsList associations={this.props.location.state.organisation.associations}/>*/}
                {/*</Accordion>*/}

            </div>
    );
}

export default withRouter(OrganisationPage);