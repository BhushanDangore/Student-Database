import React, {useContext} from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import axios from 'axios';
import { appStateContext } from '../../Contexts/';
import { REQUEST_FAILED, SET_SCHOOL_NAME } from './../../Actions/types';

export default function ProfileConfigure() {
    const { appState, dispatch } = useContext(appStateContext)
    const user = appState.user;
    const [config, setConfig] = React.useState({
        schoolName: "",
    });
    const [error, setError] = React.useState(false);
    const handleSave = () => {
        if(config.schoolName.length > 4){
            axios({
                method: 'POST',
                url: '/api/user/school-name',
                headers: {
                    'Content-Type' : 'application/json; charset=UTF-8',
                    'Accept': 'Token',
                    "Access-Control-Allow-Origin": "*",
                },
                data: JSON.stringify(config),
            })
            .then( res => {
                if(res.status === 201 && res.data.schoolName){
                    dispatch({type: SET_SCHOOL_NAME, payload: res.data})
                }
            })
            .catch( res => {
                dispatch({type: REQUEST_FAILED, payload: res.data})
            })
        }
        else return setError(true);
    }
    return (
        <React.Fragment>
            <Dialog
                open={!user.isProfileComplet}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">You Will Need To Complete Your Profile</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hello we need some information about your school/collage in order to make the best possible expirence for you.
                    </DialogContentText>
                    <TextField
                        placeholder='School/Collage Name'
                        label='School Name'
                        fullWidth
                        variant='outlined'
                        value={config.schoolName}
                        onChange={ (e)=>{ setConfig({...config, schoolName: e.target.value}) }}
                        error={config.schoolName.length  <= 4 && error} />
                </DialogContent>
                <DialogActions>
                    <Button href='/api/logout' >
                        Logout
                    </Button>
                    <Button onClick={handleSave} >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
