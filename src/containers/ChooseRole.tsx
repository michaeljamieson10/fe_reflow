import React from "react";
import { Grid, useMediaQuery, Typography, Button} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import{createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import { history } from "../index";
import {connect} from "react-redux";
import {State, User} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";

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

    function ChooseRole(props: Props) {
        const { createClient,loggedInUser,createAgent } = props;

    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    function handleCreateClient(userId: number) {
        createClient(userId);
        history.push(`/`);
    }
        function handleCreateAgent(userId: number) {
            createAgent(userId);
            history.push(`/`);
        }

    return(<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.mainContainer}
        style={{marginTop:"1.5em"}}
    >

        <Grid item>
            <Typography variant="h4" align="center" >
                Which best describes your role?
            </Typography>
        </Grid>
        <Grid item>
            <Grid item style={{marginTop:"2em",marginBottom:"2em"}}>
                <Button fullWidth variant={"outlined"} color={"primary"} onClick={() => handleCreateAgent(loggedInUser.id)}  >Real Estate Agent</Button>
            </Grid>
            <Grid item>
                <Button fullWidth variant={"outlined"} color={"primary"} onClick={() => handleCreateClient(loggedInUser.id)} >Home Buyer</Button>
            </Grid>
        </Grid>
        </Grid>)
}

const mapStateToProps = (state: State) => {
    // const users = getUsersByName(state);
    // return {
        // users,
        // loggedInUser: getLoggedInUser(state),
    // };
    return {
        loggedInUser: getLoggedInUser(state)
    }
};

const mapDispatchToProps = {
    createClient,
    createAgent
    // getAllUsers,
    // interceptAutocompleteSelected,
    // createDSP,
    // pressSpecialAdminButton
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseRole)