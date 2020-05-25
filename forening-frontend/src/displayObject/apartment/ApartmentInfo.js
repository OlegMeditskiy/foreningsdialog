import React, {Component} from 'react';
import {Breadcrumb, Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import GuestsList from "../guest/GuestsList";
import {getApartment} from "../../util/GetAPI";

class ApartmentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: {
                id: '',
                guests: [],
                number: '',
                area: '',
                roomAndKitchen: '',
                associationId:'',
                houseId:'',
                organizationId:''
            },
            isLoading: false,
            updated: 0,
        };
        this.loadApartment = this.loadApartment.bind(this);
    }

    loadApartment() {
        let promise = getApartment(this.props.username, this.props.match.params.apartmentId);
        if (!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {
                this.setState({
                    apartment: response,
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

        this.loadApartment();
    }

    componentDidUpdate(nextProps) {

        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            this.setState({
                house: {},
                isLoading: false,
                updated: 0,
            });
            this.loadApartment();
        }
    }

    render() {
        const organizationLink="http://localhost:3000/organisation/"+this.state.apartment.organizationId;
        const associationLink="http://localhost:3000/association/"+this.state.apartment.associationId;
        const houseLink="http://localhost:3000/house/"+this.state.apartment.houseId;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item href={organizationLink}>Organisation</Breadcrumb.Item>
                    <Breadcrumb.Item href={associationLink}>Förening</Breadcrumb.Item>
                    <Breadcrumb.Item href={houseLink}>Hus</Breadcrumb.Item>
                    <Breadcrumb.Item active>Lägenhet</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <h3>Information</h3>
                            <Row>
                                <Col md={12}>
                                    <b>Lägenhetsnummer:</b> {this.state.apartment.number}
                                </Col>
                                <Col md={12}>
                                    <b>Area:</b> {this.state.apartment.area}
                                </Col>
                                <Col md={12}>
                                    <b>Rum och kök:</b> {this.state.apartment.roomAndKitchen}
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="Guests" title={"Gäst"}>
                            <GuestsList load={this.loadApartment} guests={this.state.apartment.guests} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default ApartmentInfo;