import { Component } from 'react';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import {Card, CardHeader, CardContent, Grid, Typography, Divider} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import { getLoggedInUser } from '../selectors/userSelectors';
// import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';
import {history} from "../index";
import REABuyerEmailForm from "./REABuyerEmailForm";

class REABuyerEmailAdd extends Component<any, { errorMessage: string, enableButton: boolean, user?: any }> {
    signupCont;
    state = {
        errorMessage: null,
        enableButton: true,
    }

    componentWillReceiveProps = newProps => {
        if (newProps.errorMessage) {
            this.setState({
                errorMessage: newProps.errorMessage,
                enableButton: true,
            });
        }
    }


    handleSubmit = userSignUpValues => {
        const responseFunc = response => {
            if (!response.error) {
                // window.ca("send", "signup_button_clicked", "sign_up_page", "Signup", "click", "sign_up");
                // this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/agentOrNo");
            } else {
                const emailAlreadyUsedExceptionRegularExpression = /Email '.*' is already used./;
                if (response.error.match(emailAlreadyUsedExceptionRegularExpression) !== null) {
                    // this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/")
                    //     .then(() => { this.setState({ errorMessage: 'Email is already in use' }) });
                }
            }
        };
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
                            <Typography align={"center"}  variant={"h5"}  gutterBottom>Invite New Buyer</Typography>
                            {/* onClick={handleSubmit} disabled={!enableButton}*/}
                            <Divider style={{marginBottom:"0.5em"}} />
                            <Typography align={"center"}  variant={"subtitle1"}  gutterBottom>Send Invite Text</Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                We’ll text each buyer a link
                            </Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                 to create their account
                            </Typography>
                        <Card className="card-with-form" style={{ boxShadow: 'none' }}>

                            <CardContent>
                                {this.state.errorMessage && <div className={'msg-style error'}>{this.state.errorMessage}</div>}
                                <REABuyerEmailForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton}/>
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
})

const mapDispatchToProps = {
    createNewUser,
    attemptLogin,
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(REABuyerEmailAdd));

