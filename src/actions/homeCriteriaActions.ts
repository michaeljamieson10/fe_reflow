import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const GET_HOME_CRITERIA = 'GET_HOME_CRITERIA';
export const GET_HOME_CRITERIA_SUCCESS = 'GET_HOME_CRITERIA_SUCCESS';
export const GET_HOME_CRITERIA_FAILURE = 'GET_HOME_CRITERIA_FAILURE';

//not checked
const homeCriteria = (homeCriteriaId, signal: any) => {

    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_HOME_CRITERIA, GET_HOME_CRITERIA_SUCCESS, GET_HOME_CRITERIA_FAILURE],
            endPoint: `home_criteria/${homeCriteriaId}`,
            schema: Schemas.HOME_CRITERIA,
            signal: signal
        }
    }
};

export const getHomeCriteria = (homeCriteriaId, signal?: any) => (dispatch, getState) => {
    return dispatch(homeCriteria(homeCriteriaId, signal));
};

export const CREATE_HOME_CRITERIA = 'CREATE_HOME_CRITERIA';
export const CREATE_HOME_CRITERIA_SUCCESS = 'CREATE_HOME_CRITERIA_SUCCESS';
export const CREATE_HOME_CRITERIA_FAILURE = 'CREATE_HOME_CRITERIA_FAILURE';

const homeCriteriaCreator = (transactionId) => {
    //    private int id;
    //     private Transaction transaction;
    //     private TransactionStatusType transactionStatusType;
    let homeCriteria = {
        transaction:
            {
            id: transactionId
            },
            homeCriteria:{
            }
    }
    console.log("inside homeCriteria creator", homeCriteria)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_HOME_CRITERIA, CREATE_HOME_CRITERIA_SUCCESS, CREATE_HOME_CRITERIA_FAILURE],
            endPoint: 'home_criteria',
            schema: Schemas.HOME_CRITERIA,
            body: homeCriteria
        }
    };
};

export const createHomeCriteria = (transactionId) => (dispatch, getState) => {
    return dispatch(homeCriteriaCreator(transactionId));
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



