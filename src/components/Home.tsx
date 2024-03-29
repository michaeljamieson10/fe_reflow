import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {Grid, useMediaQuery, Typography, Button, ListItemText} from "@material-ui/core";
import { Link  } from 'react-router-dom';
import openHouse from "../assets/openhouse.jpeg"
import {ListItem, List} from "@material-ui/core";
import Brightness1Icon from '@material-ui/icons/Brightness1';

const useStyles = makeStyles(theme => ({
  animation: {
    maxWidth: "50em",
    minWidth: "21em",
    marginTop: "2em",
    marginLeft: "10%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "30em"
    }
  },

  buttonContainer: {
    marginTop: "1em"
  },
  learnButtonHero: {
    fontSize: "0.9rem",
    height: 45,
    width: 145
  },
  learnButton: {
    color: "white",
    fontSize: "0.7rem",
    height: 35,
    padding: 5,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em"
    }
  },
  mainContainer: {

    marginTop: "2em",
    [theme.breakpoints.down("md")]: {
      marginTop: "1em"
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "0.5em",
    }
  },
  heroTextContainer: {
    minWidth: "21.5em",
    marginLeft: "1em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0
    }
  },
  specialText: {
    fontFamily: "Pacifico",
    // color: theme.palette.common.orange
  },
  subtitle: {
    marginBottom: "1em"
  },
  icon: {
    marginLeft: "2em",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    }
  },
  serviceContainer: {
    marginTop: "12em",
    [theme.breakpoints.down("sm")]: {
      padding: 25
    }
  },
  revolutionBackground: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%"
  },
  revolutionCard: {
    position: "absolute",
    boxShadow: theme.shadows[10],
    borderRadius: 15,
    padding: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "8em",
      paddingBottom: "8em",
      paddingLeft: 0,
      paddingRight: 0,
      borderRadius: 0,
      width: "100%"
    }
  },
  infoBackground: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100%",
    width: "100%"
  }
}));
const Home: React.FC<{}> = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
  return (
      <Grid container direction="column" className={classes.mainContainer}>
          {" "}
          {/*-----Hero Block-----*/}
          <Grid container justify="flex-end" alignItems="center" direction="row">
            <Grid sm item className={classes.heroTextContainer}>
              <Typography variant={matchesXS ? "h3" : "h2" } align="center">
                The new way of doing
                <br />
                real estate
              </Typography>
              <Typography style={{fontWeight: "bold"}} variant="subtitle1" align="center" className={classes.subtitle}>
                Let us help drive the home buying process from pre-approval to close.
              </Typography>
              <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{marginBottom:"3em"}}
              >
                <Grid item style={{marginBottom: "1em"}}>
                  <Button component={Link} to="/rea"  variant={"contained"} color={"primary"} style={{paddingLeft: "2.9em",paddingRight: "2.9em"}}className={classes.learnButton}> Get Started</Button>
                </Grid>
                <Grid item>
                  <Button variant={"outlined"} color={"primary"} >Request Demo</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{marginBottom: "2em"}}
            >
              <Grid item

              >
                <img
                    className={classes.icon}
                    alt="Real estate people"
                    src={openHouse}
                    style={{
                      height: matchesXS ? "23em" : matchesSM ? "25em" : "35em",
                      width: matchesXS ? "25em" : matchesSM ? "40em" : "55em"

                    }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{marginBottom:"3em", backgroundColor:"#56504F"}}
          >
            <Typography variant="h3" align="center" style={{color:"white"}}>
              Redesigning the flow of
            </Typography>
            <Typography variant="h3" align="center" style={{color:"white"}}>
            real estate transactions
            </Typography>
          </Grid>
          <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{marginBottom:"3em"}}
          >
            <Typography variant="h3" align="center" color={"primary"} >
              Our Features
            </Typography>
            <List>
              <ListItem>
                <Brightness1Icon fontSize="small" style={{ marginLeft: "-2.75em", paddingRight:"0.5em" }}/>
                <ListItemText>
                  Digital first experience
                  </ListItemText>
              </ListItem>
              <ListItem>

                <Brightness1Icon fontSize="small" style={{ marginLeft: "-2.75em", paddingRight:"0.5em" }}/>
                <ListItemText>
                  Identify key milestones
                </ListItemText>
              </ListItem>
              <ListItem>
                <Brightness1Icon fontSize="small" style={{ marginLeft: "-2.75em", paddingRight:"0.5em" }}/>
                <ListItemText>
                  Smart Notifications
                </ListItemText>
              </ListItem>
              <ListItem>

                <Brightness1Icon fontSize="small" style={{ marginLeft: "-2.75em", paddingRight:"0.5em" }}/>
                <ListItemText>
                  Track your deals
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
      </Grid>
  )
}

export default React.memo(Home);