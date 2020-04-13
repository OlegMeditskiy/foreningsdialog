import React, {Component} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {Table} from "antd";
import AssociationPage from "../association/AssociationPage";
import {Route} from "react-router-dom";
import {ASSOCIATION_LIST_SIZE} from "../../constants";
import {getAllAssociations, getAssociation, getOrganization, getUserCreatedOrganizationss} from "../../util/APIUtils";
import AssociaionTable from "../Tables/AssociaionTable";
import HousesPage from "../house/HousePage";
import ContactPage from "../contact/ContactPage";
class AssociationInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            association: {
                id: '',
                houses: [],
                contacts: [],
                associationName: "",
                createdBy: "",
            },
            isLoading: false,
            updated:0,
        };
        this.loadAssociation = this.loadAssociation.bind(this);
    }
    loadAssociation() {
        let promise = getAssociation(this.props.username,this.props.match.params.associationId);
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
                    association: response,
                    isLoading: false,
                    updated:1,
                })

            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }
    componentDidMount() {
        console.log("Did mount")
        this.loadAssociation();
    }
    componentDidUpdate(nextProps) {
        console.log("Did update")
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                association: {},
                isLoading: false,
                updated:0,
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
                                <HousesPage  load={this.loadAssociation} houses={this.state.association.houses} {...this.props}/>
                        </Tab>
                        <Tab eventKey="contacts" title={"Contacts"}>
                            <ContactPage  load={this.loadAssociation} contacts={this.state.association.contacts} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}
export default AssociationInfo;