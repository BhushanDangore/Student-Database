import React, { useState, useEffect, Suspense, lazy, useReducer, useCallback } from 'react';

import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer';
import { CssBaseline, Container, makeStyles, LinearProgress } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { Home, AppBar, ProfileConfigure, Loading, LoginPage } from './Components';
import { appStateContext } from './Contexts/'
import reducer from './Reducers/'
import { getUser, setDispatchRef } from './Actions';
import useFetchDataWithLoading from './Utils/useLoading';

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
        }
    }
});
const initialState = {
    user: {
        loggedIn: null,
        loading: true,
    },
    classes: {
        array: null,
        loading: true,
    },
    students: {
        array: null,
        loading: true,
        isInitiallyLoaded: false,
    }
}

function App({ darkMode, setDarkMode }) {

    const classes = useStyles();

    const [state, dispatch] = useReducer(reducer, initialState)
    const [mobileOpen, setMobileOpen] = useState(false);    //Drawer Open State for Mobile UI
    const [loadingUser, fetchUser] = useFetchDataWithLoading(getUser, true, dispatch);

    setDispatchRef(dispatch);

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line
    }, [])
    
    // eslint-disable-next-line
    const handleDrawerToggle = useCallback((closeOnly) => setMobileOpen(closeOnly === true ? false : !mobileOpen), []);

    console.info("App State: ", state);

    return (
        <div className="App">
            <Router>
                <div className={classes.wrapper}>
                        <CssBaseline />
                        <AppBar handleDrawerToggle={handleDrawerToggle} setDarkMode={setDarkMode} darkMode={darkMode} user={ state.user } />
                        {loadingUser ? <Loading active={true} /> :
                            state.user.loggedIn ?
                                <React.Fragment>
                                    <appStateContext.Provider value={{ appState: state, dispatch }}>
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
                                        <ProfileConfigure />
                                    </appStateContext.Provider>
                                </React.Fragment>
                                :
                                <div className={classes.mainContent}>
                                    <Route path='/login' exact><LoginPage /></Route>
                                </div>
                        }
                </div>
            </Router>
        </div>
    );
}

export default App;