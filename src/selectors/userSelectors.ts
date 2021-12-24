import { State } from '../store/reduxStoreState';

export const getLoggedInUser = (state: State) => state.api.loggedInUserId ? state.api.entities.users[state.api.loggedInUserId] : undefined;
export const getLoggedInUserId = (state) => state.api.loggedInUserId;
export const getUsers = (state: State) => state.api.entities.users;

export const getUserFromProps = (state: State, props) => {
    return state.api.entities.users && props && props.userId ?
        state.api.entities.users[props.userId] :
        null;
};


