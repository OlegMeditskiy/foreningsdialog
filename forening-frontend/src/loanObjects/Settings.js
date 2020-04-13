import React, {Component} from "react";
import SettingsTable from "./LoanSettingsTable";

class Settings extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <SettingsTable loan={this.props.loan} {...this.props} />
            </div>
        )
    }
}
export default  Settings;