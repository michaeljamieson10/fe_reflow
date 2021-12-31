import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Grid} from "@material-ui/core";
import {Field} from "redux-form";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);
function getLabel(priceByHundreds: string) {
    switch (priceByHundreds) {
        case 'one':
            return '1+';
        case 'two':
            return '2+';
        case 'three':
            return '3+';
        case 'four':
            return '4+';
        case 'five':
            return '5+';
    }
}
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}
const renderSelectBedField = ({
                                  input,
                                  label,
                                  meta: { touched, error },
                                  children,
                                  ...custom
                              }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="bed">Bed</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'amountOfBed',
                id: 'amountOfBed'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)

const renderSelectBathField = ({
                                  input,
                                  label,
                                  meta: { touched, error },
                                  children,
                                  ...custom
                              }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="bath">Bath</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'amountOfBath',
                id: 'amountOfBath'
            }}
            style={{width:'2.8em'}}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)
    const OutlineSelectBedAndBath: React.FC = props => {
    let unitsQuantity = ['','one','two','three','four','five'];

    return (
        <>
        <Grid
            item
        >
            <Field name={"amountOfBath"} component={renderSelectBathField}>
                {unitsQuantity.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
    </Grid>
            <Grid item>
                <Field name={"amountOfBed"} component={renderSelectBedField}>
                            {unitsQuantity.map((label) => (
                                <option value={label}>{getLabel(label)}</option>
                            ))}
                </Field>
        </Grid>
    </>
    )
}
export default OutlineSelectBedAndBath;