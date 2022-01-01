import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {Button, TextField, DialogActions, DialogContent, FormControlLabel, Checkbox, Grid} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutoCompleteGoogleMaps from "../components/PlacesAutoCompleteGoogleMaps";

const validate = (values) => {
    const errors: any = {};
    if (!values.Max) {
        errors.Max = 'Required'
    }
    if (!values.Min) {
        errors.Min = 'Required'
    }
    if (!values.Bath) {
        errors.Bath = 'Required'
    }
    if (!values.Bed) {
        errors.Bed = 'Required'
    }

    return errors
};

interface HomeCriteriaFormProps {
    onSubmit?: (values) => any;
}

const HomeCriteriaForm = (props: HomeCriteriaFormProps & InjectedFormProps<{}, HomeCriteriaFormProps>) => {
    const {handleSubmit} = props;
    const renderField = ({ input, defaultSelected, label, type, users,
                             meta: { touched, error, form }, children, ...custom }) => {
        switch (type) {
            case 'checkbox':
                return <FormControlLabel label={label} control={<Checkbox {...input} onChange={input.onChange} />} />
            default:
                return     <TextField label={label} placeholder={label} type={type} {...input}
                                      error={touched && error ? true : false}
                                      helperText={touched && error ? error : ''}
                                      margin="normal"
                />
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid
                container
                direction="column"
            >
                <Grid item>
                    <OutlineSelect/>
                    <OutlineSelectBedAndBath/>
                </Grid>

                <Grid item style={{marginTop:"1em"}}>
                    <Field name={'house'} label={'House'} component={renderField} type="checkbox" value={'house'} />
                    <Field name={'multifamily'} label={'Multifamily'} component={renderField} type="checkbox"  value={'multifamily'} />
                    <Field name={'condocoop'} label={'Condocoop'} component={renderField} type="checkbox" value={'condocoop'} />
                    <Field name={'townhome'} label={'Townhome'} component={renderField} type="checkbox" value={'townhome'} />
                </Grid>
                <Grid item>
                    <Field name={'basement'} label={'Basement'} component={renderField} type="checkbox" value={'basement'} />
                    <Field name={'centralair'} label={'Central Air'} component={renderField} type="checkbox" value={'centralair'} />
                    <Field name={'pool'} label={'Pool'} component={renderField} type="checkbox" value={'pool'} />
                    <Field name={'waterfront'} label={'Waterfront'} component={renderField} type="checkbox" value={'waterfront'} />
                </Grid>
                <Grid item style={{marginBottom:"1em"}}>
                    <Field name="cityOne" component={PlacesAutoCompleteGoogleMaps} />
                    <Field name="cityTwo" component={PlacesAutoCompleteGoogleMaps} />
                    <Field name="cityThree" component={PlacesAutoCompleteGoogleMaps} />
                    <Field name="cityFour" component={PlacesAutoCompleteGoogleMaps} />
                    <Field name="cityFive" component={PlacesAutoCompleteGoogleMaps} />
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Complete</Button>
        </form>
    )
};

export default reduxForm<any,HomeCriteriaFormProps>({
    form: 'HomeCriteriaForm', // a unique identifier for this form
    validate,
})(HomeCriteriaForm)