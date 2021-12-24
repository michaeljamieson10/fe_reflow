import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Checkbox,

    FormControl, InputLabel, FilledInput, InputAdornment, Grid, Typography, Radio, FormLabel, RadioGroup
} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";
import {LoanType} from "../store/reduxStoreState";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {RadioButtonUnchecked} from "@material-ui/icons";


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


interface HomeInspectionFormProps {
    // onCancel: () => any,
    // users: { value: number, text: string }[],
    // usersLoaded?: boolean;
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

const HomeInspectionForm = (props: HomeInspectionFormProps & InjectedFormProps<{}, HomeInspectionFormProps>) => {
    const {handleSubmit} = props;
    //    purchasePrice: number;
    //     propertyTaxes: number;
    //     downPayment: number;
    const [values, setValues] = useState<StateValues>({purchasePrice: 0,propertyTaxes:0,downPayment:0})
    // console.log(transactions,"inside HCS");
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let loanType = ['','conventional','FHA','VA','USDA'];


    const handleChange = (prop: keyof StateValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(values,"Inside handleChange");
        setValues({ ...values, [prop]: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/*<Field name="purchasePrice" component={renderTextField} label="Purchase Price"/>*/}
            {/*<Field name={'purchasePrice'} label={'Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={'purchasePrice'} />*/}
            <Typography variant={"h6"}>Inspection Schedule</Typography>
            <Field name={'date'} label={'Date Made'} component={renderField} type="date" value={'date'} />
            <Field name={'time'} label={'Time Made'} component={renderField} type="time" value={'time'} />
            <Typography variant={"h6"}>Inspection Status</Typography>
            {/*<Field name={'completeAndMovingToContracts'} label={"Complete & Moving to Contracts"} component={renderField} type="radio"  value={'completeAndMovingToContracts'} />*/}
            {/*<Field name={'completeAndNotMovingToContracts'} label={"Complete & Not Moving to Contracts"} component={renderField} type="radio"  value={'completeAndMovingToContracts'} />*/}
            {/*<Field name={'noInspectionDoneAndMovingToContracts'} label={"No Inspection Done & Moving to Contracts"} component={renderField} type="radio"  value={'completeAndMovingToContracts'} />*/}
            <Field name="homeInspectionStatusType" component={renderRadioGroup}>
                <FormControlLabel value="complete_moving_to_contracts" control={<Radio value="complete_moving_to_contracts"/>} label={"Complete & Moving to Contracts"}/>
                <FormControlLabel value="complete_not_moving_to_contracts" control={<Radio value="complete_not_moving_to_contracts"/>} label={"Complete & Not Moving to Contracts"}/>
                <FormControlLabel value="no_inspection" control={<Radio value="no_inspection"/>} label={"No Inspection Done & Moving to Contracts"}/>
            </Field>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Accepted Offer</Button>
        {/*    <FormControl   variant="filled">
                    <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
                    <FilledInput
                        id="filled-adornment-amount"
                        value={values.amount}
                        // value={0}
                        onChange={handleChange('amount')}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>*/}
        </form>
    )
};

export default reduxForm<any,HomeInspectionFormProps >({
    form: 'HomeInspectForm', // a unique identifier for this form
    validate,
})(HomeInspectionForm)