import React from 'react';
import { connect } from 'react-redux';
import { createTask, clearTaskError } from '../../actions';
import TaskForm from './TaskForm';
import history from '../../history';

class CreateTask extends React.Component {
    onSubmit = formValues => {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.createTask(formValues, token);
    }

    componentDidMount() {
        if (this.props.isSignedIn === null) history.push('/login');
    }

    componentDidUpdate() {
        if (this.props.isSignedIn === null) history.push('/login');
    }

    componentWillUnmount() {
        this.props.clearTaskError();
    }

    renderError(error) {
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>Create a New Task</h3>
                <TaskForm formType="createtask" onSubmit={this.onSubmit} />
                { this.props.error ? this.renderError(this.props.error): null } 
            </div>
        );
    }

}

const mapStateToProps = state => {
    // console.log('sesion', sessionStorage.getItem('tmToken'));
    // console.log('sesion', sessionStorage.getItem('tmUserName'));
    return { 
        isSignedIn: state.auth.isSignedIn,
        error: state.tasks.error ? state.tasks.error : null 
    };
}

export default connect(mapStateToProps, { createTask, clearTaskError })(CreateTask);