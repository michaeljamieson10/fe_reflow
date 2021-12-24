import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {FormControlLabel, TextField, Button, Checkbox, Grid} from '@material-ui/core';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        {type === 'checkbox' ?
            <FormControlLabel
                control={
                    <Checkbox
                        className="checkbox"
                        checked={!!input.value}
                        onChange={input.onChange}
                        style={touched && error ? { color: 'red' } : {}}
                    />
                }
                label={touched && error ? error : label}
                style={touched && error ? { color: 'red' } : {}}
            />
            :
            <TextField label={label} hint={label} type={type} {...input}
                error={touched && error ? true : false}
                helperText={touched && error ? error : ''}
                margin="normal"
                style={{ width: 250 }}
            />
        }
    </div>
);

interface SignUpFormProps extends Partial<InjectedFormProps> {
    handleSubmit?: any,
    enableButton: boolean,

}

const SignUpForm = (props: SignUpFormProps) => {
    const { handleSubmit, enableButton } = props;
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{marginBottom:"3em"}}
        >
        <form onSubmit={handleSubmit}>
            <Field name="firstName" type="text" component={renderField} label="First Name" />
            <Field name="lastName" type="text" component={renderField} label="Last Name" />
            <Field name="email" type="text" component={renderField} label="Email Address" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <Field name="phoneNumber" type="text" component={renderField} label="Phone Number" />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{marginTop: "1.5em"}}
                >
            <Button color="primary" variant="contained" onClick={handleSubmit} disabled={!enableButton} id="sign-up-button">
                Sign Up
            </Button>
            </Grid>
        </form>
        </Grid>
    );
};

const validate = values => {
    const errors:any = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } if (!values.lastName) {
        errors.lastName = 'Required';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    if (!values.phoneNumber) {
        errors.phoneNumber = 'Required';
    } else if (isNaN(Number(values.phoneNumber))) {
        errors.phoneNumber = 'Must be a number';
    }
    return errors;
};

export default reduxForm<{}, SignUpFormProps>({
    form: 'UserSignUpForm',
    validate
})(SignUpForm);
