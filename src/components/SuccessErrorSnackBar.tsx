import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
const SuccessErrorSnackBar = props => {
    const {
        showSnackbarSuccessAlert,
            setShowSnackbarSuccessAlert,showSnackbarErrorAlert,setShowSnackbarErrorAlert, snackbarErrorAlertText,snackbarErrorAlertTitle,snackbarSuccessAlertText} = props;

    return <>
    <Snackbar open={showSnackbarSuccessAlert} autoHideDuration={3000} onClose={() => setShowSnackbarSuccessAlert(false)} anchorOrigin={{vertical: 'top', horizontal: 'center'}} className={'snackbar-alert-container'}>
        <Alert severity={'success'} onClose={() => setShowSnackbarSuccessAlert(false)} className={'snackbar-alert'}>
            <div className={'snackbar-alert-message'}>
                {snackbarSuccessAlertText}
            </div>
        </Alert>
    </Snackbar>

    {/*Error Snackbar Alert for creating*/}
    <Snackbar
        open={showSnackbarErrorAlert}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        className={'snackbar-alert-container'}
        onClose={(evt, reason) => {
            //prevent alert from being closed when clicking outside of alert
            if (reason === 'clickaway') return;
            setShowSnackbarErrorAlert(false);
        }}
    >
        <Alert severity={'error'} onClose={() => setShowSnackbarErrorAlert(false)} className={'snackbar-alert'}>
            <div className={'snackbar-alert-message'}>
                <AlertTitle>{snackbarErrorAlertTitle}</AlertTitle>
                {snackbarErrorAlertText}
            </div>
        </Alert>
    </Snackbar>
    </>
}
export default SuccessErrorSnackBar;