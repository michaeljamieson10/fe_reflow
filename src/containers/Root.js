import React from 'react'
import { Provider } from 'react-redux'
// import routes from '../routes'
// import DevTools from './DevTools'
import { Router } from 'react-router-dom'
import PropTypes from 'prop-types';

import App from './App'

// const debug = true;
// const debug = false;


const Root = ({ store, history }) => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default Root
// process.env.NODE_ENV !== 'production' && <DevTools />
