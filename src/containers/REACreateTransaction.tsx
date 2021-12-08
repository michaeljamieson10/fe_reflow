import { Component } from 'react';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import {Card, CardHeader, CardContent, Grid, Typography, Divider} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { createTransaction } from '../actions/transactionActions'
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import {getLoggedInUser, getLoggedInUserId} from '../selectors/userSelectors';
// import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';
import {history} from "../index";
import REABuyerEmailForm from "./REABuyerEmailForm";
import REACreateTransactionForm from "./REACreateTransactionForm";

type newTransactionValues = {
    firstName: string;
    lastName: string;
}

class REACreateTransaction extends Component<any, { errorMessage: string, enableButton: boolean, user?: any }> {
    signupCont;
    state = {
        errorMessage: null,
        enableButton: true,
    }
    // const [showErrorMessage, setShowErrorMessage] = useState(false);

    componentWillReceiveProps = newProps => {
        if (newProps.errorMessage) {
            this.setState({
                errorMessage: newProps.errorMessage,
                enableButton: true,
            });
        }
    }

    handleSubmit = values => {
        const responseFunc = response => {
            if (!response.error) {
                // window.ca("send", "signup_button_clicked", "sign_up_page", "Signup", "click", "sign_up");
                // this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/agentOrNo");
            } else {
                const emailAlreadyUsedExceptionRegularExpression = /Email '.*' is already used./;
                // if (response.error.match(emailAlreadyUsedExceptionRegularExpression) !== null) {
                //     // this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/")
                //     //     .then(() => { this.setState({ errorMessage: 'Email is already in use' }) });
                // }
            }
        };

        console.log(values,"HI IM COOL");
        this.setState({ enableButton: false }, ()=>{
            //, loggedInUserId
            this.props.createTransaction(values.firstName, values.lastName).then(response => {
                    if (!response.error) {
                        responseFunc(response)
                    } else {
                        this.setState({ enableButton: true });
                        return;
                    }
                });
        })
        // this.setState({ enableButton: false }, () => {
            // this.props.createNewUser(userSignUpValues).then(response => {
            //     if (!response.error) {
            //         responseFunc(response)
            //     } else {
            //         this.setState({ enableButton: true });
            //         return;
            //     }
            // });

            // this.setState({ user: userSignUpValues });
        //
        // })
    };

    render() {
        return (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            marginTop:"2em"
                            }}
                    >
                        <Card style={{padding:"0.7em"}}>
                            <Typography align={"center"}  variant={"h5"}  gutterBottom>Create Transaction</Typography>
                            {/* onClick={handleSubmit} disabled={!enableButton}*/}
                            <Divider style={{marginBottom:"0.5em"}} />
                            <Typography align={"center"}  variant={"subtitle1"}  gutterBottom></Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                Who do you plan on creating
                            </Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                 this transaction for?
                            </Typography>
                        <Card className="card-with-form" style={{ boxShadow: 'none' }}>

                            <CardContent>
                                {this.state.errorMessage && <div className={'msg-style error'}>{this.state.errorMessage}</div>}
                                <REACreateTransactionForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton}/>
                            </CardContent>
                        </Card>
                        </Card>
                    </Grid>
                )

    }
}

const mapStateToProps = state => ({
    loggedInUser: getLoggedInUser(state),
    errorMessage: getError(state),
    // loggedInUserId: getLoggedInUserId(state)
})

const mapDispatchToProps = {
    createTransaction,
    createNewUser,
    attemptLogin,

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(REACreateTransaction));

