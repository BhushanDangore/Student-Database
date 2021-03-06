import React, { useState, Suspense, lazy, useReducer } from 'react';

import './App.css';

import ResponsiveDrawer from './Components/ResponsiveDrawer';
import { CssBaseline, Container, makeStyles, createMuiTheme, ThemeProvider, LinearProgress } from '@material-ui/core';
import { useLocalStorage } from 'react-use';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import { Home, AppBar, ProfileConfigure, Loading, LoginPage } from './Components';
import { appStateContext } from './Contexts/'
import reducer from './Reducers/'

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
    },
}


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
    const classes = useStyles();
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const [mobileOpen, setMobileOpen] = useState(false);    //Drawer Open State for Mobile UI

    const handleDrawerToggle = (closeOnly) => {
        if (closeOnly === true) return setMobileOpen(false);
        else return setMobileOpen(!mobileOpen);
    }

    console.info("App State Data: ", state);

    return (
        <div className="App">
            <appStateContext.Provider value={{ appState: state, dispatch }}>
                <ThemeProvider theme={theme} >
                    <Router>
                        <div className={classes.wrapper}>
                            <CssBaseline />
                            <AppBar handleDrawerToggle={ handleDrawerToggle } setDarkMode={setDarkMode} darkMode={darkMode} dispatch={dispatch} />
                            { state.user.loggedIn === null ? <Loading active={state.user.loading} /> :
                                state.user.loggedIn ?
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