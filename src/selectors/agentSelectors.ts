import { createSelector } from 'reselect';
import { State } from '../store/reduxStoreState';

// export const getLoggedInUser = (state: State) => state.api.loggedInUserId ? state.api.entities.users[state.api.loggedInUserId] : undefined;
// export const getLoggedInUserId = (state) => state.api.loggedInUserId;
// export const getUsers = (state: State) => state.api.entities.users;

// export const getUsersByName = createSelector(
//     [getUsers], (users) => {
//         if (!users) return [];
//         return Object.keys(users)
//             .map(key => users[key])
//             .map(user => { return { value: user.id, text: user.firstName + " " + user.lastName + " (" + user.email + ")" }; });
//     }
// );
export const getAgents = (state) => state.api.entities.agents;


// export const getAgentsByName = createSelector(
//     [getAgents], (users) => {
//         if (!users) return [];
//         return Object.keys(users)
//             .map(key => users[key])
//             .map(user => { return { value: user.id, text: user.firstName + " " + user.lastName + " (" + user.email + ")" }; });
//     }
// );
export const getAgentById = (state) => Object.keys(state.api.entities.agents).map(key => state.api.entities.agents[key]);
// export const getAgentsByBla = createSelector(
//     [getAgents],
//     (agents) => Object.keys(agents).map(key => agents[key])
        // if (!agents) return [];
        // return Object.keys(agents)
        //     .map(key => agents[key])
        //     .map(user => { return { value: user.id, text: user.firstName + " " + user.lastName + " (" + user.email + ")" };
        //     });
    // }
// );
//
// export const getUsers = (state: State) => state.api.entities.users;
export const getAgentFromProps = (state: State, props) => {
    console.log(state, props,'whats in selector')
    return state.api.entities.agents && props && props.agentId ?
        state.api.entities.agents[props.agentId] :
        null;
};
export const getUserFromProps = (state: State, props) => {
    return state.api.entities.users && props && props.userId ?
        state.api.entities.users[props.userId] :
        null;
};


