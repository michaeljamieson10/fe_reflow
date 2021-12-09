import React from "react";
import {State} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import {connect} from "react-redux";
import {createStyles, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";

interface HomeCriteriaScreenProps {
    // createTransaction:(
    //     firstName: string,
    //     lastName: string
    // ) => any;

}
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
const HomeCriteriaScreen: React.FC<{HomeCriteriaScreenProps}> = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState('');

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };


    return( <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Age"
        >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
        </Select>
    </FormControl>)
}
const mapStateToProps = (state: State) => {
    return {
        loggedInUser: getLoggedInUser(state)
    }
};

const mapDispatchToProps = {
    createClient,
    createAgent

}

// export default React.memo(READashBoard);
export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen)