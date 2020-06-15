import React, { useContext } from 'react';
import { appStateContext } from '../Contexts/';
import { Typography } from '@material-ui/core';

export default function Home() {
    const { appState }  = useContext(appStateContext)

    return (
        <React.Fragment>
            <Typography variant='h6'>
                Welcome, { appState.user.userName }
            </Typography>
        </React.Fragment>
    )
}
