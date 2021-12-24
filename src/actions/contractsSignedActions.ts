import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const CREATE_CONTRACTS_SIGNED = 'CREATE_CONTRACTS_SIGNED';
export const CREATE_CONTRACTS_SIGNED_SUCCESS = 'CREATE_CONTRACTS_SIGNED_SUCCESS';
export const CREATE_CONTRACTS_SIGNED_FAILURE = 'CREATE_CONTRACTS_SIGNED_FAILURE';

const contractsSignedCreator = (values, transactionId) => {

    let contractsSigned = {
        transaction: {id: transactionId},
        buyerStatus: values.buyerStatus,
        sellerStatus: values.sellerStatus,
    }
    console.log("inside contractsSigned", contractsSigned)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_CONTRACTS_SIGNED, CREATE_CONTRACTS_SIGNED_SUCCESS, CREATE_CONTRACTS_SIGNED_FAILURE],
            endPoint: 'contracts_signed',
            schema: Schemas.CONTRACTS_SIGNED,
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
