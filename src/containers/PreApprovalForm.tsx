import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    FormControl, InputLabel, FilledInput, InputAdornment
} from '@material-ui/core';
import {LoanType} from "../store/reduxStoreState";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";


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


interface PreApprovalFormProps {
    onSubmit?: (values) => any;

}
interface StateValues {
    maxPurchasePrice: number;
    minPurchasePrice: number;
    maxPropertyTaxes: number;
    downPayment: LoanType;
}
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}
const renderSelectLoanTypeField = ({
                                  input,
                                  label,
                                  meta: { touched, error },
                                  children,
                                  ...custom
                              }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="loanType">Loan Type</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'loanType',
                id: 'loanType'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)

const PreApprovalForm = (props: PreApprovalFormProps & InjectedFormProps<{}, PreApprovalFormProps>) => {
    const {handleSubmit} = props;
    let loanType = ['','conventional','FHA','VA','USDA'];


    const renderField = ({ input, defaultSelected, label, type, users,adornment, value,
                             meta: { touched, error, form }, children, ...custom }) => {
        switch (type) {
            case 'textfield':
                return <FormControl variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">{label}</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={value}
                        // onChange={handleChange(value)}
                        onChange={input.onChange}
                        startAdornment={<InputAdornment position="start">{adornment}</InputAdornment>}
                    />
                </FormControl>

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Field name={'maxPurchasePrice'} label={'Max Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={'maxPurchasePrice'} />
            {/*<Field name={'maxPurchasePrice'} label={'Max Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={values.maxPurchasePrice} />*/}
            <Field name={'maxLoanAmount'} label={'Max Loan Amount'} component={renderField} type="textfield" adornment={"$"} value={'maxLoanAmount'} />
            <Field name={'maxPropertyTaxes'} label={'Max Property Tax'} component={renderField} type="textfield" adornment={"%"} value={'maxPropertyTaxes'} />
            <Field name={'downPayment'} label={'Down Payment'} component={renderField} type="textfield" adornment={"%"} value={'downPayment'} />
            <Field name={"loanType"} value={"loanType"}component={renderSelectLoanTypeField}>
                {loanType.map((label) => (
                    <option value={label}>{label}</option>
                ))}
            </Field>

            <Button variant="contained" color="primary" onClick={handleSubmit}>create pre approval</Button>
        </form>
    )
};

export default reduxForm<any,PreApprovalFormProps >({
    form: 'PreApprovalForm', // a unique identifier for this form
    validate,
})(PreApprovalForm)