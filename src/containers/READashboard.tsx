import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import {
    FormControlLabel,
    TextField,
    Button,
    Checkbox,
    Grid,
    InputAdornment,
    Typography,
    Divider, Card, useMediaQuery
} from '@material-ui/core';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import {makeStyles, useTheme} from "@material-ui/core/styles";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {Agent, State, Transaction, User} from "../store/reduxStoreState";
import {getLoggedInUser} from "../selectors/userSelectors";
import {createClient} from "../actions/clientActions";
import {createAgent, getAgentByToken} from "../actions/agentActions";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getAgentById, getAgentFromProps, getAgents} from "../selectors/agentSelectors";
import { useIsMount} from "../hooks/useIsMount";
import {getAllTransactions, getTransaction} from "../actions/transactionActions";
import {getTransactions} from "../selectors/transactionSelectors";

const renderTextField = ({
                             input,
                         }) => (
    <TextField
        id="input-with-icon-textfield" variant="outlined"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <AlternateEmailIcon />
                </InputAdornment>
            ),
        }}
    />
)

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
interface Props {
    createClient: (userId: number) => any,
    createAgent: (userId: number) => any,
    getAgent:(agentId: number) => any,
    loggedInUser: User;
}
const READashBoard = (props: Props) => {
    const isMount = useIsMount();
    // const { handleSubmit, enableButton } = props;
    const { createClient,loggedInUser,createAgent } = props;
    const [agentId, setAgentId] = useState(1);
    // const { agentId } = useParams<{agentId}>();
    // const dspr = useSelector<State, DSPR>(state => getDSPRFromProps(state, {dsprId}), shallowEqual);
    // const agent = useSelector<State, Agent>(state => getAgentFromProps(state,{agentId}), shallowEqual);
    // const agent = useSelector<State, Agent>(state => getAgents(state));
    //export const getDSPRServiceAreasFromComponentState = (state: State, props) => Object.values(state.componentState.dsprServiceAreaManagementContainer.dsprServiceAreas).filter(serviceArea => serviceArea.dspr === parseInt(props.dpsrId))
    // const users = useSelector<State, { value: number, text: string }[]>(getUsersByName, shallowEqual);
    // const agents = useSelector<State, { [key: number]: Agent }>(getAgents, shallowEqual);
    const agents = useSelector<State, { [key: number]: Agent }>(getAgentById, shallowEqual);
    // const transactions = useSelector<State , { value: number, text:string}[]>(getTransactions, shallowEqual);
    // const transactions = useSelector<State , {[key: number]: Transaction}>(getTransactions, shallowEqual);
    // const transactions = useSelector<State , {[key: number]: Transaction}>(getTransactions, shallowEqual);
    // const transactions = useSelector<State , any[] | any | Transaction>(getTransactions, shallowEqual);
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactions, shallowEqual);
    console.log(transactions,"this is transactions")
    // const agentsByIder = useSelector<State,any>()
    // const agents = useSelector<State, { value: number, text: string }[] }>(getAgents, shallowEqual);
    function getIdOfAgent(){
        // return agents
    }
    // console.log(agent,'this is agent');

    // console.log(agentId,'this is agent');
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        // console.log(agentId,"something");
        dispatch<any>(getAgentByToken())//getAgentHere
            .then(() => setIsLoading(false));
        // console.log(agents,"Im here");
    }, []);
    useEffect(() => {
        if(!isMount){

        console.log(agents,"how many times dispatched");
            // dispatch<any>(getAllTransactions(agents[0].id))//getAgentHere
            // dispatch<any>(getAllTransactions(1));//getAgentHere
            dispatch<any>(getTransaction(1));
        // console.log(lollol,"how many times dispatchedlolol");

        }
    //    agents
    }, [isLoading]);
    // }, [dispatch,agents]);

    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));
    return (
        <React.Fragment>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{marginBottom:"3em"}}
            >
            <Card style={{padding:"2em",marginTop:"2em", marginBottom:"2em"}}>
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
                            >
                        <Typography variant={"subtitle2"}>Active Buyers</Typography>
                        <Typography variant={"h6"}>0</Typography>
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
                            // style={{marginBottom:"3em"}}
                        >
                            <Typography variant={"subtitle2"}>Completed Transactions</Typography>
                            <Typography variant={"h6"}>0</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        <Card style={{padding:"2em"}}>
            <Grid container direction={"row"}>
                <Typography  variant={"subtitle2"} style={{marginRight: "10em"}} gutterBottom>Buyers</Typography>
                {/* onClick={handleSubmit} disabled={!enableButton}*/}
                <Button component={Link}  to="/rea/create_transaction" color="primary" variant="contained"
                    // style={{
                    //     height: 45,
                    //     width: 100,}}
                        style={{marginBottom: "0.5em"}}
                >
                    + Invite
                </Button>
            </Grid>
                <Divider style={{marginBottom:"2em"}} />
                {/*<Grid container direction={"row"} style={{padding:"2em"}}>*/}
                {/*</Grid>*/}
            <Grid>
                <> <Typography align={"center"}variant={"h6"}>
                    Invite a home buyer </Typography>
                </>
                <Typography align={"center"}variant={"h6"}>
                    to get started
                </Typography>
                {/*{isLoading?'loading':<div>"LOADED"</div>}*/}
                {/*{isLoading?'loading':agents.map(agent => <div>{agent.id}</div>)}}*/}
                {/*{isMount? 'loading': agents.map(agent => <div>{agent.id}</div>)}*/}
                {/*{isLoading? 'loading': transactions.map(transaction => <div>{transaction.id}</div>)}*/}
                {isLoading? 'loading': Object.keys(transactions).map(transaction => <div>{transaction}</div>)}
                {/*{isLoading? 'loading': Object.keys(transactions).map(transaction => <div>{transaction}</div>)}*/}
                {/*{isLoading?  'loading': <div>{transactions[1].firstName}</div>}*/}
                {/*{isLoading? 'loading': Object.values(transactions).map(transaction => <div>{transaction.id}</div>)}*/}
                {/*{isLoading? 'loading': Object.entries(transactions).map(([key, value]) => <div>{key} key works</div>)}*/}
                {isLoading? 'loading': Object.entries(transactions).map(([key, value]) => <div>{value.firstName} {value.lastName}</div>)}
                {isLoading? 'loading': Object.entries(transactions).map(([key, value]) => console.log(value["firstName"],"MI VALUEA"))}
                {/*{isLoading? 'loading': Object.entries(transactions).map(([key, value]) => value.firstName )}*/}
                {/*    return (*/}
                {/*        <div>*/}
                {/*            {key} = {value}*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
                {/*{isLoading? 'loading': <div>{transactions.id}</div>}*/}
            </Grid>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{marginTop: "1.5em"}}
                >

                </Grid>
            </Card>
            </Grid>
        </React.Fragment>
    );
};

const validate = values => {
    const errors:any = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    }
    return errors;
};


export default READashBoard;