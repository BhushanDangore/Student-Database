import React, { useState, useEffect, useContext } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress } from '@material-ui/core';
import { getClass } from '../Actions';
import { appStateContext } from './../Contexts/index';

const tableFormatting = [{name: "Student Name", property: 'name'}, {name: "Roll Number", property: 'rollNo'}, {name: "Mobile Number", property: 'studentMobileNo'}]

export default function ClassPage() {
    let { class_name } = useParams();

    const {appState, dispatch} = useContext(appStateContext);

    useEffect(() => {
        getClass(class_name, dispatch)
    },[])

    const createReducedInfoArray = () => {
        let students = [];
        if(!(appState.students instanceof Array)) return [];
        appState.students.forEach(stud => {
            if(stud.class.className === class_name)
            students.push((({
                name: { firstName, lastName },
                rollNo,
                studentMobileNo,
                class : {className}
            }) => ({name: `${firstName} ${lastName}`, rollNo, studentMobileNo, className }))(stud))
        });
        return students;
    }

    const reducedStudentsObject = React.useMemo(createReducedInfoArray, [appState.students, class_name]);

    console.log(reducedStudentsObject)

    return (
        <PageContainer noFab={true} pageTitle={`Class ${class_name}`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { !appState.students ? <LinearProgress /> :
                <FormatedTable tableData={reducedStudentsObject} formatting={tableFormatting} />
            }
        </PageContainer>
    )
}
