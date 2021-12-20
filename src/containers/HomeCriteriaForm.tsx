import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {Button, TextField, DialogActions, DialogContent, FormControlLabel, Checkbox} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";


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

const renderField = ({ input, label, type, users, meta: { touched, error, value, form }, ...custom }) => {
    return <TextField label={label} type={type} {...input}
               error={!!(touched && error)}
               helperText={touched && error ? error : ''} {...custom} />
}

// const onSubmit = values => {
//     // const responseFunc = response => {
//     //     if (!response.error) {
//     //
//     //     } else {
//     //     }
//     // console.log(response,"FROM INSIDE HANDLE SUBMIT OF HCF");
//     //
//     // };
//     // alert(values);
//
//     console.log(values,"FROM INSIDE HANDLE SUBMIT OF HCF");
//
//     // dispatch<any>(createHomeCriteria(transactionId));
//     createHomeCriteria(values);
//
//     // history.push(`/dashboard/transaction/${transactionId}`);
//
// };
interface HomeCriteriaFormProps {
    // onCancel: () => any,
    // users: { value: number, text: string }[],
    // usersLoaded?: boolean;
    onSubmit?: (values) => any;

}

const HomeCriteriaForm = (props: HomeCriteriaFormProps & InjectedFormProps<{}, HomeCriteriaFormProps>) => {
// const HomeCriteriaForm = (props: InjectedFormProps<any>) => {
// const HomeCriteriaForm = ({handleSubmit}) => {
    // const {handleSubmit : createHomeCriteria } = props;
    // const {handleSubmit: createHomeCriteria} = props;
    const {handleSubmit} = props;
    const initialFilterDiscountTypeState = {house: false, multifamily: false, condocoop: false, townhome: false, basement: false, centralair: false, pool: false, waterfront: false};

    // console.log(transactions,"inside HCS");
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];

    // console.log(priceByHundreds,"EL PRECIO");
    // const [homeCriteriaStatusTypse, setHomeCriteriaStatusType] = useState<homeCriteriaStatusStype>("");

    const [filterDiscountTypeChecked, setFilterDiscountTypeChecked] = useState(initialFilterDiscountTypeState);
    const [filterDiscountType, setFilterDiscountType] = useState(initialFilterDiscountTypeState);
    const [filterDiscountTypeRadioSelection, setFilterDiscountTypeRadioSelection] = useState<'lol' | 'pewpew'>('lol');
    const handleChangeCheckboxDiscountType = (evt) => {
        const selection = evt.target.value;
        const isChecked = evt.target.checked;

        console.log(evt.target,"inside");

        if (filterDiscountTypeRadioSelection === 'lol') setFilterDiscountTypeRadioSelection('pewpew');

        //update checked state for the checkbox that was just checked
        setFilterDiscountTypeChecked({...filterDiscountTypeChecked, [selection]: isChecked});
        //update state to filter by selected discount value
        setFilterDiscountType({...filterDiscountType, [selection]: isChecked});
    }

    const renderField = ({ input, defaultSelected, label, type, users,
                             meta: { touched, error, form }, children, ...custom }) => {
        switch (type) {
            case 'checkbox':
                return <FormControlLabel label={label} control={<Checkbox {...input} onChange={input.onChange} />} />
            default:
                return <TextField
                    label={label} type={type} {...input} {...custom} error={!!(touched && error)} helperText={touched && error ? error : ''}
                />;
        }
    };
    // const handleSubmit = (formData) => {
        // console.log(formData,"does this ever get called")
        // createHomeCriteria(formData)

    // }

    return (
        <form onSubmit={handleSubmit}>
            <OutlineSelect/>
            <OutlineSelectBedAndBath/>
            {/*<Field name={`category${category.id}`} label={category.name} key={category.id} component={renderField} type="checkbox" value={category.id} />*/}
            <Field name={'house'} label={'House'} component={renderField} type="checkbox" value={'house'} />
            <Field name={'multifamily'} label={'Multifamily'} component={renderField} type="checkbox"  value={'multifamily'} />
            <Field name={'condocoop'} label={'Condocoop'} component={renderField} type="checkbox" value={'condocoop'} />
            <Field name={'townhome'} label={'Townhome'} component={renderField} type="checkbox" value={'townhome'} />
            <Field name={'basement'} label={'Basement'} component={renderField} type="checkbox" value={'basement'} />
            <Field name={'centralair'} label={'Central Air'} component={renderField} type="checkbox" value={'centralair'} />
            <Field name={'pool'} label={'Pool'} component={renderField} type="checkbox" value={'pool'} />
            <Field name={'waterfront'} label={'Waterfront'} component={renderField} type="checkbox" value={'waterfront'} />

            <Button variant="contained" color="primary" onClick={handleSubmit}>create HC</Button>
        </form>
    )
};

export default reduxForm<any,HomeCriteriaFormProps>({
    form: 'HomeCriteriaForm', // a unique identifier for this form
    validate,
})(HomeCriteriaForm)