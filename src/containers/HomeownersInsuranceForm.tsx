import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,

    FormControl, InputLabel, FilledInput, InputAdornment, Grid, Typography, Radio, FormLabel, RadioGroup
} from '@material-ui/core';
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";

const validate = (values) => {
    const errors: any = {};
    if (!values.commitmentStatus)
        errors.commitmentStatus = 'Required for complete or pending to submit';
    return errors
};



interface HomeownersInsuranceFormProps {

    onSubmit?: (values) => any;

}
interface StateValues {
    purchasePrice: number;
    propertyTaxes: number;
    downPayment: number;
}

const renderRadioGroup = ({ input,meta, ...rest }) => (
    <>
        {console.log(meta,"this works from meta")}
        <RadioGroup {...input} {...rest}
                    valueSelected={input.value}
                    onChange={(event, value) => input.onChange(value)}/>
        <div>{meta.error && meta.touched && 'Please select an option first'}</div>
    </>
)
const HomeownersInsuranceForm = (props: HomeownersInsuranceFormProps & InjectedFormProps<{}, HomeownersInsuranceFormProps>) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Homeowners Insurance</Typography>
            <Field name="commitmentStatus" component={renderRadioGroup}>
                <FormControlLabel value="commitment_received" control={<Radio value="complete"/>} label={"Complete & Have Insurance Binder"}/>
                <FormControlLabel value="pending" control={<Radio value="pending"/>} label={"Pending"}/>
            </Field>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Complete</Button>
        </form>
    )
};

export default reduxForm<any,HomeownersInsuranceFormProps >({
    form: 'HomeownersInsuranceForm', // a unique identifier for this form
    validate,
})(HomeownersInsuranceForm)