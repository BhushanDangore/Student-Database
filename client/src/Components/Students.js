import React, { useState, useContext, useEffect } from 'react';
import { Paper, makeStyles, Typography, Fab, Divider, Dialog, DialogTitle, DialogContent, DialogActions, Button, LinearProgress, TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AddStudentForm from './Miniatures/AddStudentForm';
import { appStateContext } from '../Contexts';
import { getClasses, getStudents } from '../Actions';

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
    form: {
        '& > *': {
            margin: `${theme.spacing(1)}px 0`,
        },
        margin: `${theme.spacing(1)}px 0`,
    },
    dialogContainer: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: theme.spacing(2),
        boxSizing: 'border-box'
    },
    multifields: {
        display: "flex",
        '& > *': {
            flex: 1,
        },
    }
}))

export default function Students() {
    const classes = useStyles();

    const { appState, dispatch } = useContext(appStateContext);

    const [config, setConfig] = useState({
        loading: true,
        addStudentDialogOpen: false,
        noClassesInProfileDialog: false,
    })

    useEffect(() => {
        if (appState.classes === null) getClasses(dispatch);
        if (appState.students === null) getStudents(dispatch);
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(appState.classes && appState.students) setConfig({...config, loading: false, addStudentDialogOpen: false});
        // eslint-disable-next-line
    }, [appState.classes, appState.students])

    const toggleFAB = () => {

        if (appState.classes.length === 0) return setConfig({ ...config, addStudentDialogOpen: false, noClassesInProfileDialog: true })

        setConfig({ ...config, addStudentDialogOpen: !config.addStudentDialogOpen });
    }

    return (
        <React.Fragment>
            <Paper variant="outlined" className={classes.root} style={{ position: "relative" }}>
                <Typography variant='h4' color='textSecondary' display='inline'>Students Section</Typography>
                <Divider style={{ margin: "15px 0px" }} />

                {
                    config.loading ? <LinearProgress /> :
                        <React.Fragment>
                            {
                                <TableContainer>
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Class</TableCell>
                                                <TableCell>Gender</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                appState.students.length === 0 ? <TableRow ><TableCell colSpan={3} >No Record Found.</TableCell></TableRow> : null
                                            }
                                            {
                                                appState.students.map((stud, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell component="th" scope="row">{ `${stud.name.firstName} ${stud.name.lastName}` }</TableCell>
                                                        <TableCell align="left">{stud.class.className}</TableCell>
                                                        <TableCell align="left">{stud.gender}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                            <Fab color="primary" aria-label="add" size="medium" className={classes.fab} onClick={toggleFAB}>
                                <AddIcon />
                            </Fab>
                            <Dialog open={config.noClassesInProfileDialog} onClose={() => { setConfig({ ...config, noClassesInProfileDialog: false }) }}>
                                <DialogTitle>We need Some More Data</DialogTitle>
                                <DialogContent>In order to create student you will need to add class first</DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setConfig({ ...config, noClassesInProfileDialog: false })} >Okey</Button>
                                </DialogActions>
                            </Dialog>
                            <AddStudentForm open={config.addStudentDialogOpen} toggleFAB={toggleFAB} />
                        </React.Fragment>
                }
            </Paper>
        </React.Fragment>
    )
}
