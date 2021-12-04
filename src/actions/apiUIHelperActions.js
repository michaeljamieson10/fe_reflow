export const CLEAR_API_ERROR_MESSAGE = 'CLEAR_API_ERROR_MESSAGE';

const errorMessageClearer = () => {
    return {
        type: CLEAR_API_ERROR_MESSAGE
    };
};

export const clearErrorMessage = () => (dispatch, getState) => {
    return dispatch(errorMessageClearer());
};

export const logException = (ex, context) => {

    /*eslint no-console:0*/
    // window.console && console.error && console.error(ex);
};