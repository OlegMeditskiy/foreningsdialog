import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import LoadingIndicator from "../common/LoadingIndicator";
import OrganisationPage from "./organization/OrganisationPage";
import OrganizationInfo from "./organization/OrganizationInfo";
import AssociationInfo from "./association/AssociationInfo";
import HouseInfo from "./house/HouseInfo";
import ApartmentInfo from "./apartment/ApartmentInfo";
import {getUserCreatedOrganizationss} from "../util/GetAPI";

class AssociationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            isLoading: false,
            updated: 0,
            belong: false,
        };
        this.loadAssociationList = this.loadAssociationList.bind(this);
        this.update = this.update.bind(this);
        this._isMounted = false;
    }

    loadAssociationList() {
        let promise;
                promise = getUserCreatedOrganizationss(this.props.username);
        if (!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {

                const organizations = this.state.organizations.slice();
                this.setState({
                    organizations: organizations.concat(response),
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
        this._isMounted = true;
        this.loadAssociationList();
    }

    update() {
        this.setState({
            organizations: [],
            isLoading: false,
            updated: 0
        });
        this.loadAssociationList();
    }


    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                organizations: [],
                isLoading: false,
                updated: 0,
                belong: false,
            });
            this.loadAssociationList();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="polls-container">
                <Link to={"/organisations"}>Organisationer</Link>
                <Switch>
                    <Route path={`${this.props.match.path}organisations/`}
                           render={(props) => <OrganisationPage currentUser={this.props.currentUser}
                                                                organizations={this.state.organizations}  {...props}
                                                                update={this.update}/>}>
                    </Route>

                    <Route path={`${this.props.match.path}organisation/:organisationId`}
                           render={(props) => <OrganizationInfo currentUser={this.props.currentUser}
                                                                update={this.update}
                                                                username={this.props.username} {...props}/>}>
                    </Route>
                    <Route path={`${this.props.match.path}association/:associationId`}
                           render={(props) => <AssociationInfo currentUser={this.props.currentUser} update={this.update}
                                                               username={this.props.username} {...props}/>}>
                    </Route>
                    <Route path={`${this.props.match.path}house/:houseId`}
                           render={(props) => <HouseInfo currentUser={this.props.currentUser} update={this.update}
                                                         username={this.props.username} {...props}/>}>
                    </Route>
                    <Route path={`${this.props.match.path}apartment/:apartmentId`}
                           render={(props) => <ApartmentInfo currentUser={this.props.currentUser} update={this.update}
                                                             username={this.props.username} {...props}/>}>
                    </Route>
                </Switch>
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
            </div>
        );
    }
}


export default AssociationList;