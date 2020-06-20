import React, { useContext, useEffect } from 'react';
import { AppBar as AppBarDefault, Typography, Toolbar, IconButton, Button, makeStyles, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { appStateContext } from '../Contexts/';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { logout } from './../Actions/index';
import { getUser } from '../Actions';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "fixed",
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        top: 0,
        right: 0,
        left: 'auto',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    margin: {
        marginRight: "12px"
    }
}));



function AppBar({ handleDrawerToggle, setDarkMode, darkMode, dispatch }) {
    const { appState } = useContext(appStateContext);
    const user = appState.user;
    const classes = useStyles();
    useEffect(() => {
        getUser(dispatch);
        // eslint-disable-next-line
    }, [])

    console.log("App Bar rendered")
    return (
        <React.Fragment>
            <AppBarDefault
                position="static"
                style={appState.user.loggedIn ? null : { width: "100%" }}
                className={classes.appBar}>
                <Toolbar>
                    {
                        appState.user.loggedIn === true ?
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} className={classes.menuButton}>
                                <MenuIcon />
                            </IconButton>
                            :
                            null
                    }
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Student Portal
                    </Typography>
                    <IconButton aria-label="Toggle Theme" className={classes.margin} size="small" onClick={() => setDarkMode(!darkMode)}>
                        <Brightness4Icon />
                    </IconButton>
                    {
                        appState.user.loggedIn === null ? null : appState.user.loggedIn ?
                            <React.Fragment>
                                <Button color="inherit" variant="outlined" size='small' href="/api/logout" onClick={logout} className={classes.margin} > Logout </Button>
                                <Avatar alt={user.userName} src={user.profilePic} />
                            </React.Fragment>
                            :
                            <Link to='/login'>
                                <Button color="inherit" variant="outlined" size='small'>Login</Button>
                            </Link>
                    }
                </Toolbar>
            </AppBarDefault>
        </React.Fragment>
    )
}

export default React.memo(AppBar, (prvS, nextS) => {
    return prvS.darkMode === nextS.darkMode
});