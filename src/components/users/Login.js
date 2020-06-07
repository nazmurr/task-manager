import React from 'react';
import { connect } from 'react-redux';
import { signIn, clearUserError } from '../../actions';
import UserForm from './UserForm';
import history from '../../history';
import { SIGN_IN_TITLE, SITE_TITLE } from '../utils/PageTitles';

class Login extends React.Component {

    state = {
        submitDisabled: false
    };

    onSubmit = formValues => {
        this.setState(prevState => ({
            submitDisabled: !prevState.submitDisabled,
        }));
        this.props.clearUserError();
        this.props.signIn(formValues);
    }

    onTextChange = value => {
        console.log(value);
    }

    componentDidMount() {
        if (this.props.isSignedIn) history.push('/');
        document.title = `${SIGN_IN_TITLE} | ${SITE_TITLE}`;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isSignedIn) history.push('/');

        if (this.props.error && prevState.submitDisabled) {
            this.setState({submitDisabled: !prevState.submitDisabled});
        }
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
                <UserForm formType="login" onSubmit={this.onSubmit} onTextChange={this.onTextChange} submitDisabled={this.state.submitDisabled} />
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