import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {Button, TextField, DialogActions, DialogContent, FormControlLabel, Checkbox} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";


const validate = (values) => {
    const errors: any = {};
    // if (!values.userId) {
    //     errors.userId = 'Required'
    // }
    // if (!values.condocoop) {
    //     errors.condocoop = false
    // }
    return errors
};

const renderField = ({ input, label, type, users, meta: { touched, error, value, form }, ...custom }) => {
    return <TextField label={label} type={type} {...input}
               error={!!(touched && error)}
               helperText={touched && error ? error : ''} {...custom} />
}

// const onSubmit = values => {
//     // const responseFunc = response => {
//     //     if (!response.error) {
//     //
//     //     } else {
//     //     }
//     // console.log(response,"FROM INSIDE HANDLE SUBMIT OF HCF");
//     //
//     // };
//     // alert(values);
//
//     console.log(values,"FROM INSIDE HANDLE SUBMIT OF HCF");
//
//     // dispatch<any>(createHomeCriteria(transactionId));
//     createHomeCriteria(values);
//
//     // history.push(`/dashboard/transaction/${transactionId}`);
//
// };
interface ContractsSignedFormProps {
    // onCancel: () => any,
    // users: { value: number, text: string }[],
    // usersLoaded?: boolean;
    onSubmit?: (values) => any;

}

const ContractsSignedForm = (props: ContractsSignedFormProps & InjectedFormProps<{}, ContractsSignedFormProps>) => {
    const {handleSubmit} = props;
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];

    const renderField = ({ input, defaultSelected, label, type, users,
                             meta: { touched, error, form }, children, ...custom }) => {
        switch (type) {
            case 'checkbox':
                return <FormControlLabel label={label} control={<Checkbox {...input} onChange={input.onChange} />} />
            default:
                return <TextField
                    label={label} type={type} {...input} {...custom} error={!!(touched && error)} helperText={touched && error ? error : ''}
                />;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Field name={'house'} label={'House'} component={renderField} type="checkbox" value={'house'} />
            <Field name={'multifamily'} label={'Multifamily'} component={renderField} type="checkbox"  value={'multifamily'} />

            <Button variant="contained" color="primary" onClick={handleSubmit}>create HC</Button>
        </form>
    )
};

export default reduxForm<any,ContractsSignedFormProps>({
    form: 'ContractsSignedForm', // a unique identifier for this form
    validate,
})(ContractsSignedForm)