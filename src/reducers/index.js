import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux'
import api from './apiReducer';

const rootReducer = combineReducers({
    form: formReducer,
    routing,
    api,
});

export default rootReducer;