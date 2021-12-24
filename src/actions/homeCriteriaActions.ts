import { CALL_API, Schemas } from '../middleware/api';

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

const homeCriteriaCreator = (values,transactionId) => {
    let homeCriteria = {
        transaction: {id: transactionId},
        minPrice: values.minPrice,
        maxPrice: values.maxPrice,
        amountOfBed: values.amountOfBed,
        amountOfBaths: values.amountOfBaths,
        house: values.house,
        multifamily: values.multifamily,
        condocoop: values.condocoop,
        townhome: values.townhome,
        basement: values.basement,
        centralair: values.centralair,
        pool: values.pool,
        waterfront: values.waterfront,
        cityOne: values.cityOne,
        cityTwo: values.cityTwo,
        cityThree: values.cityThree,
        cityFour: values.cityFour,
        cityFive: values.cityFive
    }
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

export const createHomeCriteria = (values,transactionId) => (dispatch, getState) => {
    console.log(values, transactionId,"lolol");
    return dispatch(homeCriteriaCreator(values,transactionId));
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
        }
    }
};

export const getAllTransactions = (agentId) => (dispatch, getState) => {
    return dispatch(allTransactionsGetter(agentId));
};



