import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_CLEAR_TO_CLOSE = 'CREATE_CLEAR_TO_CLOSE';
export const CREATE_CLEAR_TO_CLOSE_SUCCESS = 'CREATE_CLEAR_TO_CLOSE_SUCCESS';
export const CREATE_CLEAR_TO_CLOSE_FAILURE = 'CREATE_CLEAR_TO_CLOSE_FAILURE';

const clearToCloseCreator = (values, transactionId) => {

    let clearToClose = {
        transaction: {id: transactionId},
        clearToCloseStatusType: values.commitmentStatus,
    }
    console.log("inside contractsSigned", clearToClose)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_CLEAR_TO_CLOSE, CREATE_CLEAR_TO_CLOSE_SUCCESS, CREATE_CLEAR_TO_CLOSE_FAILURE],
            endPoint: 'clear_to_close',
            schema: Schemas.CLEAR_TO_CLOSE,
            body: clearToClose
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createClearToClose = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(clearToCloseCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
