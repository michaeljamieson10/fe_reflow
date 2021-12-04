import { createSelector } from 'reselect';
import { State } from '../store/reduxStoreState';

export const getLoggedInUser = (state: State) => state.api.loggedInUserId ? state.api.entities.users[state.api.loggedInUserId] : undefined;
export const getUsers = (state: State) => state.api.entities.users;

export const getUsersByName = createSelector(
    [getUsers], (users) => {
        if (!users) return [];
        return Object.keys(users)
            .map(key => users[key])
            .map(user => { return { value: user.id, text: user.firstName + " " + user.lastName + " (" + user.email + ")" }; });
    }
);


export const getUserFromProps = (state: State, props) => {
    return state.api.entities.users && props && props.userId ?
        state.api.entities.users[props.userId] :
        null;
};

export const getUserNotesFromProps = (state: State, props) => {
    return state.api.entities.userNotes && state.api.entities.users && props.userId ?
        state.api.entities.users[props.userId] ?
            state.api.entities.users[props.userId].userNotes ?
                state.api.entities.users[props.userId].userNotes.map(key => state.api.entities.userNotes[key])
                : null
            : null
        : null;
};
