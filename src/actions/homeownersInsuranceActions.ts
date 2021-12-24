import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_HOMEOWNERS_INSURANCE = 'CREATE_HOMEOWNERS_INSURANCE';
export const CREATE_HOMEOWNERS_INSURANCE_SUCCESS = 'CREATE_HOMEOWNERS_INSURANCE_SUCCESS';
export const CREATE_HOMEOWNERS_INSURANCE_FAILURE = 'CREATE_HOMEOWNERS_INSURANCE_FAILURE';

const homeownersInsuranceCreator = (values, transactionId) => {

    let homeownersInsurance = {
        transaction: {id: transactionId},
        homeOwnersInsuranceStatusType: values.commitmentStatus,
    }
    console.log("inside contractsSigned", homeownersInsurance)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_HOMEOWNERS_INSURANCE, CREATE_HOMEOWNERS_INSURANCE_SUCCESS, CREATE_HOMEOWNERS_INSURANCE_FAILURE],
            endPoint: 'homeowners_insurance',
            schema: Schemas.HOMEOWNERS_INSURANCE,
            body: homeownersInsurance
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createHomeownersInsurance = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(homeownersInsuranceCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
