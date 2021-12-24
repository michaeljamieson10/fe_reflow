import {PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE, GET_APP_ACCESS_TOKEN_SUCCESS, LOGIN_SUCCESS,
    LOGIN_FAILURE, LOGOUT} from '../actions/oauthActions';
import {
    LOGGED_IN_USER_INFO_SUCCESS, CREATE_NEW_USER_FAILURE,
} from '../actions/userActions';
import {
    GET_CLIENT,
    GET_CLIENT_SUCCESS,
    GET_CLIENT_FAILURE, CREATE_CLIENT, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILURE
} from '../actions/clientActions';

import {CLEAR_API_ERROR_MESSAGE} from '../actions/apiUIHelperActions';
import merge from 'lodash/merge';
import entitiesReducer, {initialState as entitiesInitialState} from './entitiesReducer';
import {
    CREATE_TRANSACTION,
    CREATE_TRANSACTION_FAILURE,
    CREATE_TRANSACTION_SUCCESS,
    GET_ALL_TRANSACTION,
    GET_ALL_TRANSACTION_SUCCESS,
    GET_ALL_TRANSACTION_FAILURE,
    GET_TRANSACTIONS_BY_TOKEN,
    GET_TRANSACTIONS_SUCCESS_BY_TOKEN,
    GET_TRANSACTIONS_FAILURE_BY_TOKEN,
    GET_TRANSACTION,
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAILURE,

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

const initialState = {accessToken: '', loggedInUserId: '', errorMessage: '', entities: entitiesInitialState};

export default (state = initialState, action) => {
    switch(action.type){
        case GET_APP_ACCESS_TOKEN_SUCCESS:
        case LOGIN_SUCCESS:
        case PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE:
            return {...state, accessToken: action.accessToken};
        case LOGOUT:
            return initialState;
        case LOGGED_IN_USER_INFO_SUCCESS: {
            let entities = action.response.entities;
            let usersFromResponse = entities.users;
            let loggedInUserId = Object.keys(usersFromResponse)[0];
            return merge({}, {...state, entities: entitiesInitialState},
                {loggedInUserId, entities: entitiesReducer(state.entities, action)});
        }
        case LOGIN_FAILURE:
            return {...state, errorMessage: 'Incorrect email/password combination'};
        case CREATE_NEW_USER_FAILURE:
            return {...state, errorMessage: action.error}
        case CLEAR_API_ERROR_MESSAGE:
            return {...state, errorMessage: ''};
        case GET_CLIENT:
        case GET_CLIENT_SUCCESS:
        case GET_CLIENT_FAILURE:
        case CREATE_CLIENT:
        case CREATE_CLIENT_SUCCESS:
        case CREATE_CLIENT_FAILURE:
        case CREATE_TRANSACTION:
        case CREATE_TRANSACTION_SUCCESS:
        case CREATE_TRANSACTION_FAILURE:
        case GET_TRANSACTION:
        case GET_TRANSACTION_SUCCESS:
        case GET_TRANSACTION_FAILURE:
        case GET_AGENT_BY_TOKEN:
        case GET_AGENT_FAILURE_BY_TOKEN:
        case GET_AGENT_SUCCESS_BY_TOKEN: {
            // let entities = action.response.entities;
            // let agentsFromResponse = entities.agents;
            // let currentAgentId = Object.keys(agentsFromResponse)[0];
            // return merge({}, {...state, entities: entitiesInitialState},
            //     {currentAgentId, entities: entitiesReducer(state.entities, action)});
        }
        case GET_ALL_TRANSACTION:
        case GET_ALL_TRANSACTION_SUCCESS:
        case GET_ALL_TRANSACTION_FAILURE:
        case CREATE_HOME_CRITERIA:
        case CREATE_HOME_CRITERIA_SUCCESS:
        case CREATE_HOME_CRITERIA_FAILURE:
        case GET_TRANSACTIONS_BY_TOKEN:
        case GET_TRANSACTIONS_FAILURE_BY_TOKEN:
        case GET_TRANSACTIONS_SUCCESS_BY_TOKEN:
            const newState = { ...state, entities: entitiesInitialState };
            return merge({}, newState, { entities: entitiesReducer(state.entities, action) });
        case CREATE_HOME_INSPECTION:
        case CREATE_HOME_INSPECTION_SUCCESS:
        case CREATE_HOME_INSPECTION_FAILURE:
        case CREATE_CONTRACTS_SIGNED:
        case CREATE_CONTRACTS_SIGNED_SUCCESS:
        case CREATE_CONTRACTS_SIGNED_FAILURE:
        case CREATE_APPRAISAL:
        case CREATE_APPRAISAL_SUCCESS:
        case CREATE_APPRAISAL_FAILURE:
        case CREATE_LOAN_COMMITMENT:
        case CREATE_LOAN_COMMITMENT_SUCCESS:
        case CREATE_LOAN_COMMITMENT_FAILURE:




        default:
            return state;
    }
}
