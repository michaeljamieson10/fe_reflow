import {CALL_API, Schemas} from '../middleware/api';
import {getAppAccessToken} from './oauthActions';
import 'whatwg-fetch';
import {history} from "../index";

const baseURL = window.location.protocol + "//" + window.location.host;

const CALLBACK_EMAIL_CONFIRM_URL = `${baseURL}/validate-email/`;
const FORGOT_PASSWORD_EMAIL_CALLBACK_TEMPLATE = `${baseURL}/reset-password/`;

export const LOGGED_IN_USER_INFO = 'LOGGED_IN_USER_INFO';
export const LOGGED_IN_USER_INFO_SUCCESS = 'LOGGED_IN_USER_INFO_SUCCESS';
export const LOGGED_IN_USER_INFO_FAILURE = 'LOGGED_IN_USER_INFO_FAILURE';

// Get the info about the logged in user
const getLoggedInUser = () => ({
    [CALL_API]: {
        httpAction: 'GET',
        types: [LOGGED_IN_USER_INFO, LOGGED_IN_USER_INFO_SUCCESS, LOGGED_IN_USER_INFO_FAILURE],
        endPoint: 'user',
        schema: Schemas.USER
    }
});

export const updateLoggedInUserInfo = () => (dispatch, getState) => {
    return dispatch(getLoggedInUser());
};


export const CREATE_NEW_USER = 'CREATE_NEW_USER';
export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const CREATE_NEW_USER_FAILURE = 'CREATE_NEW_USER_FAILURE';

// Creates a new reflow user.

const createUser = (user, referrerIdentityCode) => {
    const userRegistration = referrerIdentityCode ? {
        user: {...user, email: user.email.trim()},
        callbackURLForEmailValidation: CALLBACK_EMAIL_CONFIRM_URL,
        referrerIdentityCode: referrerIdentityCode
    } : {
        user: {...user, email: user.email.trim()},
        callbackURLForEmailValidation: CALLBACK_EMAIL_CONFIRM_URL
    };
    return {
        [CALL_API]: {
            httpAction: 'POST',
            types: [ CREATE_NEW_USER, CREATE_NEW_USER_SUCCESS, CREATE_NEW_USER_FAILURE ],
            endPoint: 'user',
            schema: Schemas.USER,
            body: userRegistration
        }
    }
};

//Given a zipcode we can find out all the DSPRs that are servicing that zip code... there can be multiple DSPRs
//We're creating the user, then we make at least make one call otherwise we have no DSPR object since they aren't even at the menu yet
export const createNewUser = (user) => (dispatch, getState) => {
    return dispatch(getAppAccessToken())
        .then(() => dispatch(createUser(user)))
};

export const GET_SPECIFIC_USER = 'GET_SPECIFIC_USER';
export const GET_SPECIFIC_USER_SUCCESS = 'GET_SPECIFIC_USER_SUCCESS';
export const GET_SPECIFIC_USER_FAILURE = 'GET_SPECIFIC_USER_FAILURE';

const specificUser = (userId) => ({
    [CALL_API]: {
        httpAction: 'GET',
        types: [GET_SPECIFIC_USER, GET_SPECIFIC_USER_SUCCESS, GET_SPECIFIC_USER_FAILURE],
        endPoint: `user/${userId}`,
        schema: Schemas.USER
    }
});

export const getSpecificUser = (userId) => (dispatch) => {
    return dispatch(specificUser(userId));
};

