import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { API_BASE_URL } from '../../apis/constant';
import { getUserProfile, updateUserProfile, clearUserError } from '../../actions';
import UserForm from './UserForm';
import history from '../../history';
import { EDIT_PROFILE_TITLE, SITE_TITLE } from '../utils/PageTitles';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
     
        this.state = {
          showSuccess: false,
          fileInputKey: Date.now()
        };
    }

    onSubmit = formValues => {
        this.setState({showSuccess: false});
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.updateUserProfile(formValues, token);
    }

    componentDidMount() {
        if (!this.props.isSignedIn) history.push('/');
        document.title = `${EDIT_PROFILE_TITLE} | ${SITE_TITLE}`;
        const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
        this.props.getUserProfile(token);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.isSignedIn) history.push('/');
        if (this.props.user.updatedAt !== prevProps.user.updatedAt) {
            this.setState({showSuccess: true, fileInputKey: Date.now()});
            const token = sessionStorage.getItem("tmToken") !== null ? sessionStorage.getItem("tmToken"): '';
            this.props.getUserProfile(token);
        }
        //this.props.clearUserError();        
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

    renderSuccess() {
        return (
            <div className="ui success message">
                <div className="header">Profile updated successfully.</div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>Edit Profile</h3>
                <div className="ui grid container">
                    <div className="twelve wide column">
                        <UserForm fileInputKey={this.state.fileInputKey} initialValues={_.pick(this.props.user, 'name', 'email')} formType="editprofile" onSubmit={this.onSubmit} />
                        { this.props.error ? this.renderError(this.props.error): null }
                        { this.state.showSuccess ? this.renderSuccess(): null } 
                    </div>
                    <div className="four wide column">
                        {this.props.user.hasAvatar ? 
                            <img style={{width: '100%', marginTop: '22px'}} alt="profile pic" src={`${API_BASE_URL}/users/${this.props.user._id}/avatar?v=${this.state.fileInputKey}`} /> 
                            : null 
                        }
                    </div>
                </div>
                
            </div>
        );
    }

}

const mapStateToProps = state => {
    //console.log(state);
    return { 
        isSignedIn: state.auth.isSignedIn,
        user: state.auth.user,
        error: state.auth.error ? state.auth.error : null 
    };
}

export default connect(mapStateToProps, { clearUserError, getUserProfile, updateUserProfile })(EditProfile);