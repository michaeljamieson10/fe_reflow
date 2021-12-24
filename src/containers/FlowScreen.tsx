import { useEffect, useState} from 'react';
import * as React from 'react';
import { RouteComponentProps} from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector} from 'react-redux';
import VerticalNonLinearStepper from "../components/ui/VerticalNonLinearStepper";

import {Card, Grid, Typography, Divider} from '@material-ui/core';

import {getTransaction} from '../actions/transactionActions'
import {getLoggedInUser} from '../selectors/userSelectors';

import {State, Transaction, User} from "../store/reduxStoreState";
import {useIsMount} from "../hooks/useIsMount";
import {getTransactionById} from "../selectors/transactionSelectors";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";

interface FlowScreenProps {
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
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactionById, shallowEqual);
    const isMount = useIsMount();
    const dispatch = useDispatch();
    const loggedInUser = useSelector<State, User>(getLoggedInUser);



    useEffect(() => {
            dispatch<any>(getTransaction(transactionId)).then(
                () => setIsLoading(false))
    }, []);

    useEffect(()=>{
        if(!isMount){
            setIsTransactionsComplete(transactions[0].transactionsComplete);
        }
    },[isLoading]);

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

