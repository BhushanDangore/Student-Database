import React from 'react';
import { AppBar as AppBarDefault, Typography, Toolbar, IconButton, Button, makeStyles, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { logout } from './../Actions/index';

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

function AppBar({ handleDrawerToggle, setDarkMode, darkMode, user }) {

    const classes = useStyles();

    return (
        <AppBarDefault
            position="static"
            style={user.loggedIn ? null : { width: "100%" }}
            className={classes.appBar}>
            <Toolbar>
                {
                    user.loggedIn === true ?
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
                    user.loggedIn === null ? null : user.loggedIn ?
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
    )
}

export default React.memo(AppBar, (prvS, nextS) => {
    return prvS.darkMode === nextS.darkMode && prvS.user  === nextS.user;
});