import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';




export const CREATE_HOME_INSPECTION = 'CREATE_HOME_INSPECTION';
export const CREATE_HOME_INSPECTION_SUCCESS = 'CREATE_HOME_INSPECTION_SUCCESS';
export const CREATE_HOME_INSPECTION_FAILURE = 'CREATE_HOME_INSPECTION_FAILURE';

const contractsSignedCreator = (values, transactionId) => {

    let contractsSigned = {
        transaction: {id: transactionId},
        homeInspectionStatusType: values.homeInspectionStatusType,
        scheduledDateTimeMilli: toTimestamp(`${values.date} ${values.time}`)
    }
    console.log("inside contractsSigned", contractsSigned)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_HOME_INSPECTION, CREATE_HOME_INSPECTION_SUCCESS, CREATE_HOME_INSPECTION_FAILURE],
            endPoint: 'home_inspection',
            schema: Schemas.HOME_INSPECTION,
            body: contractsSigned
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createContractsSigned = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(contractsSignedCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
