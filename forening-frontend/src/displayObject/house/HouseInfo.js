import React, {Component} from 'react';
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";
import {getHouse} from "../../util/APIUtils";
import ApartmentsPage from "../apartment/ApartmentPage";
import GuestPage from "../guest/GuestPage";

class HouseInfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            house: {
                id: '',
                guests: [],
                street:'',
                city:'',
                zipCode:'',
                apartments:[]
            },
            isLoading: false,
            updated:0,
        };
        this.loadHouse
            = this.loadHouse
            .bind(this);
    }
    loadHouse() {
        let promise = getHouse(this.props.username,this.props.match.params.houseId);
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
                    house: response,
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
        console.log("Did mount")
        this.loadHouse
        ();
    }
    componentDidUpdate(nextProps) {
        console.log("Did update")
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                house: {},
                isLoading: false,
                updated:0,
            });
            this.loadHouse
            ();
        }
    }
    render() {
        return (
            <div>
                <Container>
                    <Tabs defaultActiveKey='activated' id="uncontrolled-tab-example">
                        <Tab eventKey="activated" title={"Information"}>
                            <Row>
                                <Col>Gatuadress + {this.state.house.street}</Col>
                                <Col>Ort + {this.state.house.city}</Col>
                                <Col>Postnummer + {this.state.house.zipCode}</Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="apartments" title={"Apartments"}>
                            <ApartmentsPage  load={this.loadHouse} apartments={this.state.house.apartments} {...this.props}/>
                        </Tab>
                        <Tab eventKey="Guests" title={"Guests"}>
                            <GuestPage  load={this.loadHouse} guests={this.state.house.guests} {...this.props}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }


}
export default HouseInfo;