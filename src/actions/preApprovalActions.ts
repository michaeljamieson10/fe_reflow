import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';


export const GET_TRANSACTIONS_BY_TOKEN = 'GET_TRANSACTIONS_BY_TOKEN';
export const GET_TRANSACTIONS_SUCCESS_BY_TOKEN = 'GET_TRANSACTIONS_SUCCESS_BY_TOKEN';
export const GET_TRANSACTIONS_FAILURE_BY_TOKEN = 'GET_TRANSACTIONS_FAILURE_BY_TOKEN';

const transactionsByToken = (signal: any) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_TRANSACTIONS_BY_TOKEN, GET_TRANSACTIONS_SUCCESS_BY_TOKEN, GET_TRANSACTIONS_FAILURE_BY_TOKEN],
            endPoint: `transaction`,
            schema: Schemas.TRANSACTION_ARRAY,
            signal: signal
        }
    }
};

export const getTransactionByToken = (signal?: any) => (dispatch, getState) => {
    return dispatch(transactionsByToken(signal));
};

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


export const CREATE_PREAPPROVAL = 'CREATE_PREAPPROVAL';
export const CREATE_PREAPPROVAL_SUCCESS = 'CREATE_PREAPPROVAL_SUCCESS';
export const CREATE_PREAPPROVAL_FAILURE = 'CREATE_PREAPPROVAL_FAILURE';

const preApprovalCreator = (values, transactionId) => {

    let preApproval = {
        transaction: {id: transactionId},
        maxPurchasePrice: values.maxPurchasePrice,
        maxPropertyTaxes: values.maxPropertyTaxes,
        maxLoanAmount: values.maxLoanAmount,
        downPayment: values.downPayment,
        loanType: values.loanType
    }
    console.log("inside preApproval", preApproval)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_PREAPPROVAL, CREATE_PREAPPROVAL_SUCCESS, CREATE_PREAPPROVAL_FAILURE],
            endPoint: 'pre_approval',
            schema: Schemas.PRE_APPROVAL,
            body: preApproval
        }
    };
};

export const createPreApproval = (values, transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"prior to calling preApprovalCreator inside of createPreApproval");
    return dispatch(preApprovalCreator(values, transactionId));
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



