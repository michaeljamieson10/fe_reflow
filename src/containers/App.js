import React, {Component, useEffect, useState} from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import {withRouter, Route, Switch, Redirect, BrowserRouter} from "react-router-dom"
import theme from "../components/ui/Theme";
import {useIsMount} from "../hooks/useIsMount";

import {MuiThemeProvider, createMuiTheme, ThemeProvider} from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import red from "@material-ui/core/colors/red"

import { getAppAccessToken, getAccessTokenType, ACCESS_TOKEN_TYPES } from "../actions/oauthActions"
import { updateLoggedInUserInfo } from "../actions/userActions"


import SignUp from "./SignUp"
// import Login from "./Login"
import Notification from "../components/Notification"

import {getLoggedInUser, getLoggedInUserId} from "../selectors/userSelectors";
import Login from "./Login";
import ClientForm from "./ClientForm";
import ClientManagement from "./ClientManagement";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import LandingPage from "../components/LandingPage";


function App(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [value, setValue] = useState(0);

  const isMount = useIsMount();
  useEffect(() =>{
    if (props.accessToken === "") {
      props.getAppAccessToken()
    }
    if (props.loggedInUserId > 0) {
      props.pollLoggedInUser()
  }},[]); //  empty array will cause a render only once


    useEffect( (newProps) => {
      if(!isMount) {
        if (
            newProps.accessToken !== "" &&
            newProps.accessToken !== props.accessToken &&
            getAccessTokenType() === ACCESS_TOKEN_TYPES.user
        ) {
          pollLoggedInUser()
        }
      }

    }, [props.accessToken])



  const pollLoggedInUser = () => {
    // this.props.updateLoggedInUserInfo()
    props.updateLoggedInUserInfo()
    //TODO: parametrize this timeout
    // const timeout = setTimeout(this.pollLoggedInUser, 60000)
  }

  // render() {
    const { loggedInUser } = props
    return (
        <React.Fragment>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Header
                  value={value}
                  setValue={setValue}
                  selectedIndex={selectedIndex}
                  setSelectedIndex={setSelectedIndex}
              />
          <Switch>

            {/*<Route path="/" component={SignUp}/>*/}
            <Route path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/client" component={ClientManagement} />
            <Route path="/signup" component={SignUp} />
          </Switch>
              {/*<Footer setValue={setValue} setSelectedIndex={setSelectedIndex} />*/}
            </BrowserRouter>
          </ThemeProvider>
        </React.Fragment>
    )
  // }
}

const mapStateToProps = (state) => {
  const { accessToken } = state.api
  const loggedInUserId = getLoggedInUserId(state)
  const loggedInUser = getLoggedInUser(state)
  return { accessToken, loggedInUserId, loggedInUser, }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getAppAccessToken,
      updateLoggedInUserInfo,
    },
    dispatch
  )
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
