import React, { Component } from 'react';
import {ASSOCIATION_LIST_SIZE} from "../constants";
import {getAllAssociations, getUserCreatedAssociations, getUserCreatedOrganizations} from "../util/APIUtils";
import Association from "./OrganizationList";
import {Accordion, Button} from "react-bootstrap";
import {
    withRouter,
    Switch, Route
} from 'react-router-dom';
import {Icon} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";

import AssociationPage from "./AssociationPage";
import HousesPage from "./HousePage";
import OrganizationList from "./OrganizationList";
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
            display:''
        };
        this.loadAssociationList = this.loadAssociationList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
        console.log("constructor");
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
                    display:this.props.display
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }


    componentDidMount() {
        console.log("did mount");
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
        console.log("did update");
    }

    handleLoadMore() {
        this.loadAssociationList(this.state.page + 1);
    }

    render() {
        console.log(this.state.organizations);
        const listViews = [];
        this.state.organizations.forEach((organization, associationIndex) => {
            listViews.push(<Association
                currentUser={this.props.currentUser}
                key={organization.id}
                organization={organization}
                {...this.props}
                />)
        });
        console.log("render")
        return (
            <div className="polls-container">

                <Switch>
                    <Route path={`${this.props.match.path}/organisations/`}
                               render={(props) => <OrganizationList organizations={this.state.organizations} loadList={this.loadAssociationList} {...props}  />}>
                    </Route>
                    <Route path={`${this.props.match.path}/organisation/:organisationId/foreningar`}
                           render={(props) => <AssociationPage {...props}  />}>
                    </Route>
                    <Route path={`${this.props.match.path}/organisation/:organisationId/association/:associationId/houses`}
                           render={(props) => <HousesPage {...props}  />}>
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