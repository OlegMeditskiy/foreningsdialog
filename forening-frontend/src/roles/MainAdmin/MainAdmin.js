import React, {Component} from 'react';
import {getAllAcceptOrganization, getAllOrganizations} from "../../util/GetAPI";
import ShowOrganizations from "./ShowOrganizations";
import FilesUpload from "./FilesUpload";

class MainAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizations: [],
            isLoading: false,
            acceptList:[]
        }
        this.loadOrganisationsList = this.loadOrganisationsList.bind(this);
        this.loadAcceptList=this.loadAcceptList.bind(this);
        this.update=this.update.bind(this);
        this.updateAccept=this.updateAccept.bind(this);
    }
    loadOrganisationsList() {
        let promise;
        promise = getAllOrganizations();
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
                })

            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });
    }
    loadAcceptList() {
        let promise;
        promise = getAllAcceptOrganization();
        if (!promise) {
            return;
        }
        this.setState({
            isLoading: true
        });
        promise
            .then(response => {

                const acceptList = this.state.acceptList.slice();
                this.setState({
                    acceptList: acceptList.concat(response),
                    isLoading: false,
                })

            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });
    }
    componentDidMount() {
        this.loadOrganisationsList();
        this.loadAcceptList();
    }
    update(){
        this.setState ({
            organizations: [],
            isLoading: false,
        })
        this.loadOrganisationsList();
    }
    updateAccept(){
        this.setState ({
            isLoading: false,
            organizations: [],
            acceptList:[]
        })
        this.loadAcceptList();
        this.loadOrganisationsList();
    }
    render() {

        return (
            <div>
                <FilesUpload/>
                <ShowOrganizations load={this.update} updateAccept={this.updateAccept} accept={this.state.acceptList} organizations={this.state.organizations} {...this.props}/>
            </div>
        )
    }


}

export default MainAdmin;