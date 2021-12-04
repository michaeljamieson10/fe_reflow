import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { ThemeProvider } from "@material-ui/styles";
import { withRouter, Route, Switch, Redirect } from "react-router-dom"
import theme from "../components/ui/Theme";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import red from "@material-ui/core/colors/red"

import { getAppAccessToken, getAccessTokenType, ACCESS_TOKEN_TYPES } from "../actions/oauthActions"
import { updateLoggedInUserInfo } from "../actions/userActions"

// import Header from "../components/Header";

import SignUp from "./SignUp"
// import Login from "./Login"
import Notification from "../components/Notification"

import {getLoggedInUser, getLoggedInUserId} from "../selectors/userSelectors";
import Login from "./Login";
import ClientForm from "./ClientForm";
import ClientManagement from "./ClientManagement";
import Header from "../components/ui/Header";

// const theme = createMuiTheme({
//   overrides: {
//     MuiButton: {
//       root: {
//         margin: "5px",
//         padding: "10px"
//       }
//     }
//   },
//   layout: {
//     width: "100%",
//     height: "100%"
//   },
//   palette: {
//     primary: {
//       main: "#67cb33",
//       contrastText: "#fff"
//     },
//     secondary: {
//       main: "#000",
//       contrastText: "#fff"
//     },
//     error: red
//   },
//   typography: {
//     useNextVariants: true
//   }
// })

class App extends Component {
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const [value, setValue] = useState(0);
  constructor(props) {
    super(props);
    // this.setValue = this.setValue.bind(this);
    this.state = {
      showInstallMessage: false,
      selectedIndex: 0,
      value: 0,
    }
    // this.setState({ [stateName + "State"]: "success" });
  }
  // setValue = (val) => {
  //   this.setState({value: val
  //   })}
  // setSelectedIndex = (idx) =>{
  //   this.setState({
  //     selectedIndex: idx
  //   })
  // }

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
            {/*<Header loggedInUser={loggedInUser} selectedIndex={this.selectedIndex}*/}
            {/*        setSelectedIndex={this.setSelectedIndex}*/}
            {/*        value={this.value}*/}
            {/*        setValue={this.setValue}*/}
            {/*    />*/}
            <Switch>
              {/*<Route path="/" component={SignUp}/>*/}
              <Route path="/login" component={Login} />
              <Route path="/client" component={ClientManagement} />
              <Route path="/signup" component={SignUp} />
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