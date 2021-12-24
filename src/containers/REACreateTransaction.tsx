import {useState} from 'react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {connect, useDispatch, useSelector} from 'react-redux';

import {Card, CardContent, Grid, Typography, Divider} from '@material-ui/core';

import { createNewUser } from '../actions/userActions';
import { createTransaction } from '../actions/transactionActions'
import { attemptLogin } from '../actions/oauthActions';
import { getError } from "../selectors/errorSelector";
import {getLoggedInUser} from '../selectors/userSelectors';

import {history} from "../index";
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

    const loggedInUser = useSelector<State, User>(getLoggedInUser);


    const handleSubmit = values => {
        const responseFunc = response => {
            if (!response.error) {

            } else {
            }
        };

        createTransaction(values.firstName, values.lastName);
        history.push("/dashboard/flow");

    };

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
})

const mapDispatchToProps = {
    createTransaction,
    createNewUser,
    attemptLogin,

}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(REACreateTransaction));

