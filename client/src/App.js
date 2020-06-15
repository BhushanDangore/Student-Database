import React, { useEffect, useState, Suspense, lazy, useReducer } from 'react';

import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer';
import { CssBaseline, Container, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { useLocalStorage } from 'react-use';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router';
import { Home, AppBar, ProfileConfigure, Loading, LoginPage } from './Components';
import { appStateContext } from './Contexts/'
import reducer from './Reducers/'
import { getUser } from './Actions';

const Students = lazy(() => import('./Components/Students'));
const Result = lazy(() => import('./Components/Result'));
const Classes = lazy(() => import('./Components/Classes'));
const Teachers = lazy(() => import('./Components/Teachers'));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

function App() {

    const [darkMode, setDarkMode] = useLocalStorage("darkMode", localStorage.getItem("darkMode") === true ? true : false);

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#576767',
            },
            secondary: {
                main: '#e45e2a',
            },
            type: darkMode ? 'dark' : 'light',
        }
    })

    const [mobileOpen, setMobileOpen] = useState(false);    //Drawer Open State for Mobile UI
    const classes = useStyles();

    const initialState = {
        user: {
            loggedIn: null,
            loading: true,
        },
        classes: null,
        students: null,
    }
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        getUser(dispatch);
    }, [])

    const handleDrawerToggle = (closeOnly) => {
        if (closeOnly === true) return setMobileOpen(false);
        else return setMobileOpen(!mobileOpen);
    };

    console.info("App State Data: ", state);

    return (
        <div className="App">
            <appStateContext.Provider value={{ appState: state, dispatch }}>
                <ThemeProvider theme={theme}>
                    <Router>
                        <div className={classes.wrapper}>
                            <CssBaseline />
                            <AppBar handleDrawerToggle={handleDrawerToggle} setDarkMode={setDarkMode} darkMode={darkMode} />
                            <Loading active={state.user.loading} />
                            {state.user.loggedIn === null ? null :
                                state.user.loggedIn ?
                                    <React.Fragment>
                                        <ResponsiveDrawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
                                        <div className={classes.mainContent}>
                                            <Container>
                                                <Suspense fallback={<Loading active={true} />}>
                                                    <Switch >
                                                        <Route path='/result' component={Result} exact />
                                                        <Route path='/students' component={Students} exact />
                                                        <Route path='/teachers' component={Teachers} exact />
                                                        <Route path='/classes' component={Classes} exact />
                                                        <Route path='/' component={Home} />
                                                    </Switch>
                                                </Suspense>
                                            </Container>
                                        </div>
                                        <ProfileConfigure />
                                    </React.Fragment>
                                    :
                                    <div className={classes.mainContent}>
                                        <Route path='/login' exact><LoginPage /></Route>
                                    </div>
                            }
                        </div>
                    </Router>
                </ThemeProvider>
            </appStateContext.Provider>
        </div>
    );
}

export default App;