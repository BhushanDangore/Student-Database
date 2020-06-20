import React, { useEffect, useContext } from 'react'
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
    let reducedStudentsObject;

    useEffect(() => {
        getClass(class_name, dispatch)

        // eslint-disable-next-line
    },[])

    
    const createReducedInfoArray = () => {
        let students = [];
        if(appState.students.loading) return null;
        console.log("expensive calculation")
        appState.students.array.forEach(stud => {
            if(stud.class.className === class_name)
            students.push((({
                name: { firstName, lastName },
                rollNo,
                studentMobileNo,
                class : {className}
            }) => ({name: `${firstName} ${lastName}`, rollNo, studentMobileNo, className }))(stud))
        });
        console.log("Calculated");
        return students;
    }

    reducedStudentsObject = React.useMemo(createReducedInfoArray, [appState.students.array]);
    
    return (
        <PageContainer noFab={true} pageTitle={`Class`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { !appState.students.array ? <LinearProgress /> :
                <FormatedTable tableData={reducedStudentsObject} formatting={tableFormatting} />
            }
        </PageContainer>
    )
}
