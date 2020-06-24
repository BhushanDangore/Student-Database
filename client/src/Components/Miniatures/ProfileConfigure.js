import React from 'react';
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { saveProfileConfiguration } from '../../Actions';

function ProfileConfigure(props) {

    const [config, setConfig] = React.useState({
        schoolName: "",
    });
    const [error, setError] = React.useState(false);
    const handleSave = () => {
        if(config.schoolName.length > 4){
            props.saveProfileConfiguration(config);
        }
        else return setError(true);
    }
    return (
        <React.Fragment>
            <Dialog
                open={true}
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

export default connect(store => (store.user), { saveProfileConfiguration })(ProfileConfigure)