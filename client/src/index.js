import React, { useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { useLocalStorage } from 'react-use';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

import App from './App';

import * as serviceWorker from './serviceWorker';

function AppWithTheme() {
    const [darkMode, _setDarkMode] = useLocalStorage("darkMode", localStorage.getItem("darkMode") === true ? true : false);
    const setDarkMode = useCallback(_setDarkMode, []);
    const theme = useMemo(() => {
        return createMuiTheme({
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
    }, [darkMode])

    return (
        <ThemeProvider theme={theme} >
            <App darkMode={darkMode} setDarkMode={setDarkMode} />
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
