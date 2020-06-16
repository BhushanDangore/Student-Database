import React, { useEffect } from 'react'
import { makeStyles, Paper, Typography, Divider, Fab, TableContainer, Table, TableHead, TableBody, TableCell, TableRow, LinearProgress } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { appStateContext } from '../Contexts';
import AddClassForm from './Miniatures/AddClassForm';
import { getClasses } from '../Actions';
import { Link } from 'react-router-dom';

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

}
))

export default function Classes() {

    const classes = useStyles();
    const { appState, dispatch } = React.useContext(appStateContext);
    const [config, setConfig] = React.useState({
        addClassDialogOpen: false,
        loading: true,
    })

    useEffect(() => {
        if(appState.classes) return setConfig({...config, loading: false});
        getClasses(dispatch);
        setConfig({ addClassDialogOpen: false, ...config });

        // eslint-disable-next-line
    }, [appState.classes])

    const toggleFAB = () => {
        setConfig({ addClassDialogOpen: !config.addClassDialogOpen })
    }
        
    const getClassesTable = () => {
        return (
            <TableContainer>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            appState.classes.length === 0 ? <TableRow ><TableCell colSpan={2} >No Record Found.</TableCell></TableRow> : null
                        }
                        {appState.classes.map(row => (
                            <Link 
                                to={"classes/"+row.className} 
                                key={row.classNumber} 
                                style={{color: "inherit", 
                                        display: "table-row", 
                                        outline: 0, 
                                        verticalAlign: "middle"}
                                }>
                                <TableCell scope="row">{row.className}</TableCell>
                                <TableCell align="left">{row.classNumber}</TableCell>
                            </Link>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <React.Fragment>
            <Paper variant="outlined" className={classes.root} style={{ position: "relative" }}>
                <Typography variant='h4' color='textSecondary' display='inline'>Classes Section</Typography>
                <Divider style={{ margin: "15px 0px" }} />
                {
                    appState.classes ? getClassesTable() : config.loading ? <LinearProgress /> : null
                }
                <Fab color="primary" aria-label="add" size="medium" className={classes.fab} onClick={toggleFAB}>
                    <AddIcon />
                </Fab>
            </Paper>
            <AddClassForm open={config.addClassDialogOpen} closeForm={toggleFAB} />
        </React.Fragment>
    )
}
