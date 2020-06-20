import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';
import { GridLoader } from 'halogenium';
import { Transition } from 'react-transition-group';

const transitionStyles = {
    exiting: { opacity: 0 },
};

const useStyles = makeStyles({
    loader: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 10000,
        flexDirection: 'column',
        alignItems: 'center',
        transition: `opacity 200ms ease`,
        opacity: 1,
    }
})

export default function Loading({ active }) {

    const classes = useStyles();
    console.log("loading")
    return (
        <Transition in={active} timeout={200} unmountOnExit>
            {state => (
                    <Paper className={classes.loader} style={{...transitionStyles[state]}}>
                        <GridLoader color="#26A65B" size="25px" margin="4px" />
                        <Typography variant='h4'>WAIT A MOMENT</Typography>
                    </Paper>
            )}
        </Transition>
    )
}
