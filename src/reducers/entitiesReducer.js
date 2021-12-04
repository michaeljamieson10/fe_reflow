import {
    LOGGED_IN_USER_INFO_SUCCESS
} from '../actions/userActions';
import {merge} from 'lodash';

export const initialState = {users: {}};

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

export default (state = initialState, action) => {
    let responseEntities = action.response ? action.response.entities : undefined;
    switch(action.type){
        case LOGGED_IN_USER_INFO_SUCCESS:
            state = {...state, users: {}};
            return appendAndUpdateEntitiesFromResponse(state, responseEntities);
        default:
            return state;
    }
}
