import React, { useEffect, useContext } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress } from '@material-ui/core';
import { getClassStudents } from '../Actions';
import { appStateContext } from './../Contexts/index';
import useFetchDataWithLoading from './../Utils/useLoading';

const tableFormatting = [{name: "Student Name", property: 'name'}, {name: "Roll Number", property: 'rollNo'}, {name: "Mobile Number", property: 'studentMobileNo'}]

export default function ClassPage() {
    let { class_name } = useParams();

    const {appState} = useContext(appStateContext);
    let reducedStudentsObject;

    const [ loading, getClassStudentsWL ] = useFetchDataWithLoading(getClassStudents, true);

    useEffect(() => {
        getClassStudentsWL(class_name)
        // eslint-disable-next-line
    },[])
    
    const createReducedInfoArray = () => {
        let students = [];
        if(!appState.students.array) return [];
        appState.students.array.forEach(stud => {
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

    reducedStudentsObject = React.useMemo(createReducedInfoArray, [appState.students.array]);
    
    return (
        <PageContainer noFab={true} pageTitle={`Class`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { loading ? <LinearProgress /> : <FormatedTable tableData={reducedStudentsObject} formatting={tableFormatting} /> }
        </PageContainer>
    )
}
