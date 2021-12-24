import React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    TextField,
    FormControlLabel,
    Checkbox,

    FormControl, InputLabel, FilledInput, InputAdornment, Grid, Typography, Radio, FormLabel, RadioGroup
} from '@material-ui/core';
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


interface AppraisalFormProps {

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
                    <FormControlLabel value="female" control={<Radio {...input} onChange={input.onChange}/>} label={"female"}/>
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

    }
};

const renderTextField = field => (
    <TextField hintText={field.input.label}
               floatingLabelText={field.input.label}
               type="number"
               errorText={field.touched && field.error}
               {...field.input}
    />
)
const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
)

const AppraisalForm = (props: AppraisalFormProps & InjectedFormProps<{}, AppraisalFormProps>) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Appraisal Schedule</Typography>
            <Field name={'date'} label={'Date Made'} component={renderField} type="date" value={'date'} />
            <Field name={'time'} label={'Time Made'} component={renderField} type="time" value={'time'} />
            <Typography variant={"h6"}>Appraisal Status</Typography>
            <Field name={'appraisedValue'} label={'Appraised Value'} component={renderTextField} type="appraisedValue" value={'appraisedValue'} />

            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Appraised Value</Button>
        </form>
    )
};

export default reduxForm<any,AppraisalFormProps >({
    form: 'AppraisalForm', // a unique identifier for this form
    validate,
})(AppraisalForm)