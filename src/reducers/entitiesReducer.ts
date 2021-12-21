import {
    LOGGED_IN_USER_INFO_SUCCESS
} from '../actions/userActions';
import {
    GET_CLIENT,
    GET_CLIENT_SUCCESS,
    GET_CLIENT_FAILURE, CREATE_CLIENT, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILURE
} from '../actions/clientActions';
import {merge, mergeWith, isArray} from 'lodash';
import {
    CREATE_TRANSACTION, CREATE_TRANSACTION_FAILURE, CREATE_TRANSACTION_SUCCESS,
    GET_ALL_TRANSACTION, GET_ALL_TRANSACTION_FAILURE, GET_ALL_TRANSACTION_SUCCESS,
    GET_TRANSACTION, GET_TRANSACTION_FAILURE, GET_TRANSACTION_SUCCESS,
    GET_TRANSACTIONS_BY_TOKEN, GET_TRANSACTIONS_SUCCESS_BY_TOKEN, GET_TRANSACTIONS_FAILURE_BY_TOKEN
} from "../actions/transactionActions";
import {GET_AGENT_BY_TOKEN, GET_AGENT_FAILURE_BY_TOKEN, GET_AGENT_SUCCESS_BY_TOKEN} from "../actions/agentActions";
import {
    CREATE_HOME_CRITERIA,
    CREATE_HOME_CRITERIA_FAILURE,
    CREATE_HOME_CRITERIA_SUCCESS
} from "../actions/homeCriteriaActions";

export const initialState = {users: {}, agents:{}, transactions:{} };

const appendAndUpdateEntitiesFromResponse = (oldState, responseEntities, skipEntityTypes = []) => {
    let newState = merge({}, oldState);
    Object.keys(responseEntities).forEach(entityType => {
        if(skipEntityTypes.includes(entityType)) return;
        let oldStateTypeEntities = oldState[entityType];
        let entitiesInResponse = responseEntities[entityType];
        newState[entityType] = merge({}, oldStateTypeEntities, entitiesInResponse);
    });
    return newState;
};
const overwriteArray = (objValue, srcValue) => {
    if (isArray(srcValue)) return srcValue;
};
const appendAndUpdateEntitiesFromResponseWithArrayOverwrite = (
    oldState,
    responseEntities,
    skipEntityTypes: string[] = []
) => {
    let newState = merge({}, oldState);
    Object.keys(responseEntities).forEach((entityType) => {
        if (skipEntityTypes.includes(entityType)) return;
        let oldStateTypeEntities = oldState[entityType];
        let entitiesInResponse = responseEntities[entityType];
        newState[entityType] = mergeWith({}, oldStateTypeEntities, entitiesInResponse, overwriteArray);
    });
    return newState;
};

export default (state = initialState, action) => {
    let responseEntities = action.response ? action.response.entities : undefined;
    switch(action.type){
        case LOGGED_IN_USER_INFO_SUCCESS:
            state = {...state, users: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_CLIENT:
        case GET_CLIENT_SUCCESS:
        case GET_CLIENT_FAILURE:
        case CREATE_CLIENT:
        case CREATE_CLIENT_SUCCESS:
        case CREATE_CLIENT_FAILURE:
        case CREATE_TRANSACTION:
        case CREATE_TRANSACTION_SUCCESS:
        case CREATE_TRANSACTION_FAILURE:
        case GET_AGENT_BY_TOKEN:
        case GET_AGENT_FAILURE_BY_TOKEN:
        case GET_AGENT_SUCCESS_BY_TOKEN:
            // state = {...state, agent: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_ALL_TRANSACTION:
        case GET_ALL_TRANSACTION_SUCCESS:
            state = {...state, transactions: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_ALL_TRANSACTION_FAILURE:
        case GET_TRANSACTION:
        case GET_TRANSACTION_SUCCESS:
            state = {...state, transactions: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_TRANSACTION_FAILURE:
        case CREATE_HOME_CRITERIA:
        case CREATE_HOME_CRITERIA_SUCCESS:
        case CREATE_HOME_CRITERIA_FAILURE:
        case GET_TRANSACTIONS_BY_TOKEN:
        case GET_TRANSACTIONS_FAILURE_BY_TOKEN:
        case GET_TRANSACTIONS_SUCCESS_BY_TOKEN:
            state = {...state, transactions: {}};
            console.log(state,"STATE INSIDE ENTITY REDUCER");
            // return appendAndUpdateEntitiesFromResponse(state, responseEntities);
            return appendAndUpdateEntitiesFromResponseWithArrayOverwrite(state, responseEntities);

        default:
            return state;
    }
}
