import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    FormControlLabel,
    TextField,
    Button,
    Checkbox,
    Grid,
    InputAdornment,
    Typography,
    Divider, Card, useMediaQuery
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {State, User} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import {Link} from "react-router-dom";

const renderTextField = ({
                             input,
                         }) => (
    <TextField
        id="input-with-icon-textfield" variant="outlined"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <AlternateEmailIcon />
                </InputAdornment>
            ),
        }}
    />
)

const useStyles = makeStyles(theme => ({
    mainContainer: {

        marginTop: "2em",
        [theme.breakpoints.down("md")]: {
            marginTop: "1em"
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "0.5em",
        }
    }
}))
interface Props {
    createClient: (userId: number) => any,
    createAgent: (userId: number) => any,
    loggedInUser: User;
}

function READashBoard(props: Props) {
    // const { handleSubmit, enableButton } = props;
    const { createClient,loggedInUser,createAgent } = props;
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <React.Fragment>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{marginBottom:"3em"}}
            >
            <Card style={{padding:"2em",marginTop:"2em", marginBottom:"2em"}}>
                <Grid
                    container
                    direction="row"
                >
                    <Grid
                        item
                        style={{marginRight:"3em"}}
                    >
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            // style={{marginBottom:"3em"}}
                            >
                        <Typography variant={"subtitle2"}>Active Buyers</Typography>
                        <Typography variant={"h6"}>0</Typography>
                    </Grid>
                    </Grid>
                    <Grid
                        item
                    >
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            // style={{marginBottom:"3em"}}
                        >
                            <Typography variant={"subtitle2"}>Completed Transactions</Typography>
                            <Typography variant={"h6"}>0</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        <Card style={{padding:"2em"}}>
            <Grid container direction={"row"}>
                <Typography  variant={"subtitle2"} style={{marginRight: "10em"}} gutterBottom>Buyers</Typography>
                {/* onClick={handleSubmit} disabled={!enableButton}*/}
                <Button component={Link}  to="/rea/invite_buyer" color="primary" variant="contained"
                    // style={{
                    //     height: 45,
                    //     width: 100,}}
                        style={{marginBottom: "0.5em"}}
                >
                    + Invite
                </Button>
            </Grid>
                <Divider style={{marginBottom:"2em"}} />
                {/*<Grid container direction={"row"} style={{padding:"2em"}}>*/}
                {/*</Grid>*/}
            <Grid>
                <Typography align={"center"}variant={"h6"}>
                    Invite a home buyer </Typography>
                <Typography align={"center"}variant={"h6"}>
                    to get started
                </Typography>
            </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{marginTop: "1.5em"}}
                >

                </Grid>
            </Card>
            </Grid>
        </React.Fragment>
    );
};

const validate = values => {
    const errors:any = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    return errors;
};
//
// const asyncValidate = (values, dispatch, props, field ) => {
//     return props.checkIfEmailTaken(values["email"]).then(emailTaken => {
//         if(emailTaken) throw { email: 'Email is already taken' }
//     });
// };

// export default reduxForm<{}, SetUpAgentProfileFormProps>({
//     form: 'userSignUpForm',
//     validate
// })(SetUpAgentProfileForm);
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
export default connect(mapStateToProps, mapDispatchToProps)(READashBoard)