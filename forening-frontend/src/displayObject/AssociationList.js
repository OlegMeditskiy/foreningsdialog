import React, {Component} from 'react';
import {ASSOCIATION_LIST_SIZE} from "../constants";
import {getAllAssociations, getUserCreatedOrganizations, getUserCreatedOrganizationss} from "../util/APIUtils";
    import {Link, Route, Switch} from 'react-router-dom';
import LoadingIndicator from "../common/LoadingIndicator";

import HousesPage from "./house/HousePage";
import ContactsPage from "./contact/ContactPage";
import OrganisationPage from "./organization/OrganisationPage";
import AssociationPage from "./association/AssociationPage";
import ApartmentsPage from "./apartment/ApartmentPage";
import GuestPage from "./guest/GuestPage";
import LoanObjects from "../loanObjects/LoanObjects";
import OrganizationInfo from "./organization/OrganizationInfo";
import NotFound from "../common/NotFound";
import Organizations from "./organization/Organizations";
import AssociationInfo from "./association/AssociationInfo";
import HouseInfo from "./house/HouseInfo";
import ApartmentInfo from "./apartment/ApartmentInfo";

class AssociationList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            isLoading: false,
            updated:0,
            belong: false,
        };
        this.loadAssociationList = this.loadAssociationList.bind(this);
        this.update=this.update.bind(this);
        this._isMounted = false;
    }

    loadAssociationList(page = 0, size = ASSOCIATION_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedOrganizationss(this.props.username);
            }
        } else {
            promise = getAllAssociations(page, size);
        }

        if(!promise) {
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
                    updated:1,
                })

            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this._isMounted = true;
        console.log("Did mount")
        this.loadAssociationList();
    }

    update(){
        this.setState({
            organizations: [],
            isLoading: false,
            updated: 0
        });
        this.loadAssociationList();
    }


    componentDidUpdate(nextProps) {
        console.log("Did update")
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                organizations: [],
                isLoading: false,
                updated:0,
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
                {/*<Link to={"/loans"}>Lån objekter</Link>*/}
                <Switch>
                    <Route path={`${this.props.match.path}organisations/`}
                               render={(props) => <OrganisationPage currentUser={this.props.currentUser} organizations={this.state.organizations}  {...props} update={this.update}/>}>
                    </Route>
                    {/*<Route path={`${this.props.match.path}organisations/`}*/}
                    {/*       render={(props) => <Organizations {...props} />}>*/}
                    {/*</Route>*/}
                    <Route path={`${this.props.match.path}organisation/:organisationId`}
                           render={(props) => <OrganizationInfo currentUser={this.props.currentUser} update={this.update} username={this.props.username} {...props}/> }>
                    </Route>
                    <Route path={`${this.props.match.path}association/:associationId`}
                           render={(props) => <AssociationInfo currentUser={this.props.currentUser} update={this.update} username={this.props.username} {...props}/> }>
                    </Route>
                    <Route path={`${this.props.match.path}house/:houseId`}
                           render={(props) => <HouseInfo currentUser={this.props.currentUser} update={this.update} username={this.props.username} {...props}/> }>
                    </Route>
                    <Route path={`${this.props.match.path}apartment/:apartmentId`}
                           render={(props) => <ApartmentInfo currentUser={this.props.currentUser} update={this.update} username={this.props.username} {...props}/> }>
                    </Route>
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId/foreningar`}*/}
                    {/*       render={(props) =>*/}
                    {/*           <AssociationPage createdBy={this.state.organizations} organizations={this.state.organizations} {...props}  currentUser={this.props.currentUser} update={this.update} />}>*/}
                    {/*</Route>*/}
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/houses`}*/}
                    {/*       render={(props) => <HousesPage  organizations={this.state.organizations} {...props} update={this.update} />}>*/}
                    {/*</Route>*/}
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/contacts`}*/}
                    {/*       render={(props) => <ContactsPage organizations={this.state.organizations} {...props} update={this.update}  />}>*/}
                    {/*</Route>*/}
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/house/:houseId/apartments`}*/}
                    {/*       render={(props) => <ApartmentsPage organizations={this.state.organizations} {...props} update={this.update}  />}>*/}
                    {/*</Route>*/}
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/house/:houseId/apartment/:apartmentId/guests`}*/}
                    {/*       render={(props) => <GuestPage organizations={this.state.organizations} {...props} update={this.update}  />}>*/}
                    {/*</Route>*/}
                    {/*<Route path={`${this.props.match.path}loans/`} render={(props)=><LoanObjects/>}>*/}

                    {/*</Route>*/}
                    <Route component={NotFound}></Route>

                </Switch>
                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }
            </div>
        );
    }
}



export default AssociationList;