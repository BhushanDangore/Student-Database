import React, { useEffect, useState } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchClassStudents } from '../Actions';

const tableFormatting = [{name: "Student Name", property: 'fullName'}, {name: "Roll Number", property: 'rollNo'}, {name: "Mobile Number", property: 'studentMobileNo'}];

function ClassPage({ classesArray, dispatch, studentsArray }) {
    let { class_name } = useParams();

    const [isFetched, setIsFetched] = useState(false);
    
    useEffect(() => {
        dispatch(fetchClassStudents(class_name))
        .then(() => setIsFetched(true))
    },[])
    
    let RcvStudents = null;

    if(isFetched && studentsArray){
        RcvStudents = studentsArray.filter(stud => stud.class.className === class_name);
    }
    
    return (
        <PageContainer noFab={true} pageTitle={`Class`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { RcvStudents === null && !isFetched ? <LinearProgress /> : <FormatedTable tableData={ RcvStudents } formatting={tableFormatting} /> }
        </PageContainer>
    )
}

export default connect(store => ({...store.classes, ...store.students}), dispatch => ({ dispatch }))(ClassPage)