import React, {useEffect, useState} from "react";
import {HomeCriteria, State, Transaction} from "../store/reduxStoreState";
import {createHomeCriteria} from "../actions/homeCriteriaActions";
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
        dispatch<any>(createHomeCriteria(values,transactionId));
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
                <HomeCriteriaForm onSubmit={(values) => handleNewHome(values)}/>
            </Card>
        </Grid>
    )

}

export default HomeCriteriaScreen;