import {Component, useEffect, useState} from 'react';
import * as React from 'react';
import {Link, RouteComponentProps, withRouter} from 'react-router-dom';
import {connect, shallowEqual, useDispatch, useSelector} from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import ReactDOM from 'react-dom';
import VerticalNonLinearStepper from "../components/ui/VerticalNonLinearStepper";

import {Card, CardHeader, CardContent, Grid, Typography, Divider, Button, Box} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import {createTransaction, getTransaction} from '../actions/transactionActions'
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import {getLoggedInUser, getLoggedInUserId} from '../selectors/userSelectors';
// import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';
import {history} from "../index";
import REABuyerEmailForm from "./REABuyerEmailForm";
import REACreateTransactionForm from "./REACreateTransactionForm";
import {State, Transaction, User} from "../store/reduxStoreState";
import {useIsMount} from "../hooks/useIsMount";
import {getTransactions} from "../selectors/transactionSelectors";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";


type newTransactionValues = {
    firstName: string;
    lastName: string;
    reaId: Number;
}
interface FlowScreenProps {
    // createTransaction:(
    //     firstName: string,
    //     lastName: string
    // ) => any;

}

const FlowScreen: React.FC<FlowScreenProps & RouteComponentProps > = props => {
    const {
        match
    } = props;
    const transactionId = match.params['transaction_id'];
    console.log(transactionId,"Im transaction id");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [transactionsComplete, setIsTransactionsComplete] = useState(0);
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactions, shallowEqual);
    const isMount = useIsMount();
    const dispatch = useDispatch();
    // const isManagerForCurrentDSPR: boolean = activeDSPRManagersForUser && activeDSPRManagersForUser.filter(dsprManager => dsprManager.dspr === parseInt(dsprId)).length > 0;
    // const loggedInUserId: number = getLoggedInUserId;
    const loggedInUser = useSelector<State, User>(getLoggedInUser);

    console.log(transactions,"WHATSGOINGON")
    const handleSubmit = values => {
        const responseFunc = response => {
            if (!response.error) {

            } else {
            }
        };

    };


    useEffect(() => {
        // if(!isMount){
            dispatch<any>(getTransaction(transactionId)).then(() => setIsLoading(false));
        // }
    }, []);
    // createTransaction(values.firstName, values.lastName);

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
                <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>
                <Card style={{padding:"0.9em"}}>
                    <Grid container justify="space-between" direction={"row"}>
                        <Typography  variant={"h6"} style={{marginRight: "10em"}} gutterBottom>Your Flow</Typography>
                        {isLoading? 'loading': console.log(transactions)}
                        <Typography  variant={"subtitle2"} style={{marginRight: "10em"}} gutterBottom>Click steps to view detail</Typography>
                    </Grid>
                    <Divider style={{marginBottom:"2em"}} />
                    {/*<Grid container direction={"row"} style={{padding:"2em"}}>*/}
                    {/*</Grid>*/}
                    <Grid>
                        <VerticalNonLinearStepper transactionId={transactionId}/>

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
}

export default FlowScreen;

