import React from 'react';
import { connect } from 'react-redux';
import { signOut, clearAllTasks } from '../../actions';

class Logout extends React.Component {

    componentDidMount() {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.clearAllTasks();
        this.props.signOut(token);
    }

    render() {
        return null;
    }

}

export default connect(null, { signOut, clearAllTasks })(Logout);