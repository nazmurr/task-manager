import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { getTask } from '../../actions';
import history from '../../history';
import Loader from '../utils/Loader';
import { SITE_TITLE } from '../utils/PageTitles';

class ShowTask extends React.Component {

    componentDidMount() {
        if (this.props.isSignedIn === null) history.push('/login');
        if (this.props.task) document.title = `${this.props.task.title} | ${SITE_TITLE}`;
        else document.title = `${SITE_TITLE}`;
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.getTask(this.props.match.params.id, token);
    }

    componentDidUpdate() {
        if (this.props.isSignedIn === null) history.push('/login');
        if (this.props.task) document.title = `${this.props.task.title} | ${SITE_TITLE}`;
        else document.title = `${SITE_TITLE}`;
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

        const {title, description, createdAt, completed, taskImg, hasTaskImg} = this.props.task;

        return (
            <div>
                <h1>{title}</h1>
                <div className="meta" style={{fontSize: '.9em', marginBottom: '20px', color: "rgba(0,0,0,.6)"}}>
                    <span>Created At: {moment(createdAt).format("MMMM DD, YYYY hh:mm A")}</span>
                </div>
                <div>{ ReactHtmlParser(description.replace(/(?:\r\n|\r|\n)/g, '<br>')) }</div>
                <h5>
                    Task Status: <span className={`ui label ${completed ? 'green': 'red'}`}>
                        {completed ? 'Completed': 'Pending'}</span>
                </h5>
                {hasTaskImg ? 
                    <div className="image">
                        <img src={`data:image/jpeg;base64,${taskImg}`} alt="task img" />
                    </div> 
                    : 
                    null
                }
                
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        task: state.tasks.allTasks[ownProps.match.params.id], 
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, { getTask })(ShowTask);