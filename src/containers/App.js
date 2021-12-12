import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { ThemeProvider } from "@material-ui/styles";
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import theme from "../components/ui/Theme";

import CssBaseline from "@material-ui/core/CssBaseline"

import { getAppAccessToken, getAccessTokenType, ACCESS_TOKEN_TYPES } from "../actions/oauthActions"
import { updateLoggedInUserInfo } from "../actions/userActions"

import Header from "../components/ui/Header"

import SignUp from "./SignUp"
import Notification from "../components/Notification"

import {getLoggedInUser, getLoggedInUserId} from "../selectors/userSelectors";
import Login from "./Login";
import FakeLogin from "./FakeLogin";
import ClientForm from "./ClientForm";
import ClientManagement from "./ClientManagement";
import Home from "../components/Home"
import ChooseRole from "./ChooseRole";
import SetUpAgentProfileForm from "./SetUpAgentProfileForm";
import READashboard from "./READashboard";
import REABuyerQuantity from "./REABuyerQuantity";
import REABuyerEmailForm from "./REABuyerEmailForm";
import REABuyerEmail from "./REABuyerEmailAdd";
import REACreateTransaction from "./REACreateTransaction";
import FlowScreen from "./FlowScreen";
import HomeCriteriaScreen from "./HomeCriteriaScreen";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showInstallMessage: false,
      selectedIndex: 0,
      value: 0,
    }
  }


  componentDidMount() {
    if (this.props.accessToken === "") {
      this.props.getAppAccessToken()
    }
    if (this.props.loggedInUserId > 0) {
      this.pollLoggedInUser()
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
    this.timeout = setTimeout(this.pollLoggedInUser, 60000)
  }

  render() {
    const { loggedInUser } = this.props
    return (
        // <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <CssBaseline />
            <Header loggedInUser={loggedInUser}/>
            <Switch>
              <Route exact path="/">
                {/*{loggedIn ? <Redirect to="/profile" /> : <HomePage />}*/}
                <Redirect to="/about"/>
              </Route>
              <Route path="/login" component={Login} />
              {/*<Route path="/LOL" component={SetUpAgentProfileForm} />*/}
              <Route exact path="/rea" component={READashboard} />
              <Route exact path="/rea/create_transaction" component={REACreateTransaction}/>
              <Route exact path="/rea/invite_buyer" component={REABuyerEmail}/>
              <Route exact path="/rea/invite_buyer/quantity" component={REABuyerQuantity} />
              <Route exact path="/rea/invite_buyer/send_emails" component={REABuyerQuantity} />
              <Route exact path="/about" component={Home} />
              <Route exact path="/role" component={ChooseRole} />
              <Route exact path="/client" component={ClientManagement} />
              <Route exact path="/dashboard/flow" component={FlowScreen} />
              <Route exact path="/home_criteria" component={HomeCriteriaScreen} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>

          </React.Fragment>
        </ThemeProvider>
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