import React, {useEffect, useState} from "react";
import {HomeCriteria, State, Transaction} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createHomeCriteria} from "../actions/homeCriteriaActions";
import {createAgent} from "../actions/agentActions";
import {
    Button,
    Card,
    Checkbox,
    createStyles,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select
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
import {getTransactions} from "../selectors/transactionSelectors";
import {getTransaction} from "../actions/transactionActions";

interface HomeCriteriaScreenProps {
    // priceByHundreds: string[];
    homeCriteria: HomeCriteria;
    createTransaction:(
        firstName: string,
        lastName: string
    ) => any;
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
    const initialFilterDiscountTypeState = {house: false, multifamily: false, condocoop: false, townhome: false, basement: false, centralair: false, pool: false, waterfront: false};
    const {match} = props;
    const transactionId = match.params['transaction_id'];
    const [filterDiscountTypeChecked, setFilterDiscountTypeChecked] = useState(initialFilterDiscountTypeState);
    const [filterDiscountType, setFilterDiscountType] = useState(initialFilterDiscountTypeState);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const {
        homeCriteria,
        createTransaction
    } = props;

    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactions, shallowEqual);
    console.log(transactions,"inside HCS");
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];

    // console.log(priceByHundreds,"EL PRECIO");
    // const [homeCriteriaStatusTypse, setHomeCriteriaStatusType] = useState<homeCriteriaStatusStype>("");
    useEffect(() => {
        // if(!isMount){
        dispatch<any>(getTransaction(transactionId)).then(() => setIsLoading(false));
        // }
    }, []);

    const handleSubmit = values => {
        const responseFunc = response => {
            if (!response.error) {

            } else {
            }
        };

        // createTransaction(values.firstName, values.lastName);
        createHomeCriteria(transactionId);

        history.push(`{/dashboard/transaction/${transactionId}`);

    };

    const [filterDiscountTypeRadioSelection, setFilterDiscountTypeRadioSelection] = useState<'lol' | 'pewpew'>('lol');
    const handleChangeCheckboxDiscountType = (evt) => {
        const selection = evt.target.value;
        const isChecked = evt.target.checked;

        console.log(evt.target,"inside");

        if (filterDiscountTypeRadioSelection === 'lol') setFilterDiscountTypeRadioSelection('pewpew');

        //update checked state for the checkbox that was just checked
        setFilterDiscountTypeChecked({...filterDiscountTypeChecked, [selection]: isChecked});
        //update state to filter by selected discount value
        setFilterDiscountType({...filterDiscountType, [selection]: isChecked});
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
            <FlowCurrentProgressCard transactionId={transactionId}  isLoading={isLoading} transactions={transactions}/>

            <Card className="card-with-form" style={{marginTop:"2em",padding:"2em", boxShadow: 'none' }}>
        <OutlineSelect/>
        <OutlineSelectBedAndBath/>
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.house} value={'house'} onChange={handleChangeCheckboxDiscountType} name='House' />}
                    label={'House'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.multifamily} value={'multifamily'} onChange={handleChangeCheckboxDiscountType} name='Multifamily' />}
                    label={'Multifamily'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.condocoop} value={'condocoop'} onChange={handleChangeCheckboxDiscountType} name='Condocoop' />}
                    label={'Condocoop'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.townhome} value={'townhome'} onChange={handleChangeCheckboxDiscountType} name='Townhome' />}
                    label={'Townhome'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.basement} value={'basement'} onChange={handleChangeCheckboxDiscountType} name='Basement' />}
                    label={'Basement'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.centralair} value={'centralair'} onChange={handleChangeCheckboxDiscountType} name='Central Air' />}
                    label={'Central Air'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.pool} value={'pool'} onChange={handleChangeCheckboxDiscountType} name='Pool' />}
                    label={'Pool'}
                />
                <FormControlLabel
                    control={<Checkbox checked={filterDiscountTypeChecked.waterfront} value={'waterfront'} onChange={handleChangeCheckboxDiscountType} name='Waterfront' />}
                    label={'Waterfront'}
                />
                <Button onClick={handleSubmit}>create HC</Button>
            </Card>
        </Grid>
    )

}


// export default React.memo(READashBoard);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen) //should work without connect
export default HomeCriteriaScreen;