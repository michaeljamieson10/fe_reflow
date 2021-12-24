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

interface acceptedOfferProps {
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
const HomeInspectionScreen: React.FC<acceptedOfferProps & RouteComponentProps> = props => {
    const {match} = props;
    const transactionId = match.params['transaction_id'];
    const isMount = useIsMount();

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
        dispatch<any>(getTransaction(transactionId)).then(() => setIsLoading(false));
        // }
    }, []);

    useEffect(()=>{
        if(!isMount){
            setIsTransactionsComplete(transactions[0].transactionsComplete);
        }
    },[isLoading]);

    const handleSubmitParent = values =>{
        // alert(toTimestamp('02/13/2009 23:31:30'));
        console.log(toTimestamp(`${values.date} ${values.time}`),"we made it", values,"<-- Values left transactid-->",transactionId)
        dispatch<any>(createHomeInspection(values,transactionId));
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
            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions} transactionsComplete={transactionsComplete}/>
            {/*<FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions}/>*/}

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
                {/*<HomeCriteriaForm onSubmit={(values) => handleNewHome(values)}/>*/}
                <HomeInspectionForm onSubmit={(values) => handleSubmitParent(values)}/>
            </Card>
        </Grid>
    )

}

// export default React.memo(READashBoard);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen) //should work without connect
export default HomeInspectionScreen;