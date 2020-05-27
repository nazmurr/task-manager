import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = props => {
    return (
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <Link to="/" className="header item">
                    Task Manager
                </Link>
                { 
                    props.isSignedIn ? 
                    <>
                        <Link to="/all-tasks" className="item">All Tasks</Link>
                        <Link to="/edit-profile" className="item right aligned">Welcome, { props.user !== null ? props.user.name: ''}!</Link>
                        <Link to="/logout" className="item">Logout</Link>
                    </> 
                    : 
                    <>
                        <Link to="/login" className="item right aligned">Login</Link>
                        <Link to="/register" className="item">Register</Link>
                    </> 
                }
                

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user ? state.auth.user : null
    };
}

export default connect(mapStateToProps)(Header);