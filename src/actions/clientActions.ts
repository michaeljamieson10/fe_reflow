import { CALL_API, Schemas } from '../middleware/api';
import { getSpecificUser } from './userActions';

export const GET_CLIENT = 'GET_CLIENT';
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';
export const GET_CLIENT_FAILURE = 'GET_CLIENT_FAILURE';

const client = (clientId, signal: any) => {
    return {
        [CALL_API]: {
            httpAction: 'GET',
            types: [GET_CLIENT, GET_CLIENT_SUCCESS, GET_CLIENT_FAILURE],
            endPoint: `client/${clientId}`,
            schema: Schemas.CLIENT,
            signal: signal
        }
    }
};

export const getClient = (clientId, signal?: any) => (dispatch, getState) => {
    return dispatch(client(clientId, signal));
};

export const CREATE_CLIENT = 'CREATE_CLIENT';
export const CREATE_CLIENT_SUCCESS = 'CREATE_CLIENT_SUCCESS';
export const CREATE_CLIENT_FAILURE = 'CREATE_CLIENT_FAILURE';

const clientCreator = ( userId) => {
    const client = {
        "user":
            {
                "id" : userId
            }
    }
    console.log("inside clientCreator", userId)
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [CREATE_CLIENT, CREATE_CLIENT_SUCCESS, CREATE_CLIENT_FAILURE],
            endPoint: 'client',
            schema: Schemas.CLIENT,
            body: client
        }
    };
};

export const createClient = (userId) => (dispatch, getState) => {
    return dispatch(clientCreator(userId)).then(() => dispatch(getSpecificUser(userId)));
};



