import React from 'react';
import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ClassIcon from '@material-ui/icons/Class';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cloaseDrawer } from '../Actions'

const drawerWidth = 240;
const container = window.document.body;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function ResponsiveDrawer({ dispatch, mobileOpen }) {
    const classes = useStyles();
    
    // eslint-disable-next-line
    const closeDrawer  = () => dispatch(cloaseDrawer)
    
    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                <Link to='/' onClick={closeDrawer}>
                    <ListItem button>
                        <ListItemIcon><HomeIcon /></ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>
                </Link>
                <Link to='/result' onClick={closeDrawer}> 
                    <ListItem button>
                        <ListItemIcon><AssignmentTurnedInIcon /></ListItemIcon>
                        <ListItemText primary={"Result"} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link to='/students' onClick={closeDrawer}>
                    <ListItem button>
                        <ListItemIcon><LocalLibraryIcon /></ListItemIcon>
                        <ListItemText primary={"Students"} />
                    </ListItem>
                </Link>
                <Link to='/teachers' onClick={closeDrawer}>
                    <ListItem button>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary={"Teacher"} />
                    </ListItem>

                </Link>
                <Link to='/classes' onClick={closeDrawer}>
                    <ListItem button>
                        <ListItemIcon><ClassIcon /></ListItemIcon>
                        <ListItemText primary={"Classes"} />
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={closeDrawer}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default connect(store=> (store.config))(ResponsiveDrawer);