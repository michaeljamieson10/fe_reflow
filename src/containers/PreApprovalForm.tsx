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


interface PreApprovalFormProps {
    // onCancel: () => any,
    // users: { value: number, text: string }[],
    // usersLoaded?: boolean;
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
    const initialFilterDiscountTypeState = {house: false, multifamily: false, condocoop: false, townhome: false, basement: false, centralair: false, pool: false, waterfront: false};
    const [values, setValues] = useState<StateValues>({maxPurchasePrice: 0,minPurchasePrice:0,maxPropertyTaxes:0, downPayment: "conventional"})
    // console.log(transactions,"inside HCS");
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let loanType = ['conventional','FHA','VA','USDA'];


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

    // const handleChange = (prop: keyof StateValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(values);
    //     setValues({ ...values, [prop]: event.target.value });
    // };
    // const handleSubmit = (formData) => {
    //     console.log(formData,"does this ever get called")
    //     createHomeCriteria(formData)
    //
    // }

    return (
        <form onSubmit={handleSubmit}>
            <Field name={'maxPurchasePrice'} label={'Max Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={'maxPurchasePrice'} />
            {/*<Field name={'maxPurchasePrice'} label={'Max Purchase Price'} component={renderField} type="textfield" adornment={"$"} value={values.maxPurchasePrice} />*/}
            <Field name={'maxLoanAmount'} label={'Max Loan Amount'} component={renderField} type="textfield" adornment={"$"} value={'maxLoanAmount'} />
            <Field name={'maxPropertyTaxes'} label={'Max Property Tax'} component={renderField} type="textfield" adornment={"%"} value={'maxPropertyTaxes'} />
            <Field name={'downPayment'} label={'Down Payment'} component={renderField} type="textfield" adornment={"%"} value={'downPayment'} />
            <Field name={"Loan Type"} value={"loanType"}component={renderSelectLoanTypeField}>
                {loanType.map((label) => (
                    <option value={label}>{label}</option>
                ))}
            </Field>

            <Button variant="contained" color="primary" onClick={handleSubmit}>create pre approval</Button>
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

export default reduxForm<any,PreApprovalFormProps >({
    form: 'PreApprovalForm', // a unique identifier for this form
    validate,
})(PreApprovalForm)