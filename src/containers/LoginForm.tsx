import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {Button, Grid, TextField} from '@material-ui/core';

const validate = values => {
    const errors:any = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email.trim())) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors
};

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <TextField label={label} placeholder={label} type={type} {...input}
            error={touched && error ? true : false}
            helperText={touched && error ? error : ''}
            margin="normal"
            style={{ width: 250 }}
        />
    </div>
);


interface LoginFormProps extends Partial<InjectedFormProps> {
    handleSubmit?: any;
    onSubmit?: any;
    enableButton: boolean;
}
const LoginForm = (props: LoginFormProps) => {
    const { handleSubmit, enableButton } = props;

    const keyPressCallback = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            handleSubmit();
        }
    }

    return (

        <form onSubmit={handleSubmit} onKeyPress={e => keyPressCallback(e)}>
            <Field name="email" type="text" component={renderField} label="Email" />
            <Field name="password" type="password" component={renderField} label="Password" />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{marginTop:"0.8em",marginBottom: "0.5em"}}
            >
            <Button color="primary" variant="contained" onClick={handleSubmit} disabled={!enableButton}>
                Log In
            </Button>
            </Grid>
        </form>
    )
};

export default reduxForm<any, LoginFormProps>({
    form: 'LoginForm', // a unique identifier for this form
    validate
})(LoginForm)
