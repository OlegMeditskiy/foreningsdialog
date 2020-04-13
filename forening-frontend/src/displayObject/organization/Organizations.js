import React, {Component} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import OrganizationInfo from "./OrganizationInfo";
class Organizations extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Switch>
                    {/*<Route path={`${this.props.match.path}organisation/:organisationId`}*/}
                    {/*       render={(props) => <OrganizationInfo/> }>*/}
                    {/*</Route>*/}
                </Switch>
            </div>
        )
    }
}
export default Organizations;