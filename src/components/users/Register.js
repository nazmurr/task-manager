import React from 'react';
import { connect } from 'react-redux';
import { signUp, clearUserError } from '../../actions';
import UserForm from './UserForm';
import history from '../../history';
import { SIGN_UP_TITLE, SITE_TITLE } from '../utils/PageTitles';

class Register extends React.Component {
    
    state = {
        submitDisabled: false
    };

    onSubmit = formValues => {
        this.setState(prevState => ({
            submitDisabled: !prevState.submitDisabled,
        }));
        this.props.clearUserError();
        this.props.signUp(formValues);
    }

    componentDidMount() {
        if (this.props.isSignedIn) history.push('/');
        document.title = `${SIGN_UP_TITLE} | ${SITE_TITLE}`;
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
                <h3>Register</h3>
                <UserForm formType="register" onSubmit={this.onSubmit} submitDisabled={this.state.submitDisabled} />
                { this.props.error ? this.renderError(this.props.error): null } 
            </div>
        );
    }

}

const mapStateToProps = state => {
    //console.log(state);
    return { 
        isSignedIn: state.auth.isSignedIn,
        error: state.auth.error ? state.auth.error : null 
    };
}

export default connect(mapStateToProps, { signUp, clearUserError })(Register);