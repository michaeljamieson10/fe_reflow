import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Button, TextField, DialogActions, DialogContent } from '@material-ui/core';

// import './DSPFormStyles.scss';

const validate = (values) => {
    const errors: any = {};
    if (!values.userId) {
        errors.userId = 'Required'
    }
    if (!values.name) {
        errors.name = 'Required'
    }
    return errors
};

const renderField = ({ input, label, type, users, meta: { touched, error, value, form }, ...custom }) => {
    return <TextField label={label} type={type} {...input}
               error={!!(touched && error)}
               helperText={touched && error ? error : ''} {...custom} />
}


interface ClientFormProps {
    onCancel: () => any,
    users: { value: number, text: string }[],
    usersLoaded?: boolean;
}

const ClientForm = (props: ClientFormProps & InjectedFormProps<{}, ClientFormProps>) => {
    const { handleSubmit, onCancel, users, usersLoaded } = props;
    return (
        <form onSubmit={handleSubmit} >
            <DialogContent>
                 <Field name="name" type="text" component={renderField} label="Name" />
                <Field name="userId" component={renderField} users={users} label="User id" dataLoaded={usersLoaded}  />
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={onCancel}>Cancel</Button>
                <Button variant='contained' color='primary' onClick={handleSubmit}>Creates</Button>
            </DialogActions>
        </form>
    )
};

export default reduxForm<any, ClientFormProps>({
    form: 'ClientForm', // a unique identifier for this form
    validate
})(ClientForm)