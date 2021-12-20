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
                name: 'Min',
                id: 'min'
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
                name: 'bath',
                id: 'bath'
            }}
        >
            {children}
        </Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
)
    const OutlineSelectBedAndBath: React.FC = props => {
// export default function OutlineSelect() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    // let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];
    let unitsQuantity = ['one','two','three','four','five'];
    // const {priceByHundreds} = props;

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };
    return (
        <>
        <Grid
            item
        >
    {/*    <FormControl variant="outlined" className={classes.formControl}>*/}
    {/*    <InputLabel id="demo-simple-select-outlined-label">Bed Units</InputLabel>*/}
    {/*    <Select*/}
    {/*        labelId="demo-simple-select-outlined-label"*/}
    {/*        id="demo-simple-select-outlined"*/}
    {/*        value={age}*/}
    {/*        onChange={handleChange}*/}
    {/*        label="Bed Units"*/}
    {/*    >*/}
    {/*        {unitsQuantity.map((label) => (*/}
    {/*            <MenuItem value={label}>{getLabel(label)}</MenuItem>*/}

    {/*        ))}*/}
    {/*    </Select>*/}
    {/*</FormControl>*/}
            <Field name={"Bath"} component={renderSelectBathField}>
                {/*{priceByHundreds.map((label) => (*/}
                {/*    <option value={label}>{getLabel(label)}</option>*/}
                {/*))}*/}
                {unitsQuantity.map((label) => (
                    <option value={label}>{getLabel(label)}</option>
                ))}
            </Field>
    </Grid>
            <Grid item>
            {/*<FormControl variant="outlined" className={classes.formControl}>*/}
            {/*    <InputLabel id="demo-simple-select-outlined-label">Bath Units</InputLabel>*/}
            {/*    <Select*/}
            {/*        labelId="demo-simple-select-outlined-label"*/}
            {/*        id="demo-simple-select-outlined"*/}
            {/*        value={age}*/}
            {/*        onChange={handleChange}*/}
            {/*        label="Bath Units"*/}
            {/*    >*/}
            {/*        {unitsQuantity.map((label) => (*/}
            {/*            <MenuItem value={label}>{getLabel(label)}</MenuItem>*/}

            {/*        ))}*/}

            {/*    </Select>*/}
            {/*</FormControl>*/}
                <Field name={"Bed"} component={renderSelectBedField}>
                    {/*{priceByHundreds.map((label) => (*/}
                    {/*    <option value={label}>{getLabel(label)}</option>*/}
                    {/*))}*/}
                            {unitsQuantity.map((label) => (
                                <option value={label}>{getLabel(label)}</option>
                            ))}
                </Field>
        </Grid>
    </>
    )
}
export default OutlineSelectBedAndBath;