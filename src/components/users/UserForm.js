import React from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }

    }

    renderInput = ({input, label, type, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" type={type} />
                {this.renderError(meta)}
            </div>
        )
    }

    renderFileInput = ({input, key, label, meta}) => {
        const onInputChange = (e) => {
            e.preventDefault();
            const files = [...e.target.files];
            input.onChange(files);
        };

        const className = `field ${meta.error && meta.touched ? 'error': ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...key} name={input.name} type="file" onChange={onInputChange} />
            </div>
        )
    }


    renderSubmitBtn(formType) {
        switch (formType) {
            case 'login':
                return <button className="ui button primary">Login</button>
            
            case 'register':
                return <button className="ui button primary">Register</button>
            
            case 'editprofile':
                return <button className="ui button primary">Update</button>

            default:
                return <button className="ui button primary">Login</button>
        }
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                { this.props.formType === 'register' || this.props.formType === 'editprofile' ? <Field name="name" type="text" component={this.renderInput} label="Enter Name" />: null }
                <Field name="email" type="email" component={this.renderInput} label="Enter Email" />
                <Field name="password" type="password" component={this.renderInput} label="Enter Password" />
                { this.props.formType === 'editprofile' ?  <Field key={this.props.fileInputKey} label="Upload your profile picture" name="avatar" type="file" component={this.renderFileInput}></Field>: null }
                { this.renderSubmitBtn(this.props.formType) }
            </form>

        );
    }
}

const validate = (formValues, props) => {
    const errors = {};

    if (!formValues.name) {
        errors.name = 'You must enter name';
    }

    if (!formValues.email) {
        errors.email = 'You must enter email';
    }

    if ((props.formType === 'register') && (formValues.email) && (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formValues.email))) { 
        errors.email = 'You must enter a valid email';
    }

    if ((props.formType !== 'editprofile') && (!formValues.password)) {
        errors.password = 'You must enter password';
    }

    if ((props.formType === 'register' || props.formType === 'editprofile') && (formValues.password) && (formValues.password.length < 7)) {
        errors.password = 'Password must be minimum 7 characters';
    }

    return errors;
}

export default reduxForm({
    form: 'userForm',
    touchOnBlur: false,
    validate
})(UserForm);

