import React, { Component } from 'react';
import {ASSOCIATION_LIST_SIZE} from "../constants";
import {getAllAssociations} from "../util/APIUtils";
import Association from "../user/signup/Association";
import {Button} from "react-bootstrap";
import {Icon} from "antd";
import LoadingIndicator from "../common/LoadingIndicator";
class AssociationList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            associations: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            isLoading: false
        };
        this.loadAssociationList = this.loadAssociationList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadAssociationList(page = 0, size = ASSOCIATION_LIST_SIZE) {
        let promise;
        if(this.props.username) {

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
                const associations = this.state.associations.slice();

                this.setState({
                    associations: associations.concat(response.content),
                    page: response.page,
                    size: response.size,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    last: response.last,
                    isLoading: false
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
    componentDidUpdate(nextProps) {
        if(this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                associations: [],
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
        const pollViews = [];
        this.state.associations.forEach((association, associationIndex) => {
            pollViews.push(<Association
                key={association.id}
                association={association}/>)
        });

        return (
            <div className="polls-container">
                {pollViews}
                {
                    !this.state.isLoading && this.state.associations.length === 0 ? (
                        <div className="no-polls-found">
                            <span>No Associations Found.</span>
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