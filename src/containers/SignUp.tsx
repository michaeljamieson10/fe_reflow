import { Component } from 'react';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import {Card, CardHeader, CardContent, Grid, Typography} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import { getLoggedInUser } from '../selectors/userSelectors';
// import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';
import {history} from "../index";

class SignUp extends Component<any, { errorMessage: string, enableButton: boolean, user?: any }> {
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
                this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/agentOrNo");
            } else {
                const emailAlreadyUsedExceptionRegularExpression = /Email '.*' is already used./;
                if (response.error.match(emailAlreadyUsedExceptionRegularExpression) !== null) {
                    this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/")
                        .then(() => { this.setState({ errorMessage: 'Email is already in use' }) });
                }
            }
        };
        this.setState({ enableButton: false }, () => {
                this.props.createNewUser(userSignUpValues).then(response => {
                    if (!response.error) {
                        responseFunc(response)
                    } else {
                        this.setState({ enableButton: true });
                        return;
                    }
                });

            this.setState({ user: userSignUpValues });

        })
    };

    render() {
        return (
            <div className="signup-section"
                ref={(signupCont) => { this.signupCont = signupCont; }}
            >
                {this.props.loggedInUser ? (
                    <div>You already have an account, please navigate to app</div>
                ) : (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            marginTop:"2em",
                            marginBottom:"3em"}}
                    >

                        <Typography variant="h3" align="center" color={"primary"} gutterBottom>
                            Create Account
                        </Typography>
                        <Card className="card-with-form" style={{ boxShadow: 'none' }}>
                            <CardHeader
                                subheader={
                                    <div>
                                        <div>Get started by filling this out. Do you already have an account?</div>
                                        <Link style={{ textDecoration: 'none', color:"#7A64D3"}}  to="/login">Log in.</Link>
                                    </div>
                                }
                            />
                            <CardContent>
                                {this.state.errorMessage && <div className={'msg-style error'}>{this.state.errorMessage}</div>}
                                <SignUpForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton}/>
                            </CardContent>
                        </Card>
                    </Grid>
                    )}       
            </div>
        );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
