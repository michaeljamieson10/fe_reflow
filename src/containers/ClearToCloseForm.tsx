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

interface ClearToCloseFormProps {

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
const ClearToCloseForm = (props: ClearToCloseFormProps & InjectedFormProps<{}, ClearToCloseFormProps>) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Clear to Close</Typography>
            <Field name="commitmentStatus" component={renderRadioGroup}>
                <FormControlLabel value="complete" control={<Radio value="complete"/>} label={"We are Clear to Close!"}/>
                <FormControlLabel value="pending" control={<Radio value="pending"/>} label={"Pending"}/>
            </Field>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create clear to close</Button>
        </form>
    )
};

export default reduxForm<any,ClearToCloseFormProps >({
    form: 'ClearToCloseForm', // a unique identifier for this form
    validate,
})(ClearToCloseForm)