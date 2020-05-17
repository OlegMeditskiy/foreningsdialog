import React, {Component} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";

import HousesPage from "../house/HousePage";
import ContactPage from "../contact/ContactPage";
import AssociationSettings from "./AssociationSettings";
import {getAssociation} from "../../util/GetAPI";
import DocumentUpload from "./DocumentUpload";
import News from "./News";

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
                news:[]
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
            // Reset State
            this.setState({
                association: {},
                isLoading: false,
                updated: 0,
            });
            this.loadAssociation();
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <Row>
                                <Col>Association Name + {this.state.association.associationName}</Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="houses" title={"Hus"}>
                            <HousesPage load={this.loadAssociation}
                                        houses={this.state.association.houses} {...this.props}/>
                        </Tab>
                        <Tab eventKey="contacts" title={"Kontakter"}>
                            <ContactPage load={this.loadAssociation}
                                         contacts={this.state.association.contacts} {...this.props}/>
                        </Tab>
                        {/*<Tab eventKey="Files upload" title={"Files upload"}>*/}
                        {/*    <FileUpload load={this.loadAssociation}*/}
                        {/*                documents={this.state.association.documentTypes} {...this.props} />*/}
                        {/*</Tab>*/}
                        <Tab eventKey="dokumenter" title={"Dokumenter"}>
                            <DocumentUpload load={this.loadAssociation}
                                        documents={this.state.association.documentTypes} {...this.props} />
                        </Tab>
                        <Tab eventKey="settings" title={"Inställningar"}>
                            <AssociationSettings/>
                        </Tab>
                        <Tab eventKey="news" title={"News"}>
                            <News load={this.loadAssociation} news={this.state.association.news} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default AssociationInfo;