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
    // if (!values.userId) {
    //     errors.userId = 'Required'
    // }
    // if (!values.condocoop) {
    //     errors.condocoop = false
    // }
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
               errorText={field.touched && field.error}
               {...field.input}
    />
)
const renderRadioGroup = ({ input, ...rest }) => (
    <RadioGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
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