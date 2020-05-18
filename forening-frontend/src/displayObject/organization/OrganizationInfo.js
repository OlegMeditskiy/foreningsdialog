import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import AssociationsList from "../association/AssociationsList";
import Settings from "../../loanObjects/Settings";
import {getOrganization} from "../../util/GetAPI";
import ProtokolUpload from "../association/ProtokolUpload";
import "./Tab.css";
class OrganizationInfo extends Component {
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
            updated: 0,
        };
        this.loadOrganisation = this.loadOrganisation.bind(this);
    }

    loadOrganisation() {
        let promise = getOrganization(this.props.username, this.props.match.params.organisationId);
        if (!promise) {

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
                    updated: 1,
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
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                organization: {},
                isLoading: false,
                updated: 0,
            });
            this.loadOrganisation();
        }
    }

    render() {

        return (
            <div>
                <Container>
                <div className={"site-block"}>
                    <Breadcrumb>
                    <Breadcrumb.Item active>Organisation</Breadcrumb.Item>
                </Breadcrumb>
                </div>
                <div>
                </div>

                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <br/>
                            <h3>Information</h3>
                            <Row className={"site-block"}>
                                <Col md={12}>
                                    <b>Organisation:</b> {this.state.organization.orgNumber}
                                </Col>
                                <Col md={12}>
                                    <b>Total area:</b> {this.state.organization.totalArea}
                                </Col>
                                <Col md={12}>
                                    <b>Antal lägenheter:</b> {this.state.organization.numberOfApartments}
                                </Col>
                            </Row>
                            <Row className={"site-block"}>
                                <Col>
                                    <ProtokolUpload {...this.props}/></Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="associations" title={"Föreningar"}>
                            <AssociationsList load={this.loadOrganisation}
                                              associations={this.state.organization.associations} {...this.props}/>
                        </Tab>
                        <Tab eventKey="settings" title={"Inställningar"}>
                            <Settings loan={this.state.organization.loanObjects} {...this.props} />
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default OrganizationInfo;