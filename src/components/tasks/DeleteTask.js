import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';
import Modal from '../Modal';
import history from '../../history';
import { getTask, deleteTask } from '../../actions';
import { DELETE_TASK_TITLE, SITE_TITLE } from '../utils/PageTitles';

class DeleteTask extends React.Component {
    componentDidMount() {
        document.title = `${DELETE_TASK_TITLE} | ${SITE_TITLE}`;
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.getTask(this.props.match.params.id, token);
    }
    renderActions() {
        const id = this.props.match.params.id;
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';

        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteTask(id, token)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    render() {
        if (!this.props.isSignedIn) history.push('/');
        if (!this.props.task) {
            return null;
        }

        return (
            <div>
                <TaskList fetchTaskList={false} />
                <Modal 
                    title="Delete Task" 
                    content={`Are you sure you want to delete the task with title: ${this.props.task.title}`} 
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')} 
                />
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

export default connect(mapStateToProps, { deleteTask, getTask })(DeleteTask);