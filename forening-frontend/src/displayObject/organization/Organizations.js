import React, {Component} from 'react';
import {Switch} from 'react-router-dom';

class Organizations extends Component {

    render() {
        return (
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