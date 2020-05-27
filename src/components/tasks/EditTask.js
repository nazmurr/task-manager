import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateTask, getTask, clearTaskError } from '../../actions';
import TaskForm from './TaskForm';
import history from '../../history';
import Loader from '../utils/Loader';

class EditTask extends React.Component {
    onSubmit = formValues => {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.updateTask(formValues, this.props.match.params.id, token);
    }

    componentDidMount() {
        if (this.props.isSignedIn === null) history.push('/login');
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.getTask(this.props.match.params.id, token);
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
        if (!this.props.task) {
            return <Loader />;
        }

        return (
            <div>
                <h3>Edit Task</h3>
                <TaskForm 
                    initialValues={_.pick(this.props.task, 'title', 'description', 'completed')} 
                    hasTaskImg={this.props.task.hasTaskImg}
                    taskImg={this.props.task.taskImg}  
                    formType="edittask" 
                    onSubmit={this.onSubmit} 
                />
                { this.props.error ? this.renderError(this.props.error): null } 
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        task: state.tasks.allTasks[ownProps.match.params.id], 
        isSignedIn: state.auth.isSignedIn,
        error: state.tasks.error ? state.tasks.error : null 
    };
}

export default connect(mapStateToProps, { updateTask, getTask, clearTaskError })(EditTask);