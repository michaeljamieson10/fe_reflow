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
        <InputLabel htmlFor="min">Min</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'Min',
                id: 'min'
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
        <InputLabel htmlFor="max">Max</InputLabel>
        <Select
            native
            {...input}
            {...custom}
            inputProps={{
                name: 'Max',
                id: 'max'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)
    const OutlineSelect: React.FC = props => {
// export default function OutlineSelect() {
    const classes = useStyles();
    const [age, setAge] = React.useState('s');
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];
    // const {priceByHundreds} = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };
    return (  <Grid
            container
            spacing={0}
            direction="row"
            // alignItems="center"
            // justifyContent="center"
            // style={{marginBottom:"3em"}}
            // style={{padding:"2em"}}
        >
    {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
    {/*    <InputLabel id="demo-simple-select-outlined-label">Min</InputLabel>*/}
    {/*    <Select*/}
    {/*        labelId="demo-simple-select-outlined-label"*/}
    {/*        id="demo-simple-select-outlined"*/}
    {/*        value={age}*/}
    {/*        onChange={handleChange}*/}
    {/*        label="Min"*/}
    {/*    >*/}
    {/*        {priceByHundreds.map((label) => (*/}
    {/*            <MenuItem value={label}>{getLabel(label)}</MenuItem>*/}

    {/*        ))}*/}

    {/*    </Select>*/}
    {/*</FormControl>*/}
            <Field name={"Min"} component={renderSelectMinField}>
                {priceByHundreds.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
            <Field name={"Max"} component={renderSelectMaxField}>
                {priceByHundreds.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
            {/*<FormControl variant="outlined" className={classes.formControl}>*/}
            {/*    <InputLabel id="demo-simple-select-outlined-label">Max</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="demo-simple-select-outlined-label"*/}
            {/*        id="demo-simple-select-outlined"*/}
            {/*        value={age}*/}
            {/*        onChange={handleChange}*/}
            {/*        label="Max"*/}
            {/*    >*/}
            {/*        {priceByHundreds.map((label) => (*/}
            {/*            <MenuItem value={label}>{getLabel(label)}</MenuItem>*/}

            {/*        ))}*/}

            {/*    </Select>*/}
            {/*</FormControl>*/}
        </Grid>
    )
}
export default OutlineSelect;