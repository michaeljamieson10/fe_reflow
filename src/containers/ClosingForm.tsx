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
    // if (!values.userId) {
    //     errors.userId = 'Required'
    // }
    // if (!values.condocoop) {
    //     errors.condocoop = false
    // }
    // const requiredFields = ['code', 'discountType', 'maxDiscountAmount', 'maxPerUserUsageTimes'];
    // requiredFields.forEach(field => {
    //     if (!values[field]) {
    //         errors[field] = 'Required'
    //     }
    // });
    // if (!values['closingStatusType'])
    console.log("HELLO FROM ERRORS", "values is right",values)
    if (!values.commitmentStatus)
        errors.commitmentStatus = 'Required for complete or pending to submit';
    console.log("HELLO FROM ERRORS", errors, "values is right",values)
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
        case 'radio':
            return <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={input.onChange}>
                    <FormControlLabel value="female"
                                      // error={touched && error ? true : false}
                                      // helperText={touched && error ? error : ''}
                                      control={<Radio {...input} onChange={input.onChange}/>} label={"female"}/>
                </RadioGroup>
            </FormControl>
            // <FormControlLabel label={label} control={<Radio {...input} onChange={input.onChange} />} />
        case 'checkbox':
            return <FormControlLabel label={label} control={<Checkbox {...input} onChange={input.onChange} />} />
        case 'time':
            return <TextField
                id="time"
                label="time"
                type="time"
                value={value}
                onChange={input.onChange}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    step: 300, // 5 min
                }}
            />
        case 'date':
            return  <TextField
            id="date"
            label="date"
            type="date"
            value={value}
            onChange={input.onChange}
            // defaultValue="2021-12-23"
            InputLabelProps={{
                shrink: true,
            }}
        />
        case 'textfield':
            console.log(input,value,"Inside renderfield");
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
        default:
            return <TextField
                label={label} type={type} {...input} {...custom} error={!!(touched && error)} helperText={touched && error ? error : ''}
            />;

    }
};

const errorMessage = ({meta}) =>
    <>
        {console.log(meta,"inside meta")}
    <div>{meta.error && meta.touched && 'Please select an option first'}</div>
    </>
const renderTextField = field => (
    <TextField hintText={field.input.label}
               floatingLabelText={field.input.label}
               errorText={field.touched && field.error}
               {...field.input}
    />
)
//meta: { touched, error, form },
const renderRadioGroup = ({ input,meta, ...rest }) => (
    <>
        {console.log(meta)}
    <RadioGroup {...input} {...rest}
                      valueSelected={input.value}

                      onChange={(event, value) => input.onChange(value)}/>
    <div>{meta.error && meta.touched && 'Please select an option first'}</div>
    </>
)

const ClosingForm = (props: ClosingFormProps & InjectedFormProps<{}, ClosingFormProps>) => {
    const {handleSubmit, error} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Closing</Typography>
            <Field name="commitmentStatus" component={renderRadioGroup}>
                <FormControlLabel value="complete" control={<Radio value="complete"/>} label={"Complete"}/>
                <FormControlLabel value="pending" control={<Radio value="pending"/>} label={"Pending"}/>
            </Field>
            <div>{error}</div>
            <Button variant="contained" color="primary" onClick={handleSubmit(validate)}>Create closing</Button>
        </form>
    )
};

export default reduxForm<any,ClosingFormProps >({
    form: 'ClosingForm', // a unique identifier for this form
    validate,
})(ClosingForm)