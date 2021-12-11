import React, {useState} from "react";
import {HomeCriteria, HomeCriteriaStatusType, State} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import {connect} from "react-redux";
import {
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

interface HomeCriteriaScreenProps {
    // priceByHundreds: string[];
    homeCriteria: HomeCriteria;
    homeCriteriaStatustype: HomeCriteriaStatusType;
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
const HomeCriteriaScreen: React.FC<HomeCriteriaScreenProps> = props => {
    const initialFilterDiscountTypeState = {house: false, multifamily: false, condocoop: false, townhome: false, basement: false, centralair: false, pool: false, waterfront: false};
    const [filterDiscountTypeChecked, setFilterDiscountTypeChecked] = useState(initialFilterDiscountTypeState);
    const [filterDiscountType, setFilterDiscountType] = useState(initialFilterDiscountTypeState);
    const {
        // priceByHundreds,
        homeCriteria,
        homeCriteriaStatustype
    } = props;
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];

    // console.log(priceByHundreds,"EL PRECIO");
    // const [homeCriteriaStatusTypse, setHomeCriteriaStatusType] = useState<homeCriteriaStatusStype>("");
    const [filterDiscountTypeRadioSelection, setFilterDiscountTypeRadioSelection] = useState<'all' | 'some'>('all');
    const handleChangeCheckboxDiscountType = (evt) => {
        const selection = evt.target.value;
        const isChecked = evt.target.checked;

        console.log(evt.target,"inside");

        if (filterDiscountTypeRadioSelection === 'all') setFilterDiscountTypeRadioSelection('some');

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
            <FlowCurrentProgressCard/>

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
            </Card>
        </Grid>
    )

}


// export default React.memo(READashBoard);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen) //should work without connect
export default HomeCriteriaScreen;