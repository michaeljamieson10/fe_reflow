import React, {useEffect, useState} from "react";
import {PreApproval,HomeCriteria, State, Transaction} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createHomeCriteria} from "../actions/homeCriteriaActions";
import {createPreApproval} from "../actions/preApprovalActions";
import {
    Button,
    Card,
    Checkbox,
    createStyles, FilledInput,
    FormControl,
    FormControlLabel,
    Grid, InputAdornment,
    InputLabel,
    MenuItem,
    Select, Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";
import FlowCurrentProgressCard from "../components/ui/FlowCurrentProgressCard";
import {history} from "../index";
import {match} from "assert";
import {RouteComponentProps} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {getTransactionById, getTransactions} from "../selectors/transactionSelectors";
import {getTransaction} from "../actions/transactionActions";
import {useIsMount} from "../hooks/useIsMount";
import HomeCriteriaForm from "./HomeCriteriaForm";
import PreApprovalForm from "./PreApprovalForm";
import AcceptedOfferForm from "./AcceptedOfferForm";
import {createAcceptedOffer} from "../actions/acceptedOfferActions";
import HomeInspectionForm from "./HomeInspectionForm";
import {createHomeInspection} from "../actions/homeInspectionActions";
import ContractsSignedForm from "./ContractsSignedForm";
import {
    CREATE_CONTRACTS_SIGNED_FAILURE,
    CREATE_CONTRACTS_SIGNED_SUCCESS,
    createContractsSigned
} from "../actions/contractsSignedActions";
import SuccessErrorSnackBar from "../components/SuccessErrorSnackBar";
import {CREATE_CLEAR_TO_CLOSE_FAILURE, CREATE_CLEAR_TO_CLOSE_SUCCESS} from "../actions/clearToCloseActions";

interface ContractsSignedProps {
    // priceByHundreds: string[];
    preApproval: PreApproval;
    // createHomeCriteria:(
    //     transactionId: number
    //     // lastName: string
    // ) => any;
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
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
const ContractsSignedScreen: React.FC<ContractsSignedProps & RouteComponentProps> = props => {
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
        // createHomeCriteria
    } = props;

    // const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactions, shallowEqual);
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactionById, shallowEqual);

    useEffect(() => {
        // if(!isMount){
        dispatch<any>(getTransaction(transactionId)).then(() => setIsLoading(false))
        // }
    }, []);

    useEffect(()=>{
        if(!isMount){
            setIsTransactionsComplete(transactions[0].transactionsComplete);
        }
    },[isLoading]);

    const handleSubmitParent = values =>{
        // console.log(toTimestamp(`${values.date} ${values.time}`),"we made it", values,"<-- Values left transactid-->",transactionId)
        console.log(values,"here in parent")
        dispatch<any>(createContractsSigned(values,transactionId)).then((response) => {
            if (response.type === CREATE_CONTRACTS_SIGNED_SUCCESS) {
                setShowSnackbarSuccessAlert(true);
                setSnackbarSuccessAlertText('Created!');
            }
            if (response.type === CREATE_CONTRACTS_SIGNED_FAILURE ) {
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
            // style={{marginBottom:"3em"}}
            // style={{}}
        >
            <SuccessErrorSnackBar   showSnackbarSuccessAlert={showSnackbarSuccessAlert}
                                    setShowSnackbarSuccessAlert={setShowSnackbarSuccessAlert}
                                    showSnackbarErrorAlert={showSnackbarErrorAlert}
                                    setShowSnackbarErrorAlert={setShowSnackbarErrorAlert}
                                    snackbarErrorAlertText={snackbarErrorAlertText}
                                    snackbarErrorAlertTitle={snackbarErrorAlertTitle}
                                    snackbarSuccessAlertText={snackbarSuccessAlertText} />

            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>
            {/*<FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions}/>*/}

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
                {/*<HomeCriteriaForm onSubmit={(values) => handleNewHome(values)}/>*/}
                <ContractsSignedForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

// export default React.memo(READashBoard);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen) //should work without connect
export default ContractsSignedScreen;