import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Box, Button, Card, Grid, Typography} from "@material-ui/core";
import ButtonArrow from "./ButtonArrow";
import {Link} from "react-router-dom";
import Icon from "./ButtonArrow";



const FlowCurrentProgressCard: React.FC = props => {
// export default function OutlineSelect() {


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    };
    return (
        <Card style={{marginTop:"2em", marginBottom:"2em"}}>
            <Button
                component={Link}
                to="/dashboard/flow"
                variant="outlined"
                style={{ color: "primary", borderColor: "white" }}
                // className={classes.learnButton}
                // onClick={() => props.setValue(4)}
            >
                {/*<ButtonArrow width={10} height={10} fill="black" />*/}
                <Icon width={10} height={10} />

                <span style={{ marginRight: 10 }}>Back</span>
            </Button>
            <Grid
                container
                direction="row"
            >
                <Grid
                    item
                    style={{marginRight:"3em"}}
                >
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        // style={{marginBottom:"3em"}}
                        style={{padding:"2em"}}
                    >
                        <Typography variant={"subtitle2"}>Flow Complete</Typography>
                        <Typography variant={"h6"}>0/11</Typography>
                        {/*//TODO: this will have to change dynamically*/}
                    </Grid>
                </Grid>
                <Grid
                    item
                >
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"

                        style={{padding:"2em"}}
                    >
                        <Typography variant={"subtitle2"}>Current Flow</Typography>
                        <Box bgcolor="secondary.main" color={"white"} m={1} style={{padding:"0.2em"}}>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                // style={{marginBottom:"3em"}}
                            >
                                <Grid item>
                                    Home
                                </Grid>
                                <Grid item>
                                    Criteria
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}
export default FlowCurrentProgressCard;