import React, {Component} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import GuestPage from "../guest/GuestPage";
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
                roomAndKitchen: ''
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
            // Reset State
            this.setState({
                house: {},
                isLoading: false,
                updated: 0,
            });
            this.loadApartment();
        }
    }

    render() {
        return (
            <div>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <Row>
                                <Col>Number + {this.state.apartment.number}</Col>
                                <Col>Area + {this.state.apartment.area}</Col>
                                <Col>RoomAndKitchen + {this.state.apartment.roomAndKitchen}</Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="Guests" title={"Gäst"}>
                            <GuestPage load={this.loadApartment} guests={this.state.apartment.guests} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}

export default ApartmentInfo;