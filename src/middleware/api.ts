import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import qs from 'query-string';
import { logException } from '../actions/apiUIHelperActions';
import { history } from '../index.js'


import { LOCAL_STORAGE_ACCESS_TOKEN_KEY, logout } from '../actions/oauthActions';

// Processed at compilation through .env/.env.development files
export const API_HOST = process.env.REACT_APP_API_URL;

const API_ROOT = API_HOST + 'v1/';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (httpAction, endpoint, schema, accessToken,
    body = {}, queryParamsMap: any = {}, file) => {
    queryParamsMap.access_token = accessToken;
    const queryParamsString = qs.stringify(queryParamsMap);

    const fullUrl = ((endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint)
        + `?${queryParamsString}`;

    let fetchInit = {};

    if (httpAction !== 'GET') {
        const jsonBody = JSON.stringify(body);
        let formData;
        let headers;
        if (file) {
            formData = new FormData();
            formData.append('file', file);
            formData.append('meta-data', jsonBody);
            headers = new Headers();
        } else {
            headers = new Headers();
            headers.append('Content-Type', 'application/json')
        }
        fetchInit = {
            mode: 'cors',
            method: httpAction,
            headers,
            body: formData ? formData : jsonBody
        };
    }

    return fetch(fullUrl, fetchInit)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                return Object.assign({},
                    normalize(camelizeKeys(json), schema)
                )
            })
        )
};

const userSchema = new Schema('users', {
    idAttribute: user => user.id
});

const clientSchema = new Schema('clients', {
    idAttribute: client => client.id
});

const agentSchema = new Schema('agents', {
    idAttribute: client => client.id
});


// Schemas for Grassp API responses.
export const Schemas = {
    USER: userSchema,
    CLIENT: clientSchema,
    AGENT: agentSchema,
    // USER_ARRAY: arrayOf(userSchema),
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action);
    }

    let { endPoint } = callAPI;
    const { schema, types, httpAction, body, queryParamsMap, file } = callAPI;

    if (typeof endPoint === 'function') {
        endPoint = endPoint(store.getState());
    }

    if (typeof endPoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (!schema) {
        throw new Error('Specify one of the exported Schemas.')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const accessToken = store.getState().api.accessToken;

    if (!accessToken || typeof accessToken !== 'string') {
        store.dispatch(logout());
        history.push("/login");
    }

    const actionWith = data => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction
    };

    const [requestType, successType, failureType] = types;
    try {
        next(actionWith({ type: requestType }));
    }
    catch (error) {
        logException("Next Action Failed (but non critical?)", {
            error,
            action: requestType,
            callApi: callAPI,
            state: store.getState()
        })
    }

    return callApi(httpAction, endPoint, schema, accessToken, body, queryParamsMap, file).then(
        response => next(actionWith({
            response,
            type: successType
        })),
        error => {
            const errorMessage = error.message ? error.message : error.error;

            if (error.status === 500) logException(errorMessage, {
                action: requestType,
                callApi: callAPI,
                state: store.getState()
            });
            if (error.status === 401 || error.error === 'invalid_token' || error.message.includes('Unexpected token < in JSON at position 0')) {
                store.dispatch(logout());
                history.push("/login");
            }
            else {
                return next(actionWith({
                    type: failureType,
                    error: error.message || 'Something went terribly wrong :( '
                }))
            }
        }
    );
}
