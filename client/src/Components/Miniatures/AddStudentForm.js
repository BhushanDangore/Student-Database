import React from 'react'
import { Dialog, InputLabel, Button, TextField, makeStyles, Typography, Divider, NativeSelect } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { connect } from 'react-redux';
import { saveNewStudentData, fetchClasses } from '../../Actions';

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

function AddStudentForm({ open, toggleFAB, saveNewStudentData, ...props }) {
    const classes = useStyles();

    const { register, handleSubmit, errors } = useForm();

    const initiateStdDataSave = (student) => {
        const {FName, LName, MName} = student;
        delete student.FName;
        delete student.LName;
        delete student.MName;
        const keyMap = { 
            MotherName: "motherName",
            FatherName: "fatherName",
            dateBirthday: "DOB",
            dateAdmission: "admissionDate",
            MNumber: "studentMobileNo",
            MPNumber: "parentMobileNo",
            MPNumber2: "parentMobileNo2",
            ANumber: "aadharNumber",
            ACCNO: "accountNo",
            IFSC: "IFSC",
            caste: "caste",
            category: "category",
            gender: "gender",
            class: "class",
        }
        const mappedData = Object.keys(keyMap).reduce((obj, k) => Object.assign(obj, { [keyMap[k]]: student[k] }),{});
        mappedData.name = { firstName: FName, lastName: LName, middleName: MName }
        saveNewStudentData(mappedData)
    } 

    const closeForm = () => {
        toggleFAB()
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
                    <Typography variant='h6' >Add Student</Typography>
                    <Divider />
                    <div className={classes.multifields}>
                        <TextField
                            placeholder='Enter Name'
                            label='First Name'
                            name="FName"
                            inputRef={register({ required: true, min: 3 })}
                            error={errors.FName ? true : false}  />

                        <TextField
                            placeholder='Last Name'
                            label='Last Name'
                            name="LName"
                            inputRef={register({ required: true, min: 3 })}
                            error={errors.LName ? true : false}  />
                    </div>

                    <TextField
                        placeholder='Middle Name'
                        label='Middle Name'
                        variant='outlined'
                        name="MName"
                        inputRef={register({ required: true, min: 3 })}
                        error={errors.MName ? true : false}  />

                    <TextField
                        placeholder='Father Name'
                        label='Father Name'
                        variant='outlined'
                        name="FatherName"
                        inputRef={register({ required: true, min: 5 })}
                        error={errors.FatherName ? true : false}  />

                    <TextField
                        placeholder='Mother Name'
                        label='Mother Name'
                        variant='outlined'
                        name="MotherName"
                        inputRef={register({ required: true, min: 5 })}
                        error={errors.MotherName ? true : false}  />

                    <TextField
                        placeholder='Mobile Number'
                        label='Mobile Number'
                        variant='outlined'
                        type='number'
                        name="MNumber"
                        inputRef={register({ required: true, minLength: 1, maxLength: 10 })}
                        error={errors.MNumber ? true : false}  />

                    <div className={classes.multifields}>

                        <TextField
                            placeholder='Parents Contact'
                            label='Parents Contact'
                            type='number'
                            name="MPNumber"
                            inputRef={register({ required: true, minLength: 10, maxLength: 10 })}
                            error={errors.MPNumber ? true : false}  />

                        <TextField
                            placeholder='Parents Contact 2'
                            label='Parents Contact 2'
                            helperText="Optional"
                            type='number'
                            name="MPNumber2"
                            inputRef={register({ required: false, minLength: 10, maxLength: 10 })}
                            error={errors.MPNumber2 ? true : false}  />

                    </div>
                    <TextField
                        placeholder='Aadhar Number'
                        label='Aadhar Number'
                        helperText="Optional"
                        type='number'
                        variant='outlined'
                        name="ANumber"
                        inputRef={register({ required: true, minLength: 12, maxLength: 12 })}
                        error={errors.ANumber ? true : false}  />

                    <div className={classes.multifields}>
                        <InputLabel htmlFor="Gender">Gender</InputLabel>
                        <NativeSelect
                            label='Gender'
                            name="gender"
                            inputRef={register({ required: true })}
                            error={errors.gender ? true : false}
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
                            error={errors.category ? true : false}
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
                            name="class"
                            inputRef={register({ required: true })}
                            error={errors.class1 ? true : false}
                        >
                            {
                                props.classesArray === null ? null : props.classesArray.map((elm, index) => (<option key={index} >{elm.className}</option>))
                            }
                        </NativeSelect>
                    </div>
                    <TextField
                        placeholder='Caste'
                        label='Caste'
                        variant='outlined'
                        name="caste"
                        inputRef={register({ required: true, min: 3 })}
                        error={errors.caste ? true : false}  />

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
                            error={errors.dateBirthday ? true : false}  />

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
                            error={errors.dateAdmission ? true : false}  />
                    </div>

                    <TextField
                        placeholder='Account Number'
                        label='Account Number'
                        variant='outlined'
                        type='number'
                        name="ACCNO"
                        inputRef={register({ required: true, minLength: 10, maxLength: 12 })}
                        error={errors.ACCNO ? true : false}  />

                    <TextField
                        placeholder='IFSC'
                        label='IFSC'
                        variant='outlined'
                        name="IFSC"
                        inputRef={register({ required: true, min: 8 })}

                        error={errors.IFSC ? true : false}  />
                    <Button
                        fullWidth
                        color='secondary'
                        variant='contained'
                        type="submit"
                        // disabled={} TODO: Make with loading to disable button.
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    )
}

export default connect(store => (store.classes), { saveNewStudentData, fetchClasses })(AddStudentForm)