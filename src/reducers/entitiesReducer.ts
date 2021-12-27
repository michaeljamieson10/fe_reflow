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
import {
    CREATE_HOME_INSPECTION,
    CREATE_HOME_INSPECTION_FAILURE,
    CREATE_HOME_INSPECTION_SUCCESS
} from "../actions/homeInspectionActions";
import {
    CREATE_CONTRACTS_SIGNED,
    CREATE_CONTRACTS_SIGNED_FAILURE,
    CREATE_CONTRACTS_SIGNED_SUCCESS
} from "../actions/contractsSignedActions";
import {CREATE_APPRAISAL, CREATE_APPRAISAL_FAILURE, CREATE_APPRAISAL_SUCCESS} from "../actions/appraisalActions";
import {
    CREATE_LOAN_COMMITMENT,
    CREATE_LOAN_COMMITMENT_FAILURE,
    CREATE_LOAN_COMMITMENT_SUCCESS
} from "../actions/loanCommitmentActions";

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
        case GET_CLIENT:break;
        case GET_CLIENT_SUCCESS:break;
        case GET_CLIENT_FAILURE:break;
        case CREATE_CLIENT:break;
        case CREATE_CLIENT_SUCCESS:break;
        case CREATE_CLIENT_FAILURE:break;
        case CREATE_TRANSACTION:break;
        case CREATE_TRANSACTION_SUCCESS:break;
        case CREATE_TRANSACTION_FAILURE:break;
        case GET_AGENT_BY_TOKEN:break;
        case GET_AGENT_FAILURE_BY_TOKEN:break;
        case GET_AGENT_SUCCESS_BY_TOKEN:
            // state = {...state, agent: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_ALL_TRANSACTION:break;
        case GET_ALL_TRANSACTION_SUCCESS:
            state = {...state, transactions: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_ALL_TRANSACTION_FAILURE:break;
        case GET_TRANSACTION:break;
        case GET_TRANSACTION_SUCCESS:
            state = {...state, transactions: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        case GET_TRANSACTION_FAILURE:break;
        case CREATE_HOME_CRITERIA:break;
        case CREATE_HOME_CRITERIA_SUCCESS:break;
        case CREATE_HOME_CRITERIA_FAILURE:break;
        case GET_TRANSACTIONS_BY_TOKEN: break;
        case GET_TRANSACTIONS_FAILURE_BY_TOKEN: break;
        case GET_TRANSACTIONS_SUCCESS_BY_TOKEN:
            // state = {...state, transactions: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
            // return appendAndUpdateEntitiesFromResponseWithArrayOverwrite(state, responseEntities);
        case CREATE_HOME_INSPECTION:break;
        case CREATE_HOME_INSPECTION_SUCCESS:break;
        case CREATE_HOME_INSPECTION_FAILURE:break;
        case CREATE_CONTRACTS_SIGNED:break;
        case CREATE_CONTRACTS_SIGNED_SUCCESS:break;
        case CREATE_CONTRACTS_SIGNED_FAILURE:break;
        case CREATE_APPRAISAL:break;
        case CREATE_APPRAISAL_SUCCESS:break;
        case CREATE_APPRAISAL_FAILURE:break;
        case CREATE_LOAN_COMMITMENT:break;
        case CREATE_LOAN_COMMITMENT_SUCCESS:break;
        case CREATE_LOAN_COMMITMENT_FAILURE:break;

        default:
            return state;
    }
}
