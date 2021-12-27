import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    FormControl, InputLabel, FilledInput, InputAdornment
} from '@material-ui/core';
import FormHelperText from "@material-ui/core/FormHelperText";


const validate = (values) => {
    const errors: any = {};
    if (!values.address) {
        errors.address = 'Required'
    }
    if (!values.purchasePrice) {
        errors.purchasePrice = 'Required'
    }
    if (!values.downPayment) {
        errors.downPayment = 'Required'
    }
    if (!values.propertyTaxes) {
        errors.propertyTaxes = 'Required'
    }
    return errors
};


interface AcceptedOfferFormProps {
    onSubmit?: (values) => any;
}
interface StateValues {
    purchasePrice: number;
    propertyTaxes: number;
    downPayment: number;
}
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}

const renderField = ({ input, defaultSelected, label, type, users,adornment, value, name,
                         meta: { touched, error, form }, children, ...custom }) => {
    switch (type) {
        case 'textfield':
            console.log(input,value,"Inside renderfield");
            return <FormControl variant="filled">
                <InputLabel htmlFor="filled-adornment-amount">{label}</InputLabel>
                <FilledInput
                    id="filled-adornment-amount"
                    value={value}
                    onChange={input.onChange}
                    startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
                />
                {renderFromHelper({ touched, error })}
            </FormControl>

    }
};


const AcceptedOfferForm = (props: AcceptedOfferFormProps & InjectedFormProps<{}, AcceptedOfferFormProps>) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Field name={'address'} label={'Address'} component={renderField} type="textfield"  value={'propertyTaxes'} />
            <Field name={'purchasePrice'} label={'Purchase Price'} component={renderField} type="textfield" value={'purchasePrice'} />
            <Field name={'propertyTaxes'} label={'Property Tax'} component={renderField} type="textfield" adornment={"%"} value={'propertyTaxes'} />
            <Field name={'downPayment'} label={'Down Payment'} component={renderField} type="textfield" adornment={"%"} value={'downPayment'} />

            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Accepted Offer</Button>

        </form>
    )
};

export default reduxForm<any,AcceptedOfferFormProps >({
    form: 'AcceptedOfferForm', // a unique identifier for this form
    validate,
})(AcceptedOfferForm)