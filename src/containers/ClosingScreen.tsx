import React, {useEffect, useState} from "react";
import {PreApproval, State, Transaction} from "../store/reduxStoreState";
import {
    Card,
    Grid,
} from "@material-ui/core";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";
import {RouteComponentProps} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getTransactionById} from "../selectors/transactionSelectors";
import {getTransaction} from "../actions/transactionActions";
import {useIsMount} from "../hooks/useIsMount";
import HomeInspectionForm from "./HomeInspectionForm";
import {createHomeInspection} from "../actions/homeInspectionActions";
import {createLoanCommitment} from "../actions/loanCommitmentActions";
import LoanCommitmentForm from "./LoanCommitmentForm";
import HomeownersInsuranceForm from "./HomeownersInsuranceForm";
import {createHomeownersInsurance} from "../actions/homeownersInsuranceActions";
import ClearToCloseForm from "./ClearToCloseForm";
import {createClearToClose} from "../actions/clearToCloseActions";
import FinalWalkthroughForm from "./FinalWalkthroughForm";
import {createFinalWalkthrough} from "../actions/finalWalkthroughActions";
import ClosingForm from "./ClosingForm";
import {createClosing} from "../actions/closingActions";

interface ClosingProps {
    preApproval: PreApproval;
}
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
const ClosingScreen: React.FC<ClosingProps & RouteComponentProps> = props => {
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
        // console.log(toTimestamp(`${values.date} ${values.time}`),"we made it", values,"<-- Values left transactid-->",transactionId)
        console.log(values,'handlesubmitparent')
        dispatch<any>(createClosing(values,transactionId));
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
                <ClosingForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

export default ClosingScreen;