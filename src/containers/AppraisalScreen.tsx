import React, {useEffect, useState} from "react";
import {PreApproval, State, Transaction} from "../store/reduxStoreState";
import {
    Card,
    Grid, Snackbar,
} from "@material-ui/core";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";
import {RouteComponentProps} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getTransactionById} from "../selectors/transactionSelectors";
import {getTransaction} from "../actions/transactionActions";
import {useIsMount} from "../hooks/useIsMount";
import HomeInspectionForm from "./HomeInspectionForm";
import {createHomeInspection} from "../actions/homeInspectionActions";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Alert, AlertTitle } from "@material-ui/lab";
import {
    CREATE_APPRAISAL,
    CREATE_APPRAISAL_FAILURE,
    CREATE_APPRAISAL_SUCCESS,
    createAppraisal
} from "../actions/appraisalActions";
import AcceptedOfferForm from "./AcceptedOfferForm";
import AppraisalForm from "./AppraisalForm";

interface HomeInspectionProps {
    preApproval: PreApproval;
}
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
const AppraisalScreen: React.FC<HomeInspectionProps & RouteComponentProps> = props => {
    const {match} = props;
    const transactionId = match.params['transaction_id'];
    const isMount = useIsMount();
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorModalTitle, setErrorModalTitle] = useState<string>('');
    const [errorModalText, setErrorModalText] = useState<string>('');

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
        // console.log(values);
        dispatch<any>(createAppraisal(values,transactionId)).then((response) => {
            if (response.type === CREATE_APPRAISAL_SUCCESS) {
                setShowSnackbarSuccessAlert(true);
                setSnackbarSuccessAlertText(' Updated!');
            }
            if (response.type === CREATE_APPRAISAL_FAILURE) {
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
            <Snackbar open={showSnackbarSuccessAlert} autoHideDuration={3000} onClose={() => setShowSnackbarSuccessAlert(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}} className={'snackbar-alert-container'}>
                <Alert severity={'success'} onClose={() => setShowSnackbarSuccessAlert(false)} className={'snackbar-alert'}>
                    <div className={'snackbar-alert-message'}>
                        {snackbarSuccessAlertText}
                    </div>
                </Alert>
            </Snackbar>

            {/*Error Snackbar Alert for creating*/}
            <Snackbar
                open={showSnackbarErrorAlert}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                className={'snackbar-alert-container'}
                onClose={(evt, reason) => {
                    //prevent alert from being closed when clicking outside of alert
                    if (reason === 'clickaway') return;
                    setShowSnackbarErrorAlert(false);
                }}
            >
                <Alert severity={'error'} onClose={() => setShowSnackbarErrorAlert(false)} className={'snackbar-alert'}>
                    <div className={'snackbar-alert-message'}>
                        <AlertTitle>{snackbarErrorAlertTitle}</AlertTitle>
                        {snackbarErrorAlertText}
                    </div>
                </Alert>
            </Snackbar>
            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
                <AppraisalForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

export default AppraisalScreen;