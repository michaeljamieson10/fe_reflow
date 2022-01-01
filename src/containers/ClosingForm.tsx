import React, {useState} from 'react';
import {Field, reduxForm, InjectedFormProps, getFormSubmitErrors} from 'redux-form';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,

    FormControl, InputLabel, FilledInput, InputAdornment, Grid, Typography, Radio, FormLabel, RadioGroup
} from '@material-ui/core';
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { SubmissionError } from 'redux-form'


const validate = (values) => {
    const errors: any = {};
    if (!values.commitmentStatus)
        errors.commitmentStatus = 'Required for complete or pending to submit';
    return errors
};


interface ClosingFormProps {

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

const ClosingForm = (props: ClosingFormProps & InjectedFormProps<{}, ClosingFormProps>) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Closing</Typography>
            <Field name="commitmentStatus" component={renderRadioGroup}>
                <FormControlLabel value="complete" control={<Radio value="complete"/>} label={"Complete"}/>
                <FormControlLabel value="pending" control={<Radio value="pending"/>} label={"Pending"}/>
            </Field>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Complete</Button>
        </form>
    )
};

export default reduxForm<any,ClosingFormProps >({
    form: 'ClosingForm', // a unique identifier for this form
    validate,
})(ClosingForm)