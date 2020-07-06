import React, { useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { useLocalStorage } from 'react-use';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import { Provider } from "react-redux";
import Store from './Reducers/store'

import App from './App';

import * as serviceWorker from './serviceWorker';

function AppWithTheme() {
    const [darkMode, _setDarkMode] = useLocalStorage("darkMode", localStorage.getItem("darkMode") === true ? true : false);
    const setDarkMode = useCallback(_setDarkMode, []);
    const theme = useMemo(() => {
        return createMuiTheme({
            palette: {
                primary: {
                    main:  darkMode ? '#2e5b5b' : "#1f4141",
                },
                secondary: {
                    main: '#a05a00',
                },
                type: darkMode ? 'dark' : 'light',
                background: {
                    paper: darkMode ? "#242c2d" : "#efefef",
                    default: darkMode ? "#161e1d" : "#d6d6d6",
                },
                action: {
                    focus: "red"
                }
            }
        })
    }, [darkMode])

    return (
        <ThemeProvider theme={theme} >
            <Provider store={Store}>
                <App darkMode={darkMode} setDarkMode={setDarkMode} />
            </Provider>
        </ThemeProvider>
    )
}

ReactDOM.render(
    <AppWithTheme />,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
