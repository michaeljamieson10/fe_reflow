import * as React from 'react';
import {
    Button,
    Grid,
    Typography,
    Divider, Card, useMediaQuery
} from '@material-ui/core';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {State, User} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import {Link} from "react-router-dom";
import ControlledOpenSelectQuantityOfBuyers from "./OpenSelectQuantityOfBuyers";
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

function REABuyerQuantity(props: Props) {
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

        <Card style={{marginTop:"2em",padding:"4em"}}>
                <Typography align={"center"}  variant={"h5"}  gutterBottom>Invite New Buyer</Typography>
                {/* onClick={handleSubmit} disabled={!enableButton}*/}

                <Divider style={{marginBottom:"2em"}} />
                {/*<Grid container direction={"row"} style={{padding:"2em"}}>*/}
                {/*</Grid>*/}
            <Grid>
                <Typography align={"center"}variant={"subtitle1"}>
                    How many buyers are
                </Typography>
                <Typography align={"center"}variant={"subtitle1"} gutterBottom>
                    involved in this transaction?
                </Typography>
                <Grid container
                      spacing={0}
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      >
                    <ControlledOpenSelectQuantityOfBuyers/>
                </Grid>
            </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{marginTop: "1.5em"}}
                >
                    <Button component={Link} to={{
                        pathname: "/rea/invite_buyers/",
                        state: "lol" // your data array of objects
                    }}
                            variant={"contained"} color={"primary"} style={{paddingLeft: "2.9em",paddingRight: "2.9em"}}> Next</Button>
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
const mapStateToProps = (state: State) => {
    return {
        loggedInUser: getLoggedInUser(state)
    }
};

const mapDispatchToProps = {
    createClient,
    createAgent

}


export default connect(mapStateToProps, mapDispatchToProps)(REABuyerQuantity)