import { Component } from 'react';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { Card, CardHeader, CardContent } from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import { getLoggedInUser } from '../selectors/userSelectors';
import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';

class SignUp extends Component<any, { errorMessage: string, enableButton: boolean, user?: any }> {
    signupCont;
    state = {
        errorMessage: null,
        enableButton: true,
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    componentDidUpdate() {
        this.resize();
    }

    resize = () => {
        const signupNode = ReactDOM.findDOMNode(this.signupCont);
        if (signupNode !== null) {
            const diff = signupNode.offsetHeight - signupNode.clientHeight;
            signupNode.style.height = (window.innerHeight - signupNode.offsetTop + diff) + 'px';
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
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
                window.ca("send", "signup_button_clicked", "sign_up_page", "Signup", "click", "sign_up");
                this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/signup");
            } else {
                const emailAlreadyUsedExceptionRegularExpression = /Email '.*' is already used./;
                if (response.error.match(emailAlreadyUsedExceptionRegularExpression) !== null) {
                    this.props.attemptLogin(userSignUpValues.email.trim(), userSignUpValues.password, "/")
                        .then(() => { this.setState({ errorMessage: 'Email is already in use' }) });
                }
            }
        };
        this.setState({ enableButton: false }, () => {
            const referrerIdentityCode = this.props.location && this.props.match.params.code;
            if (referrerIdentityCode) {
                this.props.createNewUserWithReferral(userSignUpValues, referrerIdentityCode).then(responseFunc);
            } else {
                this.props.createNewUser(userSignUpValues).then(response => {
                    if (!response.error) {
                        this.props.getAllDSPRServicingZipCode(userSignUpValues.signupZipCode)
                            .then(() => responseFunc(response));
                    } else {
                        this.setState({ enableButton: true });
                        return;
                    }
                });
            }

            this.setState({ user: userSignUpValues });

        })
    };

    render() {
        const referrerIdentityCode = this.props.match.params && this.props.match.params.code;
        return (
            <div className="signup-section"
                ref={(signupCont) => { this.signupCont = signupCont; }}
            >
                {this.props.loggedInUser ? (
                    <div>Hi</div>
                ) : (
                        <Card className="card-with-form" style={{ boxShadow: 'none' }}>
                            <CardHeader
                                title="Let's create your new reflow Account!"
                                subheader={
                                    <div>
                                        <div>Get started by filling this out. Do you already have an account?</div>
                                        <Link to="/login">Log in.</Link>
                                    </div>
                                }
                            />
                            <CardContent>
                                {this.state.errorMessage && <div className={'msg-style error'}>{this.state.errorMessage}</div>}
                                <SignUpForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton}/>
                                {referrerIdentityCode && <div><br />Referral code: {referrerIdentityCode}</div>}
                            </CardContent>
                        </Card>
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
