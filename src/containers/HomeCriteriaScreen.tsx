import React, {useEffect, useState} from "react";
import {HomeCriteria, State, Transaction} from "../store/reduxStoreState";
import {
    CREATE_HOME_CRITERIA_FAILURE,
    CREATE_HOME_CRITERIA_SUCCESS,
    createHomeCriteria
} from "../actions/homeCriteriaActions";
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
import HomeCriteriaForm from "./HomeCriteriaForm";
import SuccessErrorSnackBar from "../components/SuccessErrorSnackBar";
import {CREATE_CONTRACTS_SIGNED_FAILURE, CREATE_CONTRACTS_SIGNED_SUCCESS} from "../actions/contractsSignedActions";

interface HomeCriteriaScreenProps {
    homeCriteria: HomeCriteria;
}
function getLabel(initialFilterDiscountTypeState: string) {
    switch (initialFilterDiscountTypeState) {
        case 'house':
            return 'House';
        case 'multifamily':
            return 'Multifamily';
        case 'condocoop':
            return 'Condocoop';
        case 'townhome':
            return 'Townhome';
        case 'basement':
            return 'Basement';
        case 'centralair':
            return 'Central Air';
        case 'pool':
            return 'Pool';
        case 'waterfront':
            return 'Waterfront';
    }
}
const HomeCriteriaScreen: React.FC<HomeCriteriaScreenProps & RouteComponentProps> = props => {
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
        homeCriteria
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


    const handleNewHome = values =>{
        dispatch<any>(createHomeCriteria(values,transactionId)).then((response) => {
            if (response.type === CREATE_HOME_CRITERIA_SUCCESS) {
                setShowSnackbarSuccessAlert(true);
                setSnackbarSuccessAlertText('Created!');
            }
            if (response.type === CREATE_HOME_CRITERIA_FAILURE) {
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
                <HomeCriteriaForm onSubmit={(values) => handleNewHome(values)}/>
            </Card>
        </Grid>
    )

}

export default HomeCriteriaScreen;