import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllTasks, clearAllTasks } from '../../actions';
import Loader from '../utils/Loader';

class TaskList extends React.Component {
    componentDidMount() {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        if (this.props.fetchTaskList !== false) this.props.getAllTasks(token);
    }

    componentDidUpdate() {

    }
    
    renderAdmin(task) {
        return (
            <div className="right floated content">
                <Link to={`/tasks/edit/${task._id}`} className="ui button teal">
                    Edit
                </Link>
                <Link to={`/tasks/delete/${task._id}`} className="ui button negative">
                    Delete
                </Link>
            </div>
        )
    }

    renderCreate() {
        if (this.props.tasks.length) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/tasks/new" className="ui button primary">Create Task</Link>
                </div>
            )
        } else {
            return (
                <div>
                    <Link to="/tasks/new" className="ui button fluid primary">Create your first Task!</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.tasks.map(task => {
            return (
                <div className="item" key={task._id}>
                    {task.hasTaskImg ? 
                        <div className="image">
                            <img src={`data:image/jpeg;base64,${task.taskImg}`} alt="task img" />
                        </div> 
                        : 
                        null
                    }
                    
                    <div className="content">
                        <Link className="header" to={`/tasks/${task._id}`}>{task.title}</Link>
                        <div className="meta" style={{fontSize: '.9em', marginBottom: '20px'}}>
                            <span>Created At: {moment(task.createdAt).format("MMMM DD, YYYY hh:mm A")}</span>
                        </div>
                        <div className="description">
                            {task.description.substr(0, 300)}
                            {task.description.length > 300 ? '...': ''}
                        </div>
                        <div className="extra" style={{marginTop: '20px'}}>
                            {this.renderAdmin(task)}
                            <div className={`ui label ${task.completed ? 'green': 'red'}`}>
                                {task.completed ? 'Completed': 'Pending'}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (!this.props.tasksFetched) return <Loader />;
        return (
            <div>
                {this.renderCreate()}
                {this.props.tasks.length ? <h2>All Tasks</h2>: ''}
                <div className="ui divided items">{this.renderList()}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { 
        tasks: state.tasks.allTasks ? Object.values(state.tasks.allTasks): Object.values({}),
        tasksFetched: state.tasks.tasksFetched,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { getAllTasks, clearAllTasks })(TaskList);