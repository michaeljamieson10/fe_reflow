import { createMuiTheme } from "@material-ui/core/styles";

const arcBlue = "#0B72B9";
const arcPurple = "#7A64D3";
const arcOrange = "#F07835";
const arcGrey = "#868686";

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange
    },
    primary: {
      main: arcPurple
    },
    secondary: {
      main: arcOrange
    }
  },
  typography: {
    tab: {
      fontFamily: "Avantgarde",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem"
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white"
    },
    h2: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: "black",
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Roboto",
      fontWeight: 700,
      fontSize: "2.0rem",
      color: "black",
      lineHeight: 1.5
    },
    h4: {
      fontFamily: "Roboto",
      fontSize: "1.75rem",
      color: "black",
      fontWeight: 700
    },
    h5: {
      fontFamily: "Roboto",
      fontSize: "1.55rem",
      color: "black",
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Roboto",
      color: "black"
    },
    h7: {
      fontFamily: "Roboto",
      fontSize: "0.55rem",
      color: "black",
      fontWeight: 700
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: "black"
    },
    subtitle2: {
      color: "black",
      fontWeight: 370,
      fontSize: "0.85rem"
    },
    body1: {
      fontSize: "1.25rem",
      color: arcGrey,
      fontWeight: 300
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: arcGrey
    },
    learnButton: {
      borderColor: arcPurple,
      borderWidth: 2,
      textTransform: "none",
      color: arcBlue,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: arcPurple,
        fontSize: "1rem"
      }
    },
    MuiInput: {
      root: {
        color: arcPurple,
        fontWeight: 300
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${arcPurple}`
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${arcPurple}`
        }
      }
    }
  }
});
