import { useState } from 'react';
import * as React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useLocation } from "react-router-dom";
import { history } from '../index.js'
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Typography, List, ListItem, ListItemText, Divider, Toolbar, Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { logout, getAppAccessToken } from '../actions/oauthActions';

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
    badge: {
        top: 12,
        right: 7,
        background: "black",
        backgroundSize: "50%",
        color: "white",
        width: '50%',
        height: '50%'
    },
};

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const Header: React.FC<{ loggedInUser: any, classes: any }> = props => {
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
                <ListItem button disabled={true}>
                    <ListItemText primary={`${loggedInUser.firstName} ${loggedInUser.lastName}`} />
                </ListItem>
                <Divider />
                <ListItemLink component={Link} to="/profile">
                    <ListItemText primary="Profile" />
                </ListItemLink>
                <Divider />
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
                    window.location.reload(true);
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
                    window.location.reload(true);
                    handleClose();
                }}>Refresh App</ListItem>
                <Divider />
            </List>;

    return <div>
        <AppBar position="static" className="app-bar">
            <Toolbar>
                <IconButton onClick={handleMenu}
                    className={classes.menuButton} color="inherit" aria-label="Menu">
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
    </div>
}

export default withStyles(styles)(Header);
