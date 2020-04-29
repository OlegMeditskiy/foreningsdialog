import React, {Component} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import AssociationPage from "../association/AssociationPage";
import {getOrganization} from "../../util/APIUtils";
import Settings from "../../loanObjects/Settings";

class OrganizationInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            organization: {
                id: '',
                orgNumber: "",
                numberOfApartments: "",
                totalArea: "",
                createdBy: "",
                associations: [],
                loanObjects: [],
                activated: null,

            },
            isLoading: false,
            updated:0,
        };
        this.loadOrganisation = this.loadOrganisation.bind(this);
    }
    loadOrganisation() {
        let promise = getOrganization(this.props.username,this.props.match.params.organisationId);
        if(!promise) {
            console.log("no promise");
            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {
                this.setState({
                    organization: response,
                    isLoading: false,
                    updated:1,
                })

            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });
    }
    componentDidMount() {
        this.loadOrganisation();
    }
    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                organization: {},
                isLoading: false,
                updated:0,
            });
            this.loadOrganisation();
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <Row>
                                <Col>Organisation + {this.state.organization.orgNumber}</Col>
                                <Col>Area + {this.state.organization.totalArea}</Col>
                                <Col>Lägenhet + {this.state.organization.numberOfApartments}</Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="associations" title={"Föreningar"}>
                                <AssociationPage  load={this.loadOrganisation} associations={this.state.organization.associations} {...this.props}/>
                        </Tab>
                        <Tab eventKey="settings" title={"Settings"}>
                            <Settings loan={this.state.organization.loanObjects} {...this.props} />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}
export default OrganizationInfo;