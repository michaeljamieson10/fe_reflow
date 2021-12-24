import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_CLOSING = 'CREATE_CLOSING';
export const CREATE_CLOSING_SUCCESS = 'CREATE_CLOSING_SUCCESS';
export const CREATE_CLOSING_FAILURE = 'CREATE_CLOSING_FAILURE';

const closingCreator = (values, transactionId) => {

    let createClosing = {
        transaction: {id: transactionId},
        closingStatusType: values.commitmentStatus,
    }
    console.log("inside closing", createClosing)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_CLOSING, CREATE_CLOSING_SUCCESS, CREATE_CLOSING_FAILURE],
            endPoint: 'closing',
            schema: Schemas.CLOSING,
            body: createClosing
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createClosing = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(closingCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
