import React, {useEffect, useState} from "react";
import {PreApproval, State, Transaction} from "../store/reduxStoreState";

import {
    Card,
    Grid
} from "@material-ui/core";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";
import {RouteComponentProps} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getTransactionById, getTransactions} from "../selectors/transactionSelectors";
import {getTransaction} from "../actions/transactionActions";
import {useIsMount} from "../hooks/useIsMount";
import AcceptedOfferForm from "./AcceptedOfferForm";
import {createAcceptedOffer} from "../actions/acceptedOfferActions";

interface AcceptedOfferProps {
    preApproval: PreApproval;
}


const AcceptedOfferScreen: React.FC<AcceptedOfferProps & RouteComponentProps> = props => {
    const {match} = props;
    const transactionId = match.params['transaction_id'];
    const isMount = useIsMount();

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [transactionsComplete, setIsTransactionsComplete] = useState(0);
    const {
        preApproval
    } = props;

    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactionById, shallowEqual);

    useEffect(() => {
        dispatch<any>(getTransaction(transactionId)).then(() => setIsLoading(false));
    }, []);

    useEffect(()=>{
        if(!isMount){
            setIsTransactionsComplete(transactions[0].transactionsComplete);
        }
    },[isLoading]);

    const handleSubmitParent = values =>{
        console.log("we made it", values,"tridright",transactionId)
        dispatch<any>(createAcceptedOffer(values,transactionId));
    }

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
                <AcceptedOfferForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

export default AcceptedOfferScreen;