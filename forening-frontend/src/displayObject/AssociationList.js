import React, {Component} from 'react';
import {ASSOCIATION_LIST_SIZE} from "../constants";
import {getAllAssociations, getUserCreatedOrganizations} from "../util/APIUtils";
import {Button} from "react-bootstrap";
import {Link, Route, Switch} from 'react-router-dom';
import {Icon} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";

import AssociationPage from "./AssociationPage";
import HousesPage from "./HousePage";
import ContactsPage from "./ContactPage";
import OrganisationPage from "./OrganisationPage";

class AssociationList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false,
            display:'',
            updated:1
        };
        this.loadAssociationList = this.loadAssociationList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        this.update=this.update.bind(this);

    }

    loadAssociationList(page = 0, size = ASSOCIATION_LIST_SIZE) {
        let promise;
        if(this.props.username) {
            if(this.props.type === 'USER_CREATED_POLLS') {
                promise = getUserCreatedOrganizations(this.props.username,page,size);
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
                    organizations: organizations.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    isLoading: false,
                    display:this.props.display,
                    updated:1

                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadAssociationList();
    }
    update(){
        this.setState({
            organizations: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false,
            updated: 0
        });
        this.loadAssociationList();
    }
    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                organizations: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                isLoading: false
            });
            this.loadAssociationList();
        }

    }

    handleLoadMore() {
        this.loadAssociationList(this.state.page + 1);
    }

    render() {
        return (
            <div className="polls-container">
                <Link to={"/organisations"}>Organisationer</Link>
                <Switch>
                    <Route path={`${this.props.match.path}organisations/`}
                               render={(props) => <OrganisationPage currentUser={this.props.currentUser} organizations={this.state.organizations}  {...props} update={this.update}/>}>
                    </Route>
                    <Route path={`${this.props.match.path}organisation/:organisationId/foreningar`}
                           render={(props) => <AssociationPage organizations={this.state.organizations} {...props} what={this.props.match.params.organisationId} currentUser={this.props.currentUser} update={this.update} />}>
                    </Route>
                    <Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/houses`}
                           render={(props) => <HousesPage {...props}  />}>
                    </Route>
                    <Route path={`${this.props.match.path}organisation/:organisationId/association/:associationId/contacts`}
                           render={(props) => <ContactsPage {...props}  />}>
                    </Route>

                </Switch>

                {
                    !this.state.isLoading && this.state.organizations.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No Organizations Found.</span>
                        </div>
                    ): null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-polls">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus" /> Load more
                            </Button>
                        </div>): null
                }
                {
                    this.state.isLoading ?
                        <LoadingIndicator />: null
                }
            </div>
        );
    }
}



export default AssociationList;