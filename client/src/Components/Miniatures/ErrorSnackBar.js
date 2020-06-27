import React from 'react'
import { connect } from 'react-redux';
import { Snackbar, Button, withStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = withStyles({
    icon: {
        alignSelf: 'center',
    },
    action: {
        display: 'none',
    }
  })(MuiAlert);

function ErrorSnackBar({errorMsg, status}) {
    
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        if(status){ 
            setError(true)
        }
    }, [status, errorMsg])

    const handleClose = () => {
        setError(false);
    }

    const getButtonAction = () => {
        switch(status){
            case 401: return () => window.location.reload(true)
            default: return () => setError(false)
        }
    }

    const getButtonText = () => {
        switch(status){
            case 401: return "Login Again.";
            default: return "Close";
        }
    }

    return (
        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={error}
                transitionDuration={100}
                autoHideDuration={6000}
            > 
                <Alert severity="error" onClose={handleClose} elevation={6} variant="filled" >
                {
                <React.Fragment>
                    <span style={{marginRight: "16px"}} >{errorMsg}</span>
                    <Button size="small" variant="outlined" onClick={getButtonAction()}>
                        {getButtonText()}
                    </Button>
                </React.Fragment>
                }
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
}

export default connect(store => store.errors)(ErrorSnackBar)
