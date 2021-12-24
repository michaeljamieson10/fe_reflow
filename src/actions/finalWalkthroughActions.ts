import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_FINAL_WALKTHROUGH = 'CREATE_FINAL_WALKTHROUGH';
export const CREATE_FINAL_WALKTHROUGH_SUCCESS = 'CREATE_FINAL_WALKTHROUGH_SUCCESS';
export const CREATE_FINAL_WALKTHROUGH_FAILURE = 'CREATE_FINAL_WALKTHROUGH_FAILURE';

const finalWalkthroughCreator = (values, transactionId) => {

    let finalWalkthrough = {
        transaction: {id: transactionId},
        finalWalkthroughStatusType: values.commitmentStatus,
    }
    console.log("inside finalWalkthrough", finalWalkthrough)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_FINAL_WALKTHROUGH, CREATE_FINAL_WALKTHROUGH_SUCCESS, CREATE_FINAL_WALKTHROUGH_FAILURE],
            endPoint: 'final_walkthrough',
            schema: Schemas.FINAL_WALKTHROUGH,
            body: finalWalkthrough
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createFinalWalkthrough = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(finalWalkthroughCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
