import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearUserError } from '../../actions';
import UserForm from './UserForm';
import history from '../../history';

class Login extends React.Component {
    onSubmit = formValues => {
        this.props.signIn(formValues);
    }

    componentDidMount() {
        if (this.props.isSignedIn) history.push('/');
    }

    componentDidUpdate() {
        if (this.props.isSignedIn) history.push('/');
    }

    componentWillUnmount() {
        this.props.clearUserError();
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
                <h3>Login</h3>
                <UserForm formType="login" onSubmit={this.onSubmit} />
                { this.props.error ? this.renderError(this.props.error): null } 
            </div>
        );
    }

}

const mapStateToProps = state => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        error: state.auth.error ? state.auth.error : null 
    };
}

export default connect(mapStateToProps, { signIn, clearUserError })(Login);