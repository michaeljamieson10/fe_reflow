import 'react-app-polyfill/ie9';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from "history";
// import { syncHistoryWithStore } from 'react-router-redux';
import 'typeface-roboto';

import Root from './containers/Root'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker';

import {
    setAccessToken, PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE,
    LOCAL_STORAGE_ACCESS_TOKEN_KEY, LOCAL_STORAGE_ACCESS_TOKEN_TYPE, ACCESS_TOKEN_TYPES
} from './actions/oauthActions'
import { updateLoggedInUserInfo } from './actions/userActions';
import { logException } from './actions/apiUIHelperActions';
// import {FLUSHED_LOCAL_STORAGE} from './actions/oauthActions'
// import {loadState, saveState} from './localStorage';


//TODO: store the cart in localstorage and load it from there
// const store = configureStore(loadState());
const store = configureStore();

export const history = createBrowserHistory()



// store.subscribe(() => {
//    saveState(store.getState());
// });


try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
    const accessTokenType = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_TYPE);
    if (accessToken) {
        store.dispatch(setAccessToken(PRELOAD_ACCESS_TOKEN_FROM_LOCAL_STORAGE, accessToken, accessTokenType));
        //NOTE: this will happen in the right order because setAccesToken doesn't do anything
        // asynchronously
        if (accessTokenType === ACCESS_TOKEN_TYPES.user) store.dispatch(updateLoggedInUserInfo());
    }
}
catch (err) {
    logException("Couldn't load accessToken from local storage", { err });
}



render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

serviceWorker.register();
