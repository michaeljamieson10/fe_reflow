import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter, Route, Switch, Redirect } from "react-router-dom"

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import red from "@material-ui/core/colors/red"

import { getAppAccessToken, getAccessTokenType, ACCESS_TOKEN_TYPES } from "../actions/oauthActions"
import { updateLoggedInUserInfo } from "../actions/userActions"

// import Header from "../components/Header";

import SignUp from "./SignUp"
// import Login from "./Login"
import Notification from "../components/Notification"

import { getLoggedInUser, getLoggedInUserId } from "../selectors/userSelectors"
import Login from "./Login";
import ClientForm from "./ClientForm";
import ClientManagement from "./ClientManagement";

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        margin: "5px",
        padding: "10px"
      }
    }
  },
  layout: {
    width: "100%",
    height: "100%"
  },
  palette: {
    primary: {
      main: "#67cb33",
      contrastText: "#fff"
    },
    secondary: {
      main: "#000",
      contrastText: "#fff"
    },
    error: red
  },
  typography: {
    useNextVariants: true
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showInstallMessage: false,
    }
  }

  componentDidMount() {
    if (this.props.accessToken === "") {
      this.props.getAppAccessToken()
    }
    if (this.props.loggedInUserId > 0) {
      this.pollLoggedInUser()
    }
    const isIosSafari = () => {
      const userAgent = window.navigator.userAgent.toLowerCase()
      console.log(userAgent)
      return /iphone|ipad|ipod/.test(userAgent) && userAgent.includes("safari")
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => "standalone" in window.navigator && window.navigator.standalone

    // Checks if should display install popup notification:
    if (isIosSafari() && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true })
    }
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.accessToken !== "" &&
      newProps.accessToken !== this.props.accessToken &&
      getAccessTokenType() === ACCESS_TOKEN_TYPES.user
    ) {
      this.pollLoggedInUser()
    }
  }

  pollLoggedInUser = () => {
    this.props.updateLoggedInUserInfo()
    //TODO: parametrize this timeout
    this.timeout = setTimeout(this.pollLoggedInUser, 60000)
  }

  render() {
    const { loggedInUser } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          {/*<Header loggedInUser={loggedInUser} />*/}
          <Switch>
            {/*<Route path="/" component={SignUp}/>*/}
            <Route path="/login" component={Login} />
            <Route path="/client" component={ClientManagement} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
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
