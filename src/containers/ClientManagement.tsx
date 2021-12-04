import React, { useState } from "react";
import { connect, shallowEqual, useSelector } from 'react-redux';
import { State, User } from '../store/reduxStoreState';
// import {
//     Grid,
//     Card,
//     CardContent,
//     CardActionArea,
//     CircularProgress,
//     Dialog,
//     // Button,
//     DialogTitle,
// } from '@material-ui/core';
// import {Add} from '@material-ui/icons';
// // eslint-disable-next-line
// // import { pressSpecialAdminButton } from "../actions/systemAdminActions"
//
// import ClientForm from './ClientForm';
//
// import { history } from "../index";
// // import { getAllUsers } from "../actions/userActions";//TODO: definitely do this
import { createClient } from "../actions/clientActions";
//
import {  getLoggedInUser } from "../selectors/userSelectors";
//
interface Props {
    users: { value: number, text: string }[],
    loggedInUser: User;
    getAllUsers: () => any,
}

function ClientManagement(props: Props) {
//     // eslint-disable-next-line
    const { users, getAllUsers, loggedInUser } = props;
//     const [showNewClientForm, setShowNewClientForm] = useState(false);
//     const [allUsersLoaded, setAllUsersLoaded] = useState(true)
//     const usersAll = useSelector<State, User[]>(getAllUsers, shallowEqual);
//
//     const isSystemAdmin: boolean = loggedInUser && loggedInUser.systemAdministrator;
//
//     if (!isSystemAdmin) {
//         history.push(`/`);
//     }
//
//     function handleNewDSPFormOpen() {
//         setAllUsersLoaded(false);
//         getAllUsers().then(() => {
//             setAllUsersLoaded(true)
//         });
//         setShowNewClientForm(true);
//     }
//
//     function handleNewDSPFormClose() {
//         setShowNewClientForm(false);
//     }
//
//     function handleDSPClick(dspId: string) {
//         history.push(`/dsp/${dspId}`);
//     }
//
//     function handleSubmit(newDSPFormValues) {
//         createClient(newDSPFormValues.userId);
//         handleNewDSPFormClose();
//     }
//
//     const userCards = usersAll ? usersAll.map(user => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
//             <Card className="dsp-card">
//                 <CardActionArea onClick={() => handleDSPClick(user.id.toString())}>
//                     <CardContent>
//                         {/*<h4>{user.name}</h4>*/}
//                         <div>Help</div>
//                     </CardContent>
//                 </CardActionArea>
//             </Card>
//         </Grid>)
//     ) : undefined
//
    return (<div>Hel</div>)
//         <main className='user-management'>
//             <h2>DSP Management</h2>
//
//             <h4>Users</h4>
//             <section >
//                 <Grid container>
//                     {userCards}
//                     {isSystemAdmin ?
//                         userCards ?
//                         <Grid item xs={12} sm={6} md={4} lg={3}>
//                             <Card>
//                                 <CardActionArea onClick={handleNewDSPFormOpen}>
//                                     <CardContent className="user-add">
//                                         <Add />
//                                         <h4>New Client</h4>
//                                     </CardContent>
//                                 </CardActionArea>
//                             </Card>
//                         </Grid>
//                         : <CircularProgress />
//                     :null}
//                 </Grid>
//                 {/* <Button variant="contained" color="primary" onClick={() => invalidateToken()}>Invalidate Token</Button> */}
//                 <Dialog
//                     title="New Delivery Service Provider"
//                     fullScreen={false}
//                     open={showNewClientForm}
//                     onClose={handleNewDSPFormClose}
//                 >
//                     <DialogTitle>Add A New DSP</DialogTitle>
//                     <ClientForm
//                         users={users}
//                         onSubmit={handleSubmit}
//                         onCancel={handleNewDSPFormClose}
//                         usersLoaded={allUsersLoaded}
//                     />
//                 </Dialog>
//             </section>
//         </main>
//     )
}
//
const mapStateToProps = (state: State) => {
    // const users = getUsersByName(state);
    return {
        // users,
        // loggedInUser: getLoggedInUser(state),
    };
};
//
const mapDispatchToProps = {
    // getAllUsers,
    // createClient,
    // pressSpecialAdminButton
}
//
export default connect(mapStateToProps, mapDispatchToProps)(ClientManagement)