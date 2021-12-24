import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import PropTypes from 'prop-types';

import App from './App'


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
