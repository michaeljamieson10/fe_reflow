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

import {getLoggedInUser, getLoggedInUserId} from "../selectors/userSelectors";
import Login from "./Login";
import Home from "../components/Home"
import ChooseRole from "./ChooseRole";
import READashboard from "./READashboard";
import REABuyerQuantity from "./REABuyerQuantity";
import REABuyerEmail from "./REABuyerEmailAdd";
import REACreateTransaction from "./REACreateTransaction";
import FlowScreen from "./FlowScreen";
import HomeCriteriaScreen from "./HomeCriteriaScreen";
import PreApprovalScreen from "./PreApprovalScreen";
import AcceptedOfferScreen from "./AcceptedOfferScreen";
import HomeInspectionScreen from "./HomeInspectionScreen";
import ContractsSignedScreen from "./ContractsSignedScreen";
import AppraisalScreen from "./AppraisalScreen";
import LoanCommitmentScreen from "./LoanCommitmentScreen";
import HomeownersInsuranceScreen from "./HomeownersInsuranceScreen";
import ClearToCloseScreen from "./ClearToCloseScreen";
import FinalWalkthroughScreen from "./FinalWalkthroughScreen";
import ClosingScreen from "./ClosingScreen";

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
                <Redirect to="/about"/>
              </Route>
              <Route path="/login" component={Login} />
              <Route exact path="/rea" component={READashboard} />
              <Route exact path="/rea/create_transaction" component={REACreateTransaction}/>
              <Route exact path="/rea/invite_buyer" component={REABuyerEmail}/>
              <Route exact path="/rea/invite_buyer/quantity" component={REABuyerQuantity} />
              <Route exact path="/rea/invite_buyer/send_emails" component={REABuyerQuantity} />
              <Route exact path="/about" component={Home} />
              <Route exact path="/role" component={ChooseRole} />
              <Route path="/dashboard/transaction/:transaction_id" component={FlowScreen} />
              <Route exact path="/home_criteria/transaction/:transaction_id" component={HomeCriteriaScreen} />
              <Route exact path="/pre_approval/transaction/:transaction_id" component={PreApprovalScreen} />
              <Route exact path="/accepted_offer/transaction/:transaction_id" component={AcceptedOfferScreen} />
              <Route exact path="/home_inspection/transaction/:transaction_id" component={HomeInspectionScreen} />
              <Route exact path="/contracts_signed/transaction/:transaction_id" component={ContractsSignedScreen} />
              <Route exact path="/appraisal/transaction/:transaction_id" component={AppraisalScreen} />
              <Route exact path="/loan_commitment/transaction/:transaction_id" component={LoanCommitmentScreen} />
              <Route exact path="/homeowners_insurance/transaction/:transaction_id" component={HomeownersInsuranceScreen} />
              <Route exact path="/clear_to_close/transaction/:transaction_id" component={ClearToCloseScreen} />
              <Route exact path="/final_walkthrough/transaction/:transaction_id" component={FinalWalkthroughScreen} />
              <Route exact path="/closing/transaction/:transaction_id" component={ClosingScreen} />
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