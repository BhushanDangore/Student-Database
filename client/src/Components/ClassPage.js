import React, { useEffect } from 'react'
import PageContainer from './Miniatures/PageContainer'
import { useParams } from 'react-router'
import FormatedTable from './Miniatures/FormatedTable';
import { Typography, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchClassStudents, feedClassStudentsArray } from '../Actions';

const tableFormatting = [{name: "Student Name", property: 'name'}, {name: "Roll Number", property: 'rollNo'}, {name: "Mobile Number", property: 'studentMobileNo'}]

function ClassPage({ classesArray, dispatch, studentsArray }) {
    let { class_name } = useParams();

    let indexOfCurrentClass;

    if(classesArray) {
        classesArray.forEach((_class, index) => {
            if(_class.className === class_name) return indexOfCurrentClass = index;
        })
    }

    let currentClass;
    if( classesArray ) currentClass = classesArray[indexOfCurrentClass];

    useEffect(() => {
        if(currentClass) dispatch(fetchClassStudents(class_name))
    },[])

    useEffect(() => {
        if(currentClass && 
            currentClass.isClassStudentsFetched && 
            studentsArray && 
            !currentClass.classStudents) 
            dispatch(feedClassStudentsArray(studentsArray, indexOfCurrentClass))
        // eslint-disable-next-line
    }, [classesArray, studentsArray])
    
    const currentClassStudents = React.useMemo(() => {
        if(classesArray && classesArray[indexOfCurrentClass].classStudents) {
            let currClassStudents = [];
            classesArray[indexOfCurrentClass].classStudents.forEach(index => {
                let student = {...studentsArray[index]};
                let { name } = student;
                student.name = `${name.firstName} ${name.lastName}`;
                currClassStudents.push(student);
            })
            return currClassStudents;
        }    
        else return null;
         // eslint-disable-next-line
        }, [classesArray, studentsArray])
        
    return (
        <PageContainer noFab={true} pageTitle={`Class`} >
            <Typography variant="h6" gutterBottom >Students </Typography>
            { studentsArray === null || currentClassStudents === null ? <LinearProgress /> : <FormatedTable tableData={ currentClassStudents } formatting={tableFormatting} /> }
        </PageContainer>
    )
}

export default connect(store => ({...store.classes, ...store.students}), dispatch => ({ dispatch }))(ClassPage)