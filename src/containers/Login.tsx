import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {Card, CardHeader, CardContent, Grid} from "@material-ui/core";

import { attemptLogin } from "../actions/oauthActions";
import { clearErrorMessage } from "../actions/apiUIHelperActions";

import { getLoggedInUser} from "../selectors/userSelectors";
import { getError } from "../selectors/errorSelector";

import { history } from "../index.js";

import LoginForm from "./LoginForm";

class Login extends Component<any, {errorMessage: string, enableButton: boolean}> {
    timeout: NodeJS.Timeout;
    state = {
        errorMessage: null,
        enableButton: true,
    }

    componentDidMount() {
        this.pollLoggedInUser();
    }

    handleSubmit = userLoginValues => {
        this.setState({ enableButton: false }, () => {
            this.props.attemptLogin(userLoginValues.email.trim(), userLoginValues.password)
                .then(() => this.pollLoggedInUser());
        })
    }

    componentWillReceiveProps = newProps => {
        if (newProps.errorMessage !== "") {
            this.setState({
                errorMessage: newProps.errorMessage,
                enableButton: true,
            });
            this.props.clearErrorMessage();
        }
    }

    pollLoggedInUser = () => {
        if (this.props.loggedInUser) {
            history.push("/");
        } else {
            if (!this.props.errorMessage) {
                this.timeout = setTimeout(this.pollLoggedInUser, 100);
            }
        }
    }

    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{marginBottom:"3em"}}
            >

            <Card className="login-section card-with-form">
                <CardHeader
                    title="Log in with your reflow Account"
                    subheader={
                        <div>
                            Don't have an account?
                            <div>
                                <Link to="/signup">Sign Up!</Link>
                                {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                            </div>
                        </div>
                    }
                />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                <CardContent>
                    <LoginForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton} />
                    <div className="forgot-pass">
                        <Link to="/forgot-password">Forgot your password?</Link>
                    </div>
                </CardContent>
                </Grid>
            </Card>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    errorMessage: getError(state),
    loggedInUser: getLoggedInUser(state),
})

const mapDispatchToProps = {
    attemptLogin,
    clearErrorMessage,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
