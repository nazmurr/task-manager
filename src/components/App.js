import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import Home from './users/Home';
import Register from './users/Register';
import Login from './users/Login';
import EditProfile from './users/EditProfile';
import Logout from './users/Logout';
import TaskList from './tasks/TaskList';
import CreateTask from './tasks/CreateTask';
import EditTask from './tasks/EditTask';
import DeleteTask from './tasks/DeleteTask';
import ShowTask from './tasks/ShowTask';
import { getUserProfile } from '../actions';
import history from '../history';
import ScrollToTop from './ScrollToTop';

class App extends React.Component {

    componentDidMount() {
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.getUserProfile(token);
    }

    render() {
        if (!this.props.authCheck) return null;
        return (
            <Router history={history}>
                <ScrollToTop />
                <Header />
                <div className='ui main text container' style={{marginTop: '7em'}}>
                    <Switch>
                        <Route path="/" exact component={ this.props.isSignedIn ? TaskList: Home} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/login" exact component={Login} />
                        <Route path="/edit-profile" exact component={EditProfile} />
                        <Route path="/logout" exact component={Logout} />
                        <Route path="/all-tasks" exact component={TaskList} />
                        <Route path="/tasks/new" exact component={CreateTask} />
                        <Route path="/tasks/edit/:id" exact component={EditTask} />
                        <Route path="/tasks/delete/:id" exact component={DeleteTask} />
                        <Route path="/tasks/:id" exact component={ShowTask} />
                    </Switch>
                </div>
                <Footer />        
            </Router>
        );
    }

}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        authCheck: state.auth.authCheck
    };
}

export default connect(mapStateToProps, { getUserProfile })(App);