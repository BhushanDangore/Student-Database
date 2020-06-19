import React, { useState, useEffect, useContext } from 'react'
import { Dialog, Select, MenuItem, InputLabel, Button, TextField, makeStyles, Typography, Divider } from '@material-ui/core';
import { appStateContext } from '../../Contexts';
import { saveStudent } from '../../Actions';

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
    multifields: {
        display: "flex",
        '& > *': {
            flex: 1,
        },
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}
))

export default function AddStudentForm({ open, toggleFAB }) {
    const classes = useStyles();
    const defaultStudent = {
        name: {
            firstName: "",
            middleName: "",
            lastName: "",
        },
        motherName: "",
        fatherName: "",
        studentMobileNo: "",
        parentMobileNo: "",
        parentMobileNo2: "",
        aadharNumber: "",
        DOB: "",
        admissionDate: "",
        gender: "Male",
        category: "OBC",
        caste: "",
        accountNo: "",
        IFSC: "",
        class: "",
    }
    const [student, setStudent] = useState(defaultStudent)

    const { appState, dispatch } = useContext(appStateContext);

    useEffect(()=> {
        const data = localStorage.getItem('newStudentFormData');
        if(data !== null){
            const prevStdData = JSON.parse(data);
            setStudent({...prevStdData});
        }
        // eslint-disable-next-line
    },[])

    const [error, setError] = useState(false);
    const initiateStdDataSave = () => {
        setError(false)
        if(student.name.firstName && 
            student.name.middleName && 
            student.name.lastName && 
            student.motherName && 
            student.fatherName && 
            student.studentMobileNo && 
            student.parentMobileNo && 
            student.aadharNumber && 
            student.DOB &&
            student.admissionDate &&
            student.caste &&
            student.accountNo &&
            student.IFSC){
                saveStudent(student, dispatch)
            }
            else setError(true)
    }

    const closeForm = () => {
        localStorage.setItem('newStudentFormData', JSON.stringify(student));
        window.onbeforeunload = () => {
            localStorage.removeItem('newStudentFormData');
        };
        toggleFAB()
    }
    const clearForm = () => {
        localStorage.removeItem('newStudentFormData');
        setStudent(defaultStudent)
    }
    return (
        <Dialog
            open={open}
            fullWidth={true}
            maxWidth={'sm'}
            onClose={closeForm}>
            <div className={`${classes.dialogContainer} ${classes.form}`}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant='h6' >Add Student</Typography>
                    <Button variant='contained' onClick={clearForm} color='secondary'>Clear</Button>
                </div>
                <Divider />
                <div className={classes.multifields}>
                    <TextField
                        placeholder='Enter Name'
                        label='First Name'
                        id="FName"
                        value={student.name.firstName}
                        onChange={ e => setStudent({...student, name: { ...student.name, firstName: e.target.value }})}
                        error={student.name.firstName === "" && error} />
                    <TextField
                        placeholder='Last Name'
                        label='Last Name'
                        id="LName"
                        value={student.name.lastName}
                        onChange={(e) => {setStudent({...student, name: { ...student.name, lastName: e.target.value }})}}
                        error={student.name.lastName === "" && error} />

                </div>
                <TextField
                    placeholder='Middle Name'
                    label='Middle Name'
                    variant='outlined'
                    id="MName"
                    value={student.name.middleName}
                    onChange={(e) => {setStudent({...student, name: { ...student.name, middleName: e.target.value }})}}
                    error={student.name.middleName === "" && error} />
                <TextField
                    placeholder='Father Name'
                    label='Father Name'
                    variant='outlined'
                    id="FatherName"
                    value={student.fatherName}
                    onChange={(e)=>{ setStudent({...student, fatherName: e.target.value}) }}
                    error={student.fatherName === "" && error} />
                <TextField
                    placeholder='Mother Name'
                    label='Mother Name'
                    variant='outlined'
                    id="MotherName"
                    value={student.motherName}
                    onChange={(e)=>{ setStudent({...student, motherName: e.target.value}) }}
                    error={student.motherName === "" && error} />
                <TextField
                    placeholder='Mobile Number'
                    label='Mobile Number'
                    variant='outlined'
                    type='number'
                    id="MNumber"
                    value={student.studentMobileNo}
                    onChange={(e)=>{ setStudent({...student, studentMobileNo: e.target.value}) }}
                    error={student.studentMobileNo === "" && error} />
                <div className={classes.multifields}>
                    <TextField
                        placeholder='Parents Contact'
                        label='Parents Contact'
                        type='number'
                        id="MPNumber"
                        value={student.parentMobileNo}
                        onChange={(e)=>{ setStudent({...student, parentMobileNo: e.target.value}) }}
                        error={student.parentMobileNo === "" && error} />
                    <TextField
                        placeholder='Parents Contact 2'
                        label='Parents Contact 2'
                        helperText="Optional"
                        type='number'
                        id="MPNumber2"
                        value={student.parentMobileNo2}
                        onChange={(e)=>{ setStudent({...student, parentMobileNo2: e.target.value}) }}/>
                        
                </div>
                <TextField
                    placeholder='Aadhar Number'
                    label='Aadhar Number'
                    helperText="Optional"
                    type='number'
                    variant='outlined'
                    id="ANumber"
                    value={student.aadharNumber}
                    onChange={(e)=>{ setStudent({...student, aadharNumber: e.target.value}) }}
                    error={student.aadharNumber === "" && error} />
                <div className={classes.multifields}>
                    <InputLabel id="label">Gender</InputLabel>
                    <Select
                        label='Gender'
                        labelId="label"
                        id="select"
                        value={student.gender}
                        onChange={(e)=>{ setStudent({...student, gender: e.target.value}) }} >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>

                </div>
                <div className={classes.multifields}>
                    <InputLabel id="label">Category</InputLabel>
                    <Select
                        label='Category'
                        labelId="label"
                        id="select"
                        value={student.category}
                        onChange={(e)=>{ setStudent({...student, category: e.target.value}) }}>
                        <MenuItem value="OBC">OBC</MenuItem>
                        <MenuItem value="SC">SC</MenuItem>
                        <MenuItem value="SBC">SBC</MenuItem>
                    </Select>
                </div>
                <div className={classes.multifields}>
                    <InputLabel id="label">Class</InputLabel>
                    <Select
                        label='Category'
                        labelId="label"
                        id="select"
                        value={ student.class }
                        onChange={(e)=>{ setStudent({...student, class: e.target.value}) }}>
                        {
                            appState.classes.array.map((elm, index) => (<MenuItem value={elm.className} key={index}>{elm.className}</MenuItem>))
                        }
                    </Select>
                </div>
                <TextField 
                    placeholder='Caste'
                    label='Caste' 
                    variant='outlined' 
                    id="Caste" 
                    value={student.caste} 
                    onChange={(e)=>{ setStudent({...student, caste: e.target.value}) }} 
                    error={student.caste === "" && error} />
                <div className={classes.multifields}>
                    <TextField
                        id="date"
                        label="Birthday"
                        type="date"
                        format="dd/MM/yyyy"
                        value={ student.DOB ? student.DOB : ""}
                        className={classes.textField}
                        onChange={(e)=>{ setStudent({...student, DOB: e.target.value}) }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={student.DOB === "" && error} />
                    
                    <TextField
                        id="date"
                        label="Admission Date"
                        type="date"
                        format="dd/MM/yyyy"
                        value={ student.admissionDate ? student.admissionDate : ""}
                        className={classes.textField}
                        onChange={(e)=>{ setStudent({...student, admissionDate: e.target.value}) }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={student.admissionDate === "" && error} />
                </div>
                
                <TextField 
                    placeholder='Account Number' 
                    label='Account Number' 
                    variant='outlined' 
                    type='number' 
                    id="ACCNO" 
                    value={student.accountNo} 
                    onChange={(e)=>{ setStudent({...student, accountNo: e.target.value}) }} 
                    error={student.accountNo === "" && error} />
                <TextField 
                    placeholder='IFSC'
                    label='IFSC' 
                    variant='outlined' 
                    id="IFSC" 
                    value={student.IFSC} 
                    onChange={(e)=>{ setStudent({...student, IFSC: e.target.value}) }} 
                    error={student.IFSC === "" && error} />
                <Button 
                    onClick={initiateStdDataSave} 
                    fullWidth 
                    color='secondary' 
                    variant='contained'>
                        Save
                </Button>
            </div>
        </Dialog>
    )
}
