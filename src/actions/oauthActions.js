import base64 from 'base-64';
import qs from 'query-string';
import {updateLoggedInUserInfo} from './userActions';
import {logException} from './apiUIHelperActions';
import {API_HOST} from '../middleware/api';

import { history } from '../index.js'


export const LOCAL_STORAGE_ACCESS_TOKEN_KEY = 'accessToken';
export const LOCAL_STORAGE_ACCESS_TOKEN_TYPE = 'accessTokenType';

export const ACCESS_TOKEN_TYPES = {
    user: 'USER',
    app: 'APP'
};

const AUTH_API_ENDPOINT = `${API_HOST}oauth/token`;

export const GET_APP_ACCESS_TOKEN_SUCCESS = 'GET_APP_ACCESS_TOKEN_SUCCESS';
export const GET_APP_ACCESS_TOKEN_FAILURE = 'GET_APP_ACCESS_TOKEN_FAILURE';
export const PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE = 'PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE';
export const FLUSHED_LOCAL_STORAGE = 'FLUSHED_LOCAL_STORAGE';

const fetchAccessToken = (body) => {

    return fetch(AUTH_API_ENDPOINT, {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Authorization': `Basic ${base64.encode('reflow:reflow')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
};

export const setAccessToken = (type, accessToken, accessTokenType) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE, accessTokenType);
    }
    catch (error) {
        logException("Caught LocalStorage Exception", {error, type, accessToken, accessTokenType});
    }

    return {
        type,
        accessToken
    }
};

export const getAccessTokenType = () => {
    return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE);
};

export const LOGOUT = 'LOGOUT';

export const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE);
    // clearSavedState();

    return {
        type: LOGOUT
    }
};

const apiError = (type, error, context) => {
    logException(error, {...context, type});
    return {
        type,
        error
    }
};

const callOnFetchAccessToken = (body, successType, failureType, accessTokenType) => {
    return (dispatch) => {
        return fetchAccessToken(body).then(
            response => response.json().then(json => {
                    if(!response.ok) {
                        //Possibly whenever a user puts in a bad password
                        return dispatch(apiError(failureType, "Fetch Access Token Fail", {response, body}))
                    }
                    else {
                        return dispatch(setAccessToken(successType, json.access_token, accessTokenType));
                    }
                },
                error => {return dispatch(apiError(failureType, error, {body}))}
            )).catch(error => {return dispatch(apiError(failureType, error, {body}))});
    }
};

export const getAppAccessToken = () => (dispatch, getState) => {
    dispatch(logout());

    return dispatch(callOnFetchAccessToken('grant_type=client_credentials',
        GET_APP_ACCESS_TOKEN_SUCCESS,
        GET_APP_ACCESS_TOKEN_FAILURE,
        ACCESS_TOKEN_TYPES.app
    ));
};

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const login = (email, password) => {
    return callOnFetchAccessToken(
        qs.stringify({
            grant_type:'password',
            username: email,
            password: password
        }),
        LOGIN_SUCCESS, LOGIN_FAILURE, ACCESS_TOKEN_TYPES.user);
};

export const attemptLogin =(email, password, redirectLocation = undefined) => (dispatch, getState) => {
    return dispatch(getAppAccessToken()).then(() =>
        dispatch(login(email, password))
            .then((response) => {
                if(response.error) {
                    // dispatch(attemptLegacyRegistration(email, password))
                    //     .then((response) => {
                    //         if(!response.error) {
                    //             dispatch(login(email, password))
                    //                 .then(() => dispatch(updateLoggedInUserInfo()))
                    //                 .then(() => ReactGA.set({userId: getLoggedInUserId(getState())}))
                    //                 .then(() => history.push("/legacy"));
                    //         }
                    //     });
                } else {
                    dispatch(updateLoggedInUserInfo())
                        .then(() => redirectLocation && history.push(redirectLocation));
                }
            }));
};
