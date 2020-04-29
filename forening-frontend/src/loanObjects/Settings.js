import React, {Component} from "react";
import BootstrapSwitchButton from "bootstrap-switch-button-react/lib/bootstrap-switch-button-react";
import Row from "react-bootstrap/Row";
import {Button, Col, Container, Form} from "react-bootstrap";

import {notification} from "antd";
import {saveSettings} from "../util/APIUtils";
import SettingOutlined from "@ant-design/icons/lib/icons/SettingOutlined";
import "./Settings.css";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state={
            externLokal: false,
            guestFlat:false,
            laundry:false,
            parking:false,
            partyPlace:false,
            pool:false,
            isLoading:false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.loadSettings=this.loadSettings.bind(this);
    }

    loadSettings(){
        this.setState({
            isLoading: true
        });
        this.props.loan.forEach((object)=>{
            switch (object.loanType){
                case "ExternLokal":
                    this.setState({externLokal:object.activated})
                    break;
                case "GuestFlat":
                    this.setState({guestFlat:object.activated})
                    break;
                case "Laundry":
                    this.setState({laundry:object.activated})
                    break;
                case "Parking":
                    this.setState({parking:object.activated})
                    break;
                case "PartyPlace":
                    this.setState({partyPlace:object.activated})
                    break;
                case "Pool":
                    this.setState({pool:object.activated})
                    break;
                default:
                    console.log("DEFAULT")
                    break;
            }
        })
        this.setState({
            isLoading: false
        });
    }
    componentDidMount(){
        this.loadSettings();
    }
    componentDidUpdate(nextProps) {
        if(this.props.loan !== nextProps.loan){
            this.setState({
                externLokal: false,
                guestFlat:false,
                laundry:false,
                parking:false,
                partyPlace:false,
                pool:false
            });
            this.loadSettings();
        }

    }

    handleSubmit(event) {
        event.preventDefault();
        const saveSettingsRequest = {
            externLokal: this.state.externLokal,
            guestFlat: this.state.guestFlat,
            laundry: this.state.laundry,
            parking: this.state.parking,
            partyPlace: this.state.partyPlace,
            pool: this.state.pool,
            organisationId: this.props.match.params.organisationId
        };
        console.log(saveSettingsRequest);
        saveSettings(saveSettingsRequest)
            .then(() => {
                notification.success({
                    message: 'Föreningsdialog App',
                    description: "Your settings was saved.",
                });
            }).catch(() => {
            notification.error({
                message: 'Föreningsdialog App',
                description: 'Sorry! Something went wrong. Please try again!'
            });
        });
    }
    render() {

        return(
            <div className={"settingsList"}>
                <Container>
                    <Row>
                        <Col md={8}>Extern lokal</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked={this.state.externLokal}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ externLokal: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8}>Gästlägenhet</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked={this.state.guestFlat}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ guestFlat: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>

                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8}>Tvättstuga</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked={this.state.laundry}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ laundry: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>

                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8}>Parkering</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked={this.state.parking}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ parking: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>

                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8}>Festlokal</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked={this.state.partyPlace}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ partyPlace: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>

                    </Row>
                    <hr/>
                    <Row>
                        <Col md={8}>Pool</Col>
                        <Col md={2}><BootstrapSwitchButton
                            checked6={this.state.pool}
                            onlabel='On'
                            onstyle='success'
                            offlabel='Off'
                            offstyle='danger'

                            onChange={(checked: boolean) => {
                                this.setState({ pool: checked })
                            }}
                        /></Col>
                        <Col md={2}>
                            <Button>
                                <SettingOutlined/>
                            </Button>
                        </Col>

                    </Row>
                </Container>


               <Form onSubmit={this.handleSubmit}>
                   <Button className={"pull-right saveSettingButton"} variant="primary" type="submit">
                       Spara inställningar
                   </Button>
               </Form>
            </div>
        )
    }
}

export default  Settings;