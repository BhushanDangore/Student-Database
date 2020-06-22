import React, { useState, useEffect, useContext } from 'react'
import { Dialog, InputLabel, Button, TextField, makeStyles, Typography, Divider, NativeSelect } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { appStateContext } from '../../Contexts';
// eslint-disable-next-line
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

    const { register, handleSubmit, errors } = useForm();

    useEffect(() => {
        const data = localStorage.getItem('newStudentFormData');
        if (data !== null) {
            const prevStdData = JSON.parse(data);
            setStudent({ ...prevStdData });
        }
        // eslint-disable-next-line
    }, [])

    const initiateStdDataSave = (student) => {
        const {FName, LName, MName} = student;
        delete student.FName;
        delete student.LName;
        delete student.MName;
        student.name = { FName, LName, MName }

        saveStudent(student, dispatch)
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
            <form onSubmit={handleSubmit(initiateStdDataSave)} >
                <pre>{errors.exampleRequired && <span>{errors}</span>}</pre>
                <div className={`${classes.dialogContainer} ${classes.form}`}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant='h6' >Add Student</Typography>
                        <Button variant='outlined' onClick={clearForm} color="primary" >Clear</Button>
                    </div>
                    <Divider />
                    <div className={classes.multifields}>
                        <TextField
                            placeholder='Enter Name'
                            label='First Name'
                            name="FName"
                            inputRef={register({ required: true, min: 3 })}
                            error={errors.FName}  />

                        <TextField
                            placeholder='Last Name'
                            label='Last Name'
                            name="LName"
                            inputRef={register({ required: true, min: 3 })}
                            error={errors.LName}  />
                    </div>

                    <TextField
                        placeholder='Middle Name'
                        label='Middle Name'
                        variant='outlined'
                        name="MName"
                        inputRef={register({ required: true, min: 3 })}
                        error={errors.MName}  />

                    <TextField
                        placeholder='Father Name'
                        label='Father Name'
                        variant='outlined'
                        name="FatherName"
                        inputRef={register({ required: true, min: 5 })}
                        error={errors.FatherName}  />

                    <TextField
                        placeholder='Mother Name'
                        label='Mother Name'
                        variant='outlined'
                        name="MotherName"
                        inputRef={register({ required: true, min: 5 })}

                        error={errors.MotherName}  />
                    <TextField
                        placeholder='Mobile Number'
                        label='Mobile Number'
                        variant='outlined'
                        type='number'
                        name="MNumber"
                        inputRef={register({ required: true, minLength: 1, maxLength: 10 })}
                        error={errors.MNumber}  />

                    <div className={classes.multifields}>

                        <TextField
                            placeholder='Parents Contact'
                            label='Parents Contact'
                            type='number'
                            name="MPNumber"
                            inputRef={register({ required: true, minLength: 10, maxLength: 10 })}
                            error={errors.MPNumber}  />

                        <TextField
                            placeholder='Parents Contact 2'
                            label='Parents Contact 2'
                            helperText="Optional"
                            type='number'
                            name="MPNumber2"
                            inputRef={register({ required: false, minLength: 10, maxLength: 10 })}
                            error={errors.MPNumber2}  />

                    </div>
                    <TextField
                        placeholder='Aadhar Number'
                        label='Aadhar Number'
                        helperText="Optional"
                        type='number'
                        variant='outlined'
                        name="ANumber"
                        inputRef={register({ required: true, minLength: 12, maxLength: 12 })}
                        error={errors.ANumber}  />

                    <div className={classes.multifields}>
                        <InputLabel htmlFor="Gender">Gender</InputLabel>
                        <NativeSelect
                            label='Gender'
                            name="gender"
                            inputRef={register({ required: true })}
                            error={errors.gender}
                        >
                            <option >Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </NativeSelect>
                    </div>
                    <div className={classes.multifields}>
                        <InputLabel htmlFor="label">Category</InputLabel>
                        <NativeSelect
                            label='Category'
                            name="category"
                            inputRef={register({ required: true })}
                            error={errors.category}
                        >
                            <option>OBC</option>
                            <option>SC</option>
                            <option>SBC</option>
                        </NativeSelect>
                    </div>
                    <div className={classes.multifields}>
                        <InputLabel htmlFor="Class">Class</InputLabel>
                        <NativeSelect
                            label='Class'
                            name="class1"
                            inputRef={register({ required: true })}
                            error={errors.class1}
                        >
                            {
                                appState.classes.array.map((elm, index) => (<option key={index} >{elm.className}</option>))
                            }
                        </NativeSelect>
                    </div>
                    <TextField
                        placeholder='Caste'
                        label='Caste'
                        variant='outlined'
                        name="caste"
                        inputRef={register({ required: true, min: 3 })}
                        error={errors.caste}  />

                    <div className={classes.multifields}>
                        <TextField
                            name="dateBirthday"
                            inputRef={register({ required: true })}
                            label="Birthday"
                            type="date"
                            format="dd/MM/yyyy"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={errors.dateBirthday}  />

                        <TextField
                            name="dateAdmission"
                            inputRef={register({ required: true })}
                            label="Admission Date"
                            type="date"
                            format="dd/MM/yyyy"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={errors.dateAdmission}  />
                    </div>

                    <TextField
                        placeholder='Account Number'
                        label='Account Number'
                        variant='outlined'
                        type='number'
                        name="ACCNO"
                        inputRef={register({ required: true, minLength: 10, maxLength: 12 })}
                        error={errors.ACCNO}  />

                    <TextField
                        placeholder='IFSC'
                        label='IFSC'
                        variant='outlined'
                        name="IFSC"
                        inputRef={register({ required: true, min: 8 })}

                        error={errors.IFSC}  />
                    <Button
                        fullWidth
                        color='secondary'
                        variant='contained'
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}
