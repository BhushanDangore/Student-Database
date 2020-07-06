import React, { useEffect, useState, Fragment } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress, Table, TableBody, TableRow, TableCell, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Input, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from 'react-redux';
import { fetchClassStudents } from '../Actions';

const tableFormatting = [{ name: "Student Name", property: 'fullName' }, { name: "Roll Number", property: 'rollNo' }, { name: "Mobile Number", property: 'studentMobileNo' }];
const halfWidth = { width: "30%", fontWeight: "bold", textTransform: "uppercase" };
const marginTop = {marginTop: '16px'};

function ClassPage({ classesArray, dispatch, studentsArray }) {

    const [isFetched, setIsFetched] = useState(false);
    const [classData, setClassData] = useState(null);
    const [updateInfoDialog, setUpdateInfoDialog] = useState(false);

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
    }, [])


    const updateInfo = () => {

    }

    const closeUpdateInfoDialog = () => setUpdateInfoDialog(false);
    const openUpdateInfoDialog = () => setUpdateInfoDialog(true);

    let RcvStudents = null;

    if (isFetched && studentsArray) {
        RcvStudents = studentsArray.filter(stud => stud.class.className === class_name);
    }

    return (
        <PageContainer noFab={true} pageTitle={"Class"} >
            {classData ? <ClassDetails classData={classData} openUpdateInfoDialog={openUpdateInfoDialog} ></ClassDetails> : null}
            <Typography variant="h6" style={{ padding: "20px 10px" }} >Students </Typography>
            {RcvStudents === null && !isFetched ? <LinearProgress /> : <FormatedTable tableData={RcvStudents} formatting={tableFormatting} />}
            <Dialog
                open={updateInfoDialog}
                onClose={closeUpdateInfoDialog}
                maxWidth='xs'
            >
                <DialogTitle>Update Information</DialogTitle>
                <DialogContent>
                    <TextField label="Class Name" fullWidth variant="outlined" style={marginTop} ></TextField>
                    <TextField label="Class Number" fullWidth variant="outlined" type='number' style={marginTop}></TextField>
                    <TextField label="Class Teacher" fullWidth  variant="outlined" style={marginTop}></TextField>
                </DialogContent>
                <DialogActions>
                    <Button>Save</Button>
                </DialogActions>
            </Dialog>
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
                        <TableCell>: &emsp; {classData.classTeacher || <span> Not Assigned </span>}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Fragment>
    )
}

export default connect(store => ({ ...store.classes, ...store.students, ...store.teachers }), dispatch => ({ dispatch }))(ClassPage)