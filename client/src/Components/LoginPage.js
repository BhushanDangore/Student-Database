import React from 'react'
import { makeStyles, TextField, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        '& > *': {
            margin: '8px 0',
        }
    },
    
})

function LoginPage() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        email: '',
        password: ''
    })

    return (
        <div className={classes.root} >
            <div className={classes.form}>
                <p >Email and password authentication is in development Google OAuth is active. </p>
                <TextField 
                    label='Email'
                    placeholder='Email ID' 
                    type='email' 
                    variant='outlined'
                    error={false}
                    fullWidth
                    onChange={(e)=>{setState({...state, email: e.target.value})}}
                />
                <TextField
                    label='Password'
                    placeholder='Password'
                    variant='outlined'
                    type='password'
                    error={false}
                    fullWidth
                    onChange={(e)=>{setState({...state, password: e.target.value})}} 
                />
                <Button fullWidth variant='outlined' >Login</Button>
                <Typography align='center' >OR</Typography>
                <Button fullWidth variant='contained' color='secondary' href='/api/login/google' >Login With Gmail</Button>
            </div>
        </div>
    )
}

export default React.memo(LoginPage);