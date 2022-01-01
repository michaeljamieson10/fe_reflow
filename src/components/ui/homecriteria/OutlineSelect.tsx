import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
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
        case 'one_hundred':
            return '$100k';
        case 'two_hundred':
            return '$200k';
        case 'three_hundred':
            return '$300k';
        case 'four_hundred':
            return '$400k';
        case 'five_hundred':
            return '$500k';
        case 'six_hundred':
            return '$600k';
        case 'seven_hundred':
            return '$700k';
        case 'eight_hundred':
            return '$800k';
        case 'nine_hundred':
            return '$900k';
        case 'one_million':
            return '$1M';
    }
}
const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>
    }
}
const renderSelectMinField = ({
                               input,
                               label,
                               meta: { touched, error },
                               children,
                               ...custom
                           }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="minPrice">Min</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'minPrice',
                id: 'minPrice'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)
const renderSelectMaxField = ({
                                  input,
                                  label,
                                  meta: { touched, error },
                                  children,
                                  ...custom
                              }) => (
    <FormControl error={touched && error}>
        <InputLabel htmlFor="maxPrice">Max</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'maxPrice',
                id: 'maxPrice'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)
    const OutlineSelect: React.FC = props => {
    let priceByHundreds = ['','one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];

    return (  <Grid
            container
            direction="row"
        >
            <Grid item style={{marginRight:"2em"}}>
            <Field name={"minPrice"}  defaultValue={"100k"} component={renderSelectMinField}>
                {priceByHundreds.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
            </Grid>
            <Field name={"maxPrice"} value={"maxPrice"}component={renderSelectMaxField}>
                {priceByHundreds.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
        </Grid>
    )
}
export default OutlineSelect;