import {Component, useEffect, useState} from 'react';
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';
import ReactDOM from 'react-dom';

import {Card, CardHeader, CardContent, Grid, Typography, Divider} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { createTransaction } from '../actions/transactionActions'
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import {getLoggedInUser, getLoggedInUserId} from '../selectors/userSelectors';
// import {window} from 'browser-monads'

import SignUpForm from './SignUpForm';
import {history} from "../index";
import REABuyerEmailForm from "./REABuyerEmailForm";
import REACreateTransactionForm from "./REACreateTransactionForm";
import {State, User} from "../store/reduxStoreState";

type newTransactionValues = {
    firstName: string;
    lastName: string;
    reaId: Number;
}
interface REACreateTransactionProps {
    createTransaction:(
        firstName: string,
        lastName: string
    ) => any;

}

const REACreateTransaction: React.FC<REACreateTransactionProps> = props => {

    const {
        createTransaction,

    } = props;
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [enableButton, setEnableButton] = useState(false);
    const dispatch = useDispatch();
    // const isManagerForCurrentDSPR: boolean = activeDSPRManagersForUser && activeDSPRManagersForUser.filter(dsprManager => dsprManager.dspr === parseInt(dsprId)).length > 0;
    // const loggedInUserId: number = getLoggedInUserId;
    const loggedInUser = useSelector<State, User>(getLoggedInUser);
    // componentWillReceiveProps = newProps => {
    //     if (newProps.errorMessage) {
    //         this.setState({
    //             errorMessage: newProps.errorMessage,
    //             enableButton: true,
    //         });
    //     }
    // }

    const handleSubmit = values => {
        const responseFunc = response => {
            if (!response.error) {

            } else {
            }
        };

        // dispatch<any>(getUsersBySearch(userSearchTerm))
        //     .then((response) => {
        //
        //         if (response.type === GET_USERS_BY_SEARCH_SUCCESS) {
        //             setSearchedUsers(response.response.entities.searchUsers);
        //         }
        //
        //         if (response.type === GET_USER_ID_DOCUMENT_FAILURE) {
        //             setShowErrorMessage(true);
        //             setMessageText(response.error ? `Error Retrieving users! ${response.error}` : 'Failed to complete user search');
        //         }
        //         setIsLoading(false);
        //     })
        createTransaction(values.firstName, values.lastName);
        history.push("/dashboard/flow");




        // this.setState({ enableButton: false }, ()=>{
        //     //, loggedInUserId
        //     this.props.createTransaction(values.firstName, values.lastName).then(response => {
        //             if (!response.error) {
        //                 responseFunc(response)
        //             } else {
        //                 this.setState({ enableButton: true });
        //                 return;
        //             }
        //         });
        // })
        // this.setState({ enableButton: false }, ()=>{
        //     //, loggedInUserId
        //     this.props.createTransaction(values.firstName, values.lastName).then(response => {
        //             if (!response.error) {
        //                 responseFunc(response)
        //             } else {
        //                 this.setState({ enableButton: true });
        //                 return;
        //             }
        //         });
        // })
        // this.setState({ enableButton: false }, () => {
            // this.props.createNewUser(userSignUpValues).then(response => {
            //     if (!response.error) {
            //         responseFunc(response)
            //     } else {
            //         this.setState({ enableButton: true });
            //         return;
            //     }
            // });

            // this.setState({ user: userSignUpValues });
        //
        // })
    };

    // render() {
        return (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{
                            marginTop:"2em"
                            }}
                    >
                        <Card style={{padding:"0.7em"}}>
                            <Typography align={"center"}  variant={"h5"}  gutterBottom>Create Transaction</Typography>
                            {/* onClick={handleSubmit} disabled={!enableButton}*/}
                            <Divider style={{marginBottom:"0.5em"}} />
                            <Typography align={"center"}  variant={"subtitle1"}  gutterBottom></Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                Who do you plan on creating
                            </Typography>
                            <Typography align={"center"}  variant={"subtitle2"}  >
                                 this transaction for?
                            </Typography>
                        <Card className="card-with-form" style={{ boxShadow: 'none' }}>

                            <CardContent>
                                {/*{this.state.errorMessage && <div className={'msg-style error'}>{this.state.errorMessage}</div>}*/}
                                <REACreateTransactionForm onSubmit={handleSubmit}
                                                          enableButton={enableButton}/>
                            </CardContent>
                        </Card>
                        </Card>
                    </Grid>
                )

    // }
}

const mapStateToProps = state => ({
    loggedInUser: getLoggedInUser(state),
    errorMessage: getError(state),
    // loggedInUserId: getLoggedInUserId(state)
})

const mapDispatchToProps = {
    createTransaction,
    createNewUser,
    attemptLogin,

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(REACreateTransaction));

