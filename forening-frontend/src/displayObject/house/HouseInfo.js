import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import ApartmentsList from "../apartment/ApartmentsList";
import {getHouse} from "../../util/GetAPI";

class HouseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            house: {
                id: '',
                guests: [],
                street: '',
                city: '',
                zipCode: '',
                apartments: [],
                associationId:'',
                organizationId:''
            },
            isLoading: false,
            updated: 0,
        };
        this.loadHouse
            = this.loadHouse
            .bind(this);
    }

    loadHouse() {
        let promise = getHouse(this.props.username, this.props.match.params.houseId);
        if (!promise) {

            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {
                this.setState({
                    house: response,
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
        this.loadHouse();
    }

    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                house: {},
                isLoading: false,
                updated: 0,
            });
            this.loadHouse();
        }
    }

    render() {
        const organizationLink="http://localhost:3000/organisation/"+this.state.house.organizationId;
        const associationLink="http://localhost:3000/association/"+this.state.house.associationId;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href={organizationLink}>Organisation</Breadcrumb.Item>
                    <Breadcrumb.Item href={associationLink}>Förening</Breadcrumb.Item>
                    <Breadcrumb.Item active>Hus</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                                <h3>Information</h3>
                                <Row>
                                    <Col md={12}>
                                        <b>Gatuadress:</b> {this.state.house.street}
                                    </Col>
                                    <Col md={12}>
                                        <b>Ort:</b> {this.state.house.city}
                                    </Col>
                                    <Col md={12}>
                                        <b>Postnummer:</b> {this.state.house.zipCode}
                                    </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="apartments" title={"Lägenheter"}>
                            <ApartmentsList load={this.loadHouse}
                                            apartments={this.state.house.apartments} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default HouseInfo;