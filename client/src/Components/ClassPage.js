import React, { useEffect } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchClassStudents } from '../Actions';

const tableFormatting = [{name: "Student Name", property: 'name'}, {name: "Roll Number", property: 'rollNo'}, {name: "Mobile Number", property: 'studentMobileNo'}]

function ClassPage({ studentsArray, fetchClassStudents }) {
    let { class_name } = useParams();

    let reducedStudentsObject;

    useEffect(() => {
        fetchClassStudents(class_name);
        // eslint-disable-next-line
    },[])
    
    const createReducedInfoArray = () => {
        let students = [];
        if(!studentsArray) return [];
        studentsArray.forEach(stud => {
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

    reducedStudentsObject = React.useMemo(createReducedInfoArray, [studentsArray]);
    
    return (
        <PageContainer noFab={true} pageTitle={`Class`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { studentsArray === null ? <LinearProgress /> : <FormatedTable tableData={reducedStudentsObject} formatting={tableFormatting} /> }
        </PageContainer>
    )
}

export default connect(store => ({...store.classes, studentsArray: store.students.studentsArray}), { fetchClassStudents })(ClassPage)