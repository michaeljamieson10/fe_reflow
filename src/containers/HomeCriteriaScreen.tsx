import React, {useState} from "react";
import {HomeCriteria, HomeCriteriaStatusType, State} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent} from "../actions/agentActions";
import {connect} from "react-redux";
import {createStyles, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import {Theme} from "@material-ui/core/styles";
import OutlineSelect from "../components/ui/homecriteria/OutlineSelect";
import OutlineSelectBedAndBath from "../components/ui/homecriteria/OutlineSelectBedAndBath";

interface HomeCriteriaScreenProps {
    // priceByHundreds: string[];
    homeCriteria: HomeCriteria;
    homeCriteriaStatustype: HomeCriteriaStatusType;
}
const HomeCriteriaScreen: React.FC<HomeCriteriaScreenProps> = props => {

    const {
        // priceByHundreds,
        homeCriteria,
        homeCriteriaStatustype
    } = props;
    // const [homeCriteriaStatusType, setHomeCriteriaStatusType] = useState(homeCriteria.homeCriteriaStatusType);
    //'one_hundred' 'two_hundred' 'three_hundred' | 'four_hundred' | 'five_hundred'| 'six_hundred' | 'seven_hundred'| 'eight_hundred' | 'nine_hundred'| 'one_million';
    let priceByHundreds = ['one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million'];
    // priceByHundreds.push('one_hundred','two_hundred','three_hundred','four_hundred','five_hundred', 'six_hundred','seven_hundred', 'eight_hundred','nine_hundred','one_million');
    console.log(priceByHundreds,"EL PRECIO");
    // const [homeCriteriaStatusTypse, setHomeCriteriaStatusType] = useState<homeCriteriaStatusStype>("");
    return(
        <>
        <OutlineSelect/>
        <OutlineSelectBedAndBath/>
        </>
    )

}


// export default React.memo(READashBoard);
// export default connect(mapStateToProps, mapDispatchToProps)(HomeCriteriaScreen) //should work without connect
export default HomeCriteriaScreen;