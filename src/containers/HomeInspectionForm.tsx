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
    if (!values.homeInspectionStatusType) {
        errors.homeInspectionStatusType = 'Required'
    }
    // if (!values.condocoop) {
    //     errors.condocoop = false
    // }
    return errors
};


interface HomeInspectionFormProps {

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
const renderRadioGroup = ({ input,meta, ...rest }) => (
    <>
    <RadioGroup {...input} {...rest}
                      valueSelected={input.value}
                      onChange={(event, value) => input.onChange(value)}/>
    <div>{meta.error && meta.touched && 'Please select an option first'}</div>
    </>

)

const HomeInspectionForm = (props: HomeInspectionFormProps & InjectedFormProps<{}, HomeInspectionFormProps>) => {
    const {handleSubmit} = props;
    const [values, setValues] = useState<StateValues>({purchasePrice: 0,propertyTaxes:0,downPayment:0})
    let loanType = ['','conventional','FHA','VA','USDA'];


    const handleChange = (prop: keyof StateValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(values,"Inside handleChange");
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                direction="column"
            >
            <Typography variant={"h6"}>Inspection Schedule</Typography>
            <Field name={'date'} label={'Date Made'} component={renderField} type="date" value={'date'} />
            <Field name={'time'} label={'Time Made'} component={renderField} type="time" value={'time'} />
            <Typography style={{marginTop:"1em"}}variant={"h6"}>Inspection Status</Typography>
            <Field name="homeInspectionStatusType" component={renderRadioGroup}>
                <FormControlLabel value="complete_moving_to_contracts" control={<Radio value="complete_moving_to_contracts"/>} label={"Complete & Moving to Contracts"}/>
                <FormControlLabel value="complete_not_moving_to_contracts" control={<Radio value="complete_not_moving_to_contracts"/>} label={"Complete & Not Moving to Contracts"}/>
                <FormControlLabel value="no_inspection" control={<Radio value="no_inspection"/>} label={"No Inspection Done & Moving to Contracts"}/>
            </Field>
            <Button style={{marginTop:"1em"}} variant="contained" color="primary" onClick={handleSubmit}>Complete</Button>
            </Grid>
        </form>
    )
};

export default reduxForm<any,HomeInspectionFormProps >({
    form: 'HomeInspectForm', // a unique identifier for this form
    validate,
})(HomeInspectionForm)