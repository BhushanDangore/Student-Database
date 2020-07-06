import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';

import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer';
import { CssBaseline, Container, makeStyles, LinearProgress } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { Home, AppBar, ProfileConfigure, LoginPage } from './Components';
import { connect } from "react-redux";
import { fetchUser } from './Actions/index';
import ErrorSnackBar from './Components/Miniatures/ErrorSnackBar';

const Students = lazy(() => import('./Components/Students'));
const Result = lazy(() => import('./Components/Result'));
const Classes = lazy(() => import('./Components/Classes'));
const Teachers = lazy(() => import('./Components/Teachers'));

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
    return {
        drawerMargin: {
            [theme.breakpoints.up('sm')]: {
                paddingLeft: drawerWidth + 10,
            },
        },
        wrapper: {
            display: "flex",
        },
        mainContent: {
            padding: '75px 0 0 0',
            flex: 1,
            overflow: "hidden",
        }
    }
});

const removeLoading = () => {
    const loader = document.getElementById('loadingIFrame')
    loader.addEventListener('transitionend', () => {
        loader.remove();
    })
    loader.classList.add("invisible");
}

function App(props) {

    const { darkMode, setDarkMode } = props

    const classes = useStyles();

    if (props.loggedIn === null) props.fetchUser();

    useEffect(() => {
        if (props.loggedIn !== null) removeLoading();
    }, [props.loggedIn])

    const [mobileOpen, setMobileOpen] = useState(false);    //Drawer Open State for Mobile UI

    // eslint-disable-next-line
    const handleDrawerToggle = useCallback((closeOnly) => setMobileOpen(closeOnly === true ? false : !mobileOpen), []);



    return (
        <div className="App">
            <Router>
                <div className={classes.wrapper}>
                    <CssBaseline />
                        <AppBar handleDrawerToggle={handleDrawerToggle} setDarkMode={setDarkMode} darkMode={darkMode} />
                        {props.loggedIn === null ? null :
                            props.loggedIn ?
                            <React.Fragment>
                                <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
                                <div className={classes.mainContent}>
                                    <Container>
                                        <Suspense fallback={<LinearProgress />}>
                                            <Switch >
                                                <Route path='/result' component={Result} />
                                                <Route path='/students' component={Students} />
                                                <Route path='/teachers' component={Teachers} />
                                                <Route path='/classes' component={Classes} />
                                                <Route path='/' component={Home} exact />
                                            </Switch>
                                        </Suspense>
                                    </Container>
                                </div>
                                {props.isProfileComplet ? null : <ProfileConfigure />}
                            </React.Fragment>
                            :
                            <div className={classes.mainContent}>
                                <Route path='/'><LoginPage /></Route>
                            </div>
                        }
                </div>
            </Router>
            <ErrorSnackBar />
        </div>
    );
}

export default connect(state => (state.user), { fetchUser })(App);