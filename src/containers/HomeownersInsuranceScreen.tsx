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
import {
    CREATE_HOMEOWNERS_INSURANCE, CREATE_HOMEOWNERS_INSURANCE_FAILURE,
    CREATE_HOMEOWNERS_INSURANCE_SUCCESS,
    createHomeownersInsurance
} from "../actions/homeownersInsuranceActions";
import SuccessErrorSnackBar from "../components/SuccessErrorSnackBar";
import {CREATE_CONTRACTS_SIGNED_FAILURE, CREATE_CONTRACTS_SIGNED_SUCCESS} from "../actions/contractsSignedActions";

interface HomeownersInsuranceProps {
    preApproval: PreApproval;
}
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
const HomeownersInsuranceScreen: React.FC<HomeownersInsuranceProps & RouteComponentProps> = props => {
    const {match} = props;
    const transactionId = match.params['transaction_id'];
    const isMount = useIsMount();
    const [showSnackbarSuccessAlert, setShowSnackbarSuccessAlert] = useState<boolean>(false);
    const [snackbarSuccessAlertText, setSnackbarSuccessAlertText] = useState<string>("Success!");
    const [showSnackbarErrorAlert, setShowSnackbarErrorAlert] = useState<boolean>(false);
    const [snackbarErrorAlertTitle, setSnackbarErrorAlertTitle] = useState<string>('Error Encountered!')
    const [snackbarErrorAlertText, setSnackbarErrorAlertText] = useState<string>('Please Try Again');
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
        dispatch<any>(createHomeownersInsurance(values,transactionId)).then((response) => {
            if (response.type === CREATE_HOMEOWNERS_INSURANCE_SUCCESS) {
                setShowSnackbarSuccessAlert(true);
                setSnackbarSuccessAlertText('Created!');
            }
            if (response.type === CREATE_HOMEOWNERS_INSURANCE_FAILURE ) {
                setShowSnackbarErrorAlert(true);
                setSnackbarErrorAlertTitle('Failed to Update!');
                setSnackbarErrorAlertText(response.error || 'Please try again or contact support');
            }
        });
    }

    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <SuccessErrorSnackBar   showSnackbarSuccessAlert={showSnackbarSuccessAlert}
                                    setShowSnackbarSuccessAlert={setShowSnackbarSuccessAlert}
                                    showSnackbarErrorAlert={showSnackbarErrorAlert}
                                    setShowSnackbarErrorAlert={setShowSnackbarErrorAlert}
                                    snackbarErrorAlertText={snackbarErrorAlertText}
                                    snackbarErrorAlertTitle={snackbarErrorAlertTitle}
                                    snackbarSuccessAlertText={snackbarSuccessAlertText} />
            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
                <HomeownersInsuranceForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

export default HomeownersInsuranceScreen;