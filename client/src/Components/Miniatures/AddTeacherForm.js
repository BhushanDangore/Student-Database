import React, { Fragment, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Divider, TextField, DialogActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { saveNewTeacherData } from './../../Actions/index';


function AddTeacherForm({ toggleFab, addTeacherFormOpen, saveNewTeacherData }) {

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
    });
    
    const saveTeacher = () => {
        saveNewTeacherData(formData);
    }

    const handleFormData = (e) => {
        switch(e.target.name){
            case 'name': setFormData({...formData, name: e.target.value})
                break;
            case 'mob': setFormData({...formData, mobile: e.target.value})
                break;
            case 'email': setFormData({...formData, email: e.target.value})
                break;
            default: return;
        }
    }

    return (
        <Fragment>
            <Dialog open={addTeacherFormOpen} onClose = {toggleFab} fullWidth={true} maxWidth={'sm'} >
                <DialogTitle >Add New Teacher</DialogTitle>
                <Divider />
                <DialogContent >
                        <TextField value={formData.name} label="Name" onChange={handleFormData} name='name' fullWidth />
                        <TextField value={formData.mobile} label="Mobile Number" onChange={handleFormData} name='mob' fullWidth />
                        <TextField value={formData.email} label="E-Mail" onChange={handleFormData} name='email' type='email' fullWidth />
                </DialogContent>
                <DialogActions >
                    <Button variant='contained' color='secondary' fullWidth onClick={saveTeacher} >Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default connect(null, {saveNewTeacherData})(AddTeacherForm)