import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const GET_AGENT_BY_TOKEN = 'GET_AGENT_BY_TOKEN';
export const GET_AGENT_SUCCESS_BY_TOKEN = 'GET_AGENT_SUCCESS_BY_TOKEN';
export const GET_AGENT_FAILURE_BY_TOKEN = 'GET_AGENT_FAILURE_BY_TOKEN';

const agentByToken = (signal: any) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_AGENT_BY_TOKEN, GET_AGENT_SUCCESS_BY_TOKEN, GET_AGENT_FAILURE_BY_TOKEN],
            endPoint: `agent`,
            schema: Schemas.AGENT,
            signal: signal
        }
    }
};

export const getAgentByToken = (signal?: any) => (dispatch, getState) => {
    return dispatch(agentByToken(signal));
};
export const GET_AGENT = 'GET_AGENT';
export const GET_AGENT_SUCCESS = 'GET_AGENT_SUCCESS';
export const GET_AGENT_FAILURE = 'GET_AGENT_FAILURE';

const agent = (agentId, signal: any) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_AGENT, GET_AGENT_SUCCESS, GET_AGENT_FAILURE],
            endPoint: `agent/${agentId}`,
            schema: Schemas.AGENT,
            signal: signal
        }
    }
};

export const getAgent = (agentId, signal?: any) => (dispatch, getState) => {
    return dispatch(agent(agentId, signal));
};

export const CREATE_AGENT = 'CREATE_AGENT';
export const CREATE_AGENT_SUCCESS = 'CREATE_AGENT_SUCCESS';
export const CREATE_AGENT_FAILURE = 'CREATE_AGENT_FAILURE';

const agentCreator = (userId) => {
    const client = {
        "user":
            {
                "id" : userId
            }
    }
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_AGENT, CREATE_AGENT_SUCCESS, CREATE_AGENT_FAILURE],
            endPoint: 'agent',
            schema: Schemas.AGENT,
            body: client
        }
    };
};

export const createAgent = (userId) => (dispatch, getState) => {
    return dispatch(agentCreator(userId)).then(() => dispatch(getSpecificUser(userId)));
};



