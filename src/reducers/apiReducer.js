import {PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE, GET_APP_ACCESS_TOKEN_SUCCESS, LOGIN_SUCCESS,
    LOGIN_FAILURE, LOGOUT} from '../actions/oauthActions';
import {
    LOGGED_IN_USER_INFO_SUCCESS, CREATE_NEW_USER_FAILURE,
} from '../actions/userActions';

import {CLEAR_API_ERROR_MESSAGE} from '../actions/apiUIHelperActions';
import merge from 'lodash/merge';
import entitiesReducer, {initialState as entitiesInitialState} from './entitiesReducer';

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
        // we re-update the global state based on menu success... isRecreational
        // a reducer returns new state
        case CREATE_NEW_USER_FAILURE:
            return {...state, errorMessage: action.error}
        // case SET_IS_FULL_MENU_SHOWN_TO_USER_TO_FALSE:
            const newState = {...state, entities: entitiesInitialState};
            return merge({}, newState, {entities: entitiesReducer(state.entities, action)});
        case CLEAR_API_ERROR_MESSAGE:
            return {...state, errorMessage: ''};

        default:
            return state;
    }
}
