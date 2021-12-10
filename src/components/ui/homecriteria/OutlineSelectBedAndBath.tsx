import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    return (<>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Bed Units</InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Bed Units"
        >
            {unitsQuantity.map((label) => (
                <MenuItem value={label}>{getLabel(label)}</MenuItem>

            ))}

        </Select>
    </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Bath Units</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    label="Bath Units"
                >
                    {unitsQuantity.map((label) => (
                        <MenuItem value={label}>{getLabel(label)}</MenuItem>

                    ))}

                </Select>
            </FormControl>
        </>
    )
}
export default OutlineSelectBedAndBath;