import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_APPRAISAL = 'CREATE_APPRAISAL';
export const CREATE_APPRAISAL_SUCCESS = 'CREATE_APPRAISAL_SUCCESS';
export const CREATE_APPRAISAL_FAILURE = 'CREATE_APPRAISAL_FAILURE';

const appraisalCreator = (values, transactionId) => {

    let appraisal = {
        transaction: {id: transactionId},
        appraisedValue: parseInt(values.appraisedValue),
        appraisedDateTime: toTimestamp(`${values.date} ${values.time}`)
    }
    console.log("inside appraisal", appraisal)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_APPRAISAL, CREATE_APPRAISAL_SUCCESS, CREATE_APPRAISAL_FAILURE],
            endPoint: 'appraisal',
            schema: Schemas.APPRAISAL,
            body: appraisal
        }
    };
};

function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    console.log(datum);
    return datum;
}

export const createAppraisal = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(appraisalCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
