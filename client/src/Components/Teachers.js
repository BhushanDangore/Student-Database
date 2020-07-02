import React, { useState, Fragment, useEffect } from 'react'
import PageContainer from './Miniatures/PageContainer'
import AddTeacherForm from './Miniatures/AddTeacherForm';
import { connect } from 'react-redux';
import { fetchTeachers } from '../Actions';
import { LinearProgress } from '@material-ui/core';
import FormatedTable from './Miniatures/FormatedTable';

const tableFormatting = [{name: "Name", property: "name"}, {name: "Mobile Number", property: "contactNo"}, {name: "Email", property: 'email'}];

function Teachers({teachers, fetchTeachers}) {

    const [addTeacherFormOpen, setAddTeacherFormOpen] = useState(false)
    
    const toggleFab = () => {
        setAddTeacherFormOpen(!addTeacherFormOpen);
    }

    useEffect(() => {
        if(!teachers.teachersArray) fetchTeachers();
    },[])

    useEffect(()=> {
        setAddTeacherFormOpen(false);
    }, [teachers.teachersArray])

    return (
        <Fragment>
            <PageContainer onFabClick= {toggleFab} pageTitle="Teachers Section" >
                {
                    teachers.teachersArray instanceof Array ?
                    <FormatedTable tableData={teachers.teachersArray} formatting={tableFormatting} />
                    :
                    <LinearProgress />
                }
            </PageContainer>
            <AddTeacherForm toggleFab={toggleFab} addTeacherFormOpen={addTeacherFormOpen} />
        </Fragment>
    )
}
export default connect((store)=>({teachers: store.teachers}), { fetchTeachers })(Teachers)