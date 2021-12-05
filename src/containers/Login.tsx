import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {Card, CardHeader, CardContent, Grid, Typography} from "@material-ui/core";

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
                <Card style={{padding:"2em"}}>

                <Typography variant="h3" align="center" color={"primary"} gutterBottom>
                    Login
                </Typography>


                <CardHeader

                    subheader={
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            Don't have an account?
                            <div>
                                <Link style={{ textDecoration: 'none', color:"#7A64D3" }} to="/signup">Sign Up!</Link>
                                {this.state.errorMessage && <div className="error">{this.state.errorMessage}</div>}
                            </div>
                        </Grid>
                    }
                />

                <CardContent>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                    <LoginForm onSubmit={this.handleSubmit} enableButton={this.state.enableButton} />
                        <Grid
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{marginTop: "0.5em"}}

                        >
                        <Link style={{ textDecoration: 'none', color:"#7A64D3" }} to="/forgot-password">Forgot your password?</Link>
                        </Grid>
                    </Grid>
                </CardContent>

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
