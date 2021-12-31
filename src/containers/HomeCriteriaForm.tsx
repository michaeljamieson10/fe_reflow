import React, {useState} from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {Button, TextField, DialogActions, DialogContent, FormControlLabel, Checkbox} from '@material-ui/core';
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";

import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';

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
    // const initialFilterDiscountTypeState = {house: false, multifamily: false, condocoop: false, townhome: false, basement: false, centralair: false, pool: false, waterfront: false};
    const [address, setAddress] = useState("");
    const handleSelect = async (value) => {
        console.log(value,"value");
        // const results = await geocodeByAddress(value);
        // console.log(results,"results");
    };

    const renderField = ({ input, defaultSelected, label, type, users,
                             meta: { touched, error, form }, children, ...custom }) => {
        switch (type) {
            case 'checkbox':
                return <FormControlLabel label={label} control={<Checkbox {...input} onChange={input.onChange} />} />
            default:
                // return <TextField
                //     label={label} type={type} {...input} {...custom} error={!!(touched && error)} helperText={touched && error ? error : ''}
                // />;
                return     <TextField label={label} placeholder={label} type={type} {...input}
                                      error={touched && error ? true : false}
                                      helperText={touched && error ? error : ''}
                                      margin="normal"
                />
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <OutlineSelect/>
            <OutlineSelectBedAndBath/>
            <Field name={'house'} label={'House'} component={renderField} type="checkbox" value={'house'} />
            <Field name={'multifamily'} label={'Multifamily'} component={renderField} type="checkbox"  value={'multifamily'} />
            <Field name={'condocoop'} label={'Condocoop'} component={renderField} type="checkbox" value={'condocoop'} />
            <Field name={'townhome'} label={'Townhome'} component={renderField} type="checkbox" value={'townhome'} />
            <Field name={'basement'} label={'Basement'} component={renderField} type="checkbox" value={'basement'} />
            <Field name={'centralair'} label={'Central Air'} component={renderField} type="checkbox" value={'centralair'} />
            <Field name={'pool'} label={'Pool'} component={renderField} type="checkbox" value={'pool'} />
            <Field name={'waterfront'} label={'Waterfront'} component={renderField} type="checkbox" value={'waterfront'} />
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <Button variant="contained" color="primary" onClick={handleSubmit}>create HC</Button>
        </form>
    )
};

export default reduxForm<any,HomeCriteriaFormProps>({
    form: 'HomeCriteriaForm', // a unique identifier for this form
    validate,
})(HomeCriteriaForm)