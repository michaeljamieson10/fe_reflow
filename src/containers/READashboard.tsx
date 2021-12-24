import * as React from 'react';
import {
    Button,
    Grid,
    Typography,
    Divider, Card, useMediaQuery
} from '@material-ui/core';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import { State, Transaction, User} from "../store/reduxStoreState";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTransactionByToken} from "../actions/transactionActions";
import {getTransactions} from "../selectors/transactionSelectors";

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
    getAgent:(agentId: number) => any,
    loggedInUser: User;
}
const READashBoard = (props: Props) => {
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactions, shallowEqual);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        dispatch<any>(getTransactionByToken())//getAgentHere
            .then(() => setIsLoading(false));
    }, []);

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
                <Button component={Link}  to="/rea/create_transaction" color="primary" variant="contained"
                        style={{marginBottom: "0.5em"}}
                >
                    + Invite
                </Button>
            </Grid>
                <Divider style={{marginBottom:"2em"}} />

            <Grid>
                <> <Typography align={"center"}variant={"h6"}>
                    Invite a home buyer </Typography>
                </>
                <Typography align={"center"}variant={"h6"}>
                    to get started
                </Typography>

                {isLoading? 'loading': Object.entries(transactions).map(([key, value]) =>
                    <div>{value.firstName} {value.lastName} {value.id}
                    <Button
                    component={Link}  to={`/dashboard/transaction/${value.id}`} color="primary" variant="contained"
                >View</Button></div> )}

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


export default READashBoard;