import React, { useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { history } from '../../index.js'
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from "@material-ui/core/Grid";
import { IconButton, Typography, List, ListItem, ListItemText, Divider, Toolbar, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { logout, getAppAccessToken } from '../../actions/oauthActions';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 0,
    },

    list: {
        width: 200,

    },
    fullList: {
        width: 'auto',

    },
};

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const Header: React.FC<{ loggedInUser: any, classes: any, onDSPRSelection: boolean }> = props => {
    // const [menuOpen, setMenuOpen] = useState(false);

    const { classes, loggedInUser } = props;
    const location = useLocation()
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const menu =
        loggedInUser ?
            <List className={classes.list}>
                <ListItemLink component={Link} to="/contact-us">
                    <ListItemText primary="Contact Us" />
                </ListItemLink>
                <Divider />
                <ListItem button onClick={() => {
                    dispatch(logout());
                    dispatch(getAppAccessToken());
                    history.push('/');
                }}>
                    <ListItemText primary="Log Out" />
                </ListItem>
                <Divider />
                <ListItem button onClick={() => {
                }}>Refresh App</ListItem>
                <Divider />
            </List>
            :
            <List className={classes.list}>
                <ListItemLink component={Link} to="/login">
                    <ListItemText primary="Log In" />
                </ListItemLink>
                <Divider />
                <ListItemLink component={Link} to="/signup">
                    <ListItemText primary="Sign Up" />
                </ListItemLink>
                <Divider />
                <ListItemLink component={Link} to="/contact-us">
                    <ListItemText primary="Contact Us" />
                </ListItemLink>
                <Divider />
                <ListItem button onClick={() => {
                    handleClose();
                }}>Refresh App</ListItem>
                <Divider />
            </List>;


    return    (
        <>
        <AppBar position="static" className="app-bar">
            <Toolbar>

                <Typography variant="h3" color="inherit"  onClick={() => { history.push("/") }} style={{ margin: 'auto', width: 'auto' }}>
                    {/*<p className="h1 logo" style={{ padding: '0', margin: '0', position: 'absolute', whiteSpace: "nowrap", overflow: "hidden", left: "56px", right: "56px" }}>*/}
                        {/*<img src='/images/.png' alt="logo" style={{ height: '30px', top: '6px', position: 'relative', marginRight: '1px' }} />*/}
                        {/*Reflow<em style={{ color: '#7DAA55', fontSize: "80%", fontStyle: "normal" }}> Real</em>*/}
                        Reflow

                </Typography>
                <IconButton onClick={handleMenu}
                            className={classes.menuButton} color="inherit" aria-label="Menu"

                >
                    <MenuIcon />
                </IconButton>

            </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={handleClose}>
            <div
                tabIndex={0}
                role="button"
                onClick={handleClose}
                onKeyDown={handleClose}
            >
                {menu}
            </div>
        </Drawer>
        </>
)
}

export default withStyles(styles)(Header);
