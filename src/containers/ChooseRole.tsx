import React from "react";
import {Card, CardHeader, CardContent, Grid, useMediaQuery, Typography, Button, ListItemText} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link  } from 'react-router-dom';
import openHouse from "../assets/openhouse.jpeg"
import {ListItem, List} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    mainContainer: {

        marginTop: "2em",
        [theme.breakpoints.down("md")]: {
            marginTop: "1em"
        },
        [theme.breakpoints.down("xs")]: {
            marginTop: "0.5em",
        }
    }
}))

const ChooseRole: React.FC<{}> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    return(<Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.mainContainer}
    >
        <Grid item>
            LOL
        </Grid>
        </Grid>)
}
export default React.memo(ChooseRole);