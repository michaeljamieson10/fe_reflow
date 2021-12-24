import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_LOAN_COMMITMENT = 'CREATE_LOAN_COMMITMENT';
export const CREATE_LOAN_COMMITMENT_SUCCESS = 'CREATE_LOAN_COMMITMENT_SUCCESS';
export const CREATE_LOAN_COMMITMENT_FAILURE = 'CREATE_LOAN_COMMITMENT_FAILURE';

const loanCommitmentCreator = (values, transactionId) => {

    let loanCommitment = {
        transaction: {id: transactionId},
        commitmentStatus: values.commitmentStatus,
    }
    console.log("inside contractsSigned", loanCommitment)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_LOAN_COMMITMENT, CREATE_LOAN_COMMITMENT_SUCCESS, CREATE_LOAN_COMMITMENT_FAILURE],
            endPoint: 'loan_commitment',
            schema: Schemas.LOAN_COMMITMENT,
            body: loanCommitment
        }
    };
};
function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum;
}
export const createLoanCommitment = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling acceptedOfferCreator inside of createAcceptedOffer");
    return dispatch(loanCommitmentCreator(values, transactionId));
// .then(() => dispatch(getTransaction(transactionId))
};
