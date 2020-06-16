import React from 'react';
import { makeStyles, Paper, Typography, Divider, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: `${theme.spacing(4)}px auto`,
    },
    fab: {
        position: "sticky",
        bottom: "16px",
        marginLeft: "calc(100% - 48px)",
        marginTop: "16px"
    },
}))

function PageContainer(props) {
    const {onFabClick, pageTitle} = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Paper variant="outlined" className={classes.root} style={{ position: "relative" }} >
                <Typography variant='h4' color='textSecondary' display='inline'>{ pageTitle }</Typography>
                <Divider style={{ margin: "15px 0px" }} />
                {
                    props.children
                }
                <Fab color="primary" aria-label="add" size="medium" className={classes.fab} onClick={onFabClick}>
                    <AddIcon />
                </Fab>
            </Paper>
        </React.Fragment>
    )
}

export default React.memo(PageContainer);