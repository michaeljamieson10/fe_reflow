import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import { Close, CheckCircle, Error, Info, Warning } from "@material-ui/icons"
import { green, amber } from "@material-ui/core/colors"
import { withStyles } from "@material-ui/core/styles"

const variantIcon = {
  success: <CheckCircle />,
  warning: <Warning />,
  error: <Error />,
  info: <Info />,
}

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: green[600],
  },
  warning: {
    backgroundColor: amber[700]
  },
  download: {
    backgroundColor: '#212121',
  },
  icon: {
    fontSize: "1.5rem",
    width: "1em",
    height: "100%",
    padding: "12px"
  },
  message: {
    fontSize: "14px",
    height: "inherit",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: '30px'
  },
  notification: {
    color: "#fff"
    // top:'48px'
  }
})

class SimpleSnackbar extends React.Component {
  state = {
    open: true
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    this.setState({ open: false })
  }

  // <Button onClick={this.handleClick}>Open simple snackbar</Button>
  render() {
    const { classes, message, variant, location, autoHideDuration } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: location || "bottom",
          horizontal: "center"
        }}
        open={this.state.open}
        autoHideDuration={autoHideDuration || 60000}
        onClose={this.handleClose}
        className={classes.notification}
        children={
          <div
            className={classes[variant]}
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {
                <div color="inherit" style={{ padding: "12px", paddingLeft: "20px" }}>
                  {variantIcon[variant]}
                </div>
              }
              <div className={classes.message}>{message}</div>
            </div>
            <IconButton
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
              style={{ position: "absolute", right: 0, top: 0, paddingRight: "10px", paddingLeft: "10px" }}
            >
              <Close />
            </IconButton>
          </div>
        }
      />
    )
  }
}

export default withStyles(styles)(SimpleSnackbar)
