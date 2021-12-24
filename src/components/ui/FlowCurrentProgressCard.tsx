import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Grid, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Icon from "./ButtonArrow";
import {shallowEqual, useSelector} from "react-redux";
import {State, Transaction} from "../../store/reduxStoreState";
import {getTransactionById} from "../../selectors/transactionSelectors";
import {useIsMount} from "../../hooks/useIsMount";



const FlowCurrentProgressCard: React.FC<any> = ({transactionId,isLoading}) => {
    const isMount = useIsMount();

    const [transactionsComplete, setIsTransactionsComplete] = useState(0);
    const transactions = useSelector<State , { [key: number]:Transaction}>(getTransactionById, shallowEqual);

    useEffect(()=>{
        if(!isMount){
            setIsTransactionsComplete(transactions[0].transactionsComplete);
        }
    },[isLoading]);

    return (
        <Card style={{marginTop:"2em", marginBottom:"2em"}}>
            <Button
                component={Link}
                to={`/dashboard/transaction/${transactionId}`}
                variant="outlined"
                style={{ color: "primary", borderColor: "white" }}

            >
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
                        style={{padding:"2em"}}
                    >
                        {isLoading? 'loading': console.log(transactionsComplete,"I LOVE transactions complete")}
                        <Typography variant={"subtitle2"}>Flow Complete</Typography>
                        {isLoading? 'loading': <div>{transactionsComplete} /11</div>}
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