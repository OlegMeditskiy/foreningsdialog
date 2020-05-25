import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row, Tab, Tabs} from "react-bootstrap";

import HousesList from "../house/HousesList";
import ContactsList from "../contact/ContactsList";
import AssociationSettings from "./AssociationSettings";
import {getAssociation} from "../../util/GetAPI";
import DocumentUpload from "./DocumentUpload";
import News from "./News";
import LogoUpload from "./LogoUpload";

class AssociationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            association: {
                id: '',
                houses: [],
                contacts: [],
                associationName: "",
                createdBy: "",
                documentTypes: [],
                news:[],
                logo:'',
                organizationId:''
            },
            isLoading: false,
            updated: 0,
        };
        this.loadAssociation = this.loadAssociation.bind(this);
    }

    loadAssociation() {
        let promise = getAssociation(this.props.username, this.props.match.params.associationId);
        if (!promise) {

            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {
                this.setState({
                    association: response,
                    isLoading: false,
                    updated: 1
                })

            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });
    }

    componentDidMount() {

        this.loadAssociation();
    }

    componentDidUpdate(nextProps) {

        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {

            this.setState({
                association: {},
                isLoading: false,
                updated: 0,
            });
            this.loadAssociation();
        }
    }

    render() {
        const organizationLink="http://localhost:3000/organisation/"+this.state.association.organizationId;

        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href={organizationLink}>Organisation</Breadcrumb.Item>
                    <Breadcrumb.Item active>Förening</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Tabs defaultActiveKey='information' id="uncontrolled-tab-example">
                        <Tab eventKey="information" title={"Information"}>
                            <br/>
                                <h3>Information</h3>
                                <Row className={"site-block"}>
                                    <Col md={12}>
                                        <b>Föreningsnamn:</b> {this.state.association.associationName}
                                    </Col>
                                </Row>
                        </Tab>
                        <Tab eventKey="houses" title={"Hus"}>
                            <HousesList load={this.loadAssociation}
                                        houses={this.state.association.houses} {...this.props}/>
                        </Tab>
                        <Tab eventKey="contacts" title={"Kontakter"}>
                            <ContactsList load={this.loadAssociation}
                                          contacts={this.state.association.contacts} {...this.props}/>
                        </Tab>
                        <Tab eventKey="Logo upload" title={"Logo"}>
                            <LogoUpload load={this.loadAssociation} logo={this.state.association.logo} {...this.props} />
                        </Tab>
                        <Tab eventKey="dokumenter" title={"Dokumenter"}>
                            <DocumentUpload load={this.loadAssociation}
                                        documents={this.state.association.documentTypes} {...this.props} />
                        </Tab>
                        <Tab eventKey="news" title={"Nyheter"}>
                            <News load={this.loadAssociation} news={this.state.association.news} {...this.props}/>
                        </Tab>

                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default AssociationInfo;