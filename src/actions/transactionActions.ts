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
            // endPoint: `transaction/${transactionId}`,
            endPoint: `transaction/${transactionId}/flows`,
            schema: Schemas.TRANSACTION,
            signal: signal
        }
    }
};

export const getTransaction = (transactionId, signal?: any) => (dispatch, getState) => {
    return dispatch(transaction(transactionId, signal));
};


export const CREATE_TRANSACTION = 'CREATE_TRANSACTION';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILURE = 'CREATE_TRANSACTION_FAILURE';

const transactionCreator = (firstName,lastName) => {

    let transaction = {
        // "transaction":
        //     {
            firstName,
            lastName
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

export const createTransaction = (firstName,lastName) => (dispatch, getState) => {
    return dispatch(transactionCreator(firstName,lastName));
// .then(() => dispatch(getTransaction(transactionId))
};


export const GET_ALL_TRANSACTION = 'GET_ALL_TRANSACTION';
export const GET_ALL_TRANSACTION_SUCCESS = 'GET_ALL_TRANSACTION_SUCCESS';
export const GET_ALL_TRANSACTION_FAILURE = 'GET_ALL_TRANSACTION_FAILURE';

const allTransactionsGetter = (agentId) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_SUCCESS, GET_ALL_TRANSACTION_FAILURE],
            endPoint: 'transaction/list',
            schema: Schemas.TRANSACTION_ARRAY
            // queryParamsMap: { agent_id: agentId }
        }
    }
};

export const getAllTransactions = (agentId) => (dispatch, getState) => {
    return dispatch(allTransactionsGetter(agentId));
};



