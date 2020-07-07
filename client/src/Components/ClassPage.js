import React, { useEffect, useState, Fragment } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams, useHistory } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress, Table, TableBody, TableRow, TableCell, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Input, TextField, MenuItem, Select } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { fetchClassStudents, fetchTeachers, saveNewClassInfo } from '../Actions';

const tableFormatting = [{ name: "Student Name", property: 'fullName' }, { name: "Roll Number", property: 'rollNo' }, { name: "Mobile Number", property: 'studentMobileNo' }];
const halfWidth = { width: "30%", fontWeight: "bold", textTransform: "uppercase" };
const marginTop = {marginTop: '16px'};

function ClassPage({ classesArray, dispatch, studentsArray, teachersArray }) {

    const [isFetched, setIsFetched] = useState(false);
    const [classData, setClassData] = useState(null);
    const [updateInfoDialog, setUpdateInfoDialog] = useState(false);

    const history = useHistory();

    let { class_name } = useParams();

    useEffect(() => {
        if (classesArray) {
            classesArray.forEach(elem => {
                if (elem.className === class_name) {
                    setClassData(elem);
                }
                else return false;
            })
        }
    }, [classesArray]);

    useEffect(() => {
        dispatch(fetchClassStudents(class_name))
            .then(() => setIsFetched(true))
    }, [classData])

    const closeUpdateInfoDialog = () => setUpdateInfoDialog(false);
    const openUpdateInfoDialog = () => {
        if(!teachersArray) dispatch(fetchTeachers());
        setUpdateInfoDialog(true);
    }

    const saveUpdatedInfo = (newData) => {
        dispatch(saveNewClassInfo({...newData, classTeacher: newData.classTeacher.name}, class_name))
        .then(()=> {
            if(newData.className !== class_name) history.push(newData.className)
            setClassData(newData);
            closeUpdateInfoDialog();
        })

    };

    let RcvStudents = null;

    if (isFetched && studentsArray) {
        RcvStudents = studentsArray.filter(stud => stud.class.className === class_name);
    }

    return (
        <PageContainer noFab={true} pageTitle={"Class"} >
            {classData ? <ClassDetails classData={classData} openUpdateInfoDialog={openUpdateInfoDialog} ></ClassDetails> : null}
            <Typography variant="h6" style={{ padding: "20px 10px" }} >Students </Typography>
            {RcvStudents === null && !isFetched ? <LinearProgress /> : <FormatedTable tableData={RcvStudents} formatting={tableFormatting} />}
            <EditClassInfo updateInfoDialog={updateInfoDialog} closeUpdateInfoDialog={closeUpdateInfoDialog} saveUpdatedInfo={saveUpdatedInfo} teachersArray={teachersArray} classData={classData} />
        </PageContainer>
    )
}

const ClassDetails = ({ classData, openUpdateInfoDialog }) => {

    return (
        <Fragment >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" style={{ padding: "20px 10px" }} >Class Information</Typography>
                <IconButton style={{ margin: "auto 0" }} onClick={openUpdateInfoDialog} ><EditIcon /></IconButton>
            </div>

            <Table style={{ maxWidth: "380px", marginLeft: "20px" }} >
                <TableBody >
                    <TableRow>
                        <TableCell style={halfWidth} >Name</TableCell>
                        <TableCell>: &emsp; {classData.className}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={halfWidth}>Number</TableCell>
                        <TableCell>: &emsp; {classData.classNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell style={halfWidth}>Teacher </TableCell>
                        <TableCell>: &emsp; {classData.classTeacher?.name || <span> Not Assigned </span>}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Fragment>
    )
}

const EditClassInfo = ({updateInfoDialog, closeUpdateInfoDialog, saveUpdatedInfo, teachersArray, classData}) => {
    
    const [newClassData, setNewClassData] = useState(null);
    
    useEffect(()=> {
        setNewClassData(classData);
    },[classData])

    const updateDialogState = (e) => {
        switch(e.target.name){
            case "name": setNewClassData({...newClassData, className: e.target.value});
                break;
            case "number": setNewClassData({...newClassData, classNumber: e.target.value});
                break;
            case "teacher": setNewClassData({...newClassData, classTeacher: {name: e.target.value}});
                break;
            default: return;
        }
    }

    return (
        <Dialog
                open={updateInfoDialog}
                onClose={closeUpdateInfoDialog}
                maxWidth='xs'
            >
                <DialogTitle>Update Information</DialogTitle>
                <DialogContent>
                    <TextField label="Class Name" fullWidth variant="outlined" style={marginTop} name="name" value={newClassData?.className || ""} onChange={updateDialogState} />
                    <TextField label="Class Number" fullWidth variant="outlined" type='number' style={marginTop} name="number" value={newClassData?.classNumber || ""} onChange={updateDialogState} />
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        name="teacher"
                        value={newClassData?.classTeacher?.name || ""}
                        onChange={updateDialogState}
                        style={marginTop}
                        variant="outlined"
                        fullWidth
                    >
                        { teachersArray ? teachersArray.map((teacher, indx) => (<MenuItem key={indx} value={teacher.name} >{teacher.name}</MenuItem>)) : null }
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeUpdateInfoDialog}>Close</Button>
                    <Button onClick={() => saveUpdatedInfo(newClassData)}>Save</Button>
                </DialogActions>
            </Dialog>
    )
}

export default connect(store => ({ ...store.classes, ...store.students, ...store.teachers }), dispatch => ({ dispatch }))(ClassPage)