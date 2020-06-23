import React from 'react'
import { makeStyles, Dialog, Typography, TextField, Button, Divider } from '@material-ui/core';
import { saveClassDataInDB } from './../../Actions/index';
import useFetchDataWithLoading from './../../Utils/useLoading';

const useStyles = makeStyles((theme) => ({
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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}))

export default function AddClassForm({open, closeForm}) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        className: "",
        classNumber: 0,
    })
    const [error, setError] = React.useState(false)

    const [isSaving, saveClassToServer ] = useFetchDataWithLoading(saveClassDataInDB);

    const saveClassData = () => {
        if(state.className !== "" && state.classNumber > 0) return saveClassToServer(state);
        setError(true);
    }

    return (
        <React.Fragment>
            <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={closeForm}>
            <div className={`${classes.dialogContainer} ${classes.form}`}>
                <Typography variant='h6' >Add Student</Typography>
                <Divider />
                <TextField
                    placeholder='Class Name'
                    label='Class Name'
                    value={state.className}
                    onChange={(e) => {setState({...state, className: e.target.value })}}
                    error={state.className === "" && error} />
                <TextField
                    placeholder='Class Name'
                    label='Class Name'
                    value={state.classNumber}
                    type='number'
                    onChange={(e) => {setState({...state, classNumber: e.target.value })}}
                    error={state.classNumber === 0 && error} />
                <Button 
                    onClick={saveClassData} 
                    fullWidth 
                    color='secondary' 
                    variant='contained'
                    disabled={isSaving}
                    >
                        Save
                </Button>
            </div>
        </Dialog>
        </React.Fragment>
    )
}
