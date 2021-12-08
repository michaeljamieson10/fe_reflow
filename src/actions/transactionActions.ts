import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const GET_TRANSACTION = 'GET_TRANSACTION';
export const GET_TRANSACTION_SUCCESS = 'GET_TRANSACTION_SUCCESS';
export const GET_TRANSACTION_FAILURE = 'GET_TRANSACTION_FAILURE';

const transaction = (transactionId, signal: any) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_TRANSACTION, GET_TRANSACTION_SUCCESS, GET_TRANSACTION_FAILURE],
            endPoint: `transaction/${transactionId}`,
            schema: Schemas.TRANSACTION,
            signal: signal
        }
    }
};

export const getTransaction = (clientId, signal?: any) => (dispatch, getState) => {
    return dispatch(transaction(clientId, signal));
};

export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';

const transactionCreator = (firstName,lastName, agentId) => {

    let transaction = {
        // "transaction":
        //     {
            firstName,
            lastName,
            agent:{id: agentId}
        // }
    }
    console.log("inside transactionCreator", transaction)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_TRANSACTION, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAILURE],
            endPoint: 'transaction',
            schema: Schemas.TRANSACTION,
            body: transaction
        }
    };
};

export const createTransaction = (firstName,lastName, agentId) => (dispatch, getState) => {
    return dispatch(transactionCreator(firstName,lastName, agentId));
// .then(() => dispatch(getTransaction(transactionId))
};



