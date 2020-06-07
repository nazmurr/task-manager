import React from 'react';
import { connect } from 'react-redux';
import { signOut, clearAllTasks } from '../../actions';
import Loader from '../utils/Loader';

class Logout extends React.Component {

    componentDidMount() {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.clearAllTasks();
        this.props.signOut(token);
    }

    render() {
        return <Loader />;
    }

}

export default connect(null, { signOut, clearAllTasks })(Logout);