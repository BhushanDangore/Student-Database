import React from 'react';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';

function Home({userName}) {

    return (
        <React.Fragment>
            <Typography variant='h6'>
                Welcome, { userName }
            </Typography>
        </React.Fragment>
    )
}

export default connect(store => (store.user))(Home)