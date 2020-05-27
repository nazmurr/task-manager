import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
     
        this.state = {
          fileError: null
        };
    }

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

    renderTextArea = ({input, rows, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea {...input} rows={rows}></textarea>
                {this.renderError(meta)}
            </div>
        )
    }

    renderFileInput = ({input, key, label, meta}) => {
        const onFileInputClick = () => {
            this.setState({fileError: null});
        };

        const onInputChange = (e) => {
            e.preventDefault();
            if ((e.target.files.length) && (e.target.files[0].size > 1000000)) {
                this.setState({fileError: 'File too large. Please select less than 1mb file'});
                e.target.value = null;
                return;
            }

            if ((e.target.files.length) && (!e.target.files[0].type.match(/\/(jpg|jpeg|png)$/))) {
                this.setState({fileError: 'Please upload an image'});
                e.target.value = null;
                return;
            }

            const files = [...e.target.files];
            input.onChange(files);
        };

        const className = `field ${meta.error && meta.touched ? 'error': ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...key} name={input.name} type="file" onClick={onFileInputClick} onChange={onInputChange} />
            </div>
        )
    }

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render() {
        const {hasTaskImg, taskImg, handleSubmit, formType} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" type="text" component={this.renderInput} label="Enter Task Title" />
                <Field name="description" rows="4" component={this.renderTextArea} label="Enter Task Description" />
                <div className="field">
                    <label>Task Status</label>
                    <Field className="ui dropdown" name="completed" label="Task Status" component="select">
                        <option value="false">Pending</option>
                        <option value="true">Completed</option>
                    </Field>
                </div>
                <Field label="Upload a image (screenshot or something if necessary)" name="taskImg" type="file" component={this.renderFileInput}></Field>
                { this.state.fileError !== null ? this.renderError({touched: true, error: this.state.fileError}) : null}
                {hasTaskImg ? 
                    <div className="image">
                        <img src={`data:image/jpeg;base64,${taskImg}`} alt="task img" />
                    </div> 
                    : 
                    null
                }
                <button className="ui button primary">{ formType === 'createtask' ? 'Create Task': 'Update Task' }</button>
            </form>

        );
    }

}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter task title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter task description';
    }

    return errors;
}

export default reduxForm({
    form: 'taskForm',
    touchOnBlur: false,
    validate
})(TaskForm);