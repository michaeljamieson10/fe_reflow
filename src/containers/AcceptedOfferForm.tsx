import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Checkbox,
    FormControl, InputLabel, FilledInput, InputAdornment
} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";
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


interface AcceptedOfferFormProps {
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


const AcceptedOfferForm = (props: AcceptedOfferFormProps & InjectedFormProps<{}, AcceptedOfferFormProps>) => {
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
    // const handleSubmit = (formData) => {
    //     console.log(formData,"does this ever get called")
    //     createHomeCriteria(formData)
    //
    // }

    return (
        <form onSubmit={handleSubmit}>
            <Field name="purchasePrice" component={renderTextField} label="Purchase Price"/>
            {/*<Field name={'purchasePrice'} label={'Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={'purchasePrice'} />*/}
            <Field name={'propertyTaxes'} label={'Property Tax'} component={renderField} type="textfield" adornment={"%"} value={'propertyTaxes'} />
            <Field name={'downPayment'} label={'Down Payment'} component={renderField} type="textfield" adornment={"%"} value={'downPayment'} />

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

export default reduxForm<any,AcceptedOfferFormProps >({
    form: 'PreApprovalForm', // a unique identifier for this form
    validate,
})(AcceptedOfferForm)