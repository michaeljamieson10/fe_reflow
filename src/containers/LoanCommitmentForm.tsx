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


interface LoanCommitmentFormProps {

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
const LoanCommitmentForm = (props: LoanCommitmentFormProps & InjectedFormProps<{}, LoanCommitmentFormProps>) => {
    const {handleSubmit} = props;
    const [values, setValues] = useState<StateValues>({purchasePrice: 0,propertyTaxes:0,downPayment:0})
    let loanType = ['','conventional','FHA','VA','USDA'];


    return (
        <form onSubmit={handleSubmit}>
            <Typography variant={"h6"}>Loan Commitment Status</Typography>
            <Field name="commitmentStatus" component={renderRadioGroup}>
                <FormControlLabel value="commitment_received" control={<Radio value="commitment_received"/>} label={"Commitment Received"}/>
                <FormControlLabel value="commitment_not_given" control={<Radio value="commitment_not_given"/>} label={"Commitment Not Given"}/>
            </Field>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Create Accepted Offer</Button>
        </form>
    )
};

export default reduxForm<any,LoanCommitmentFormProps >({
    form: 'LoanCommitmentForm', // a unique identifier for this form
    validate,
})(LoanCommitmentForm)