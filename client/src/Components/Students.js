import React, { useState, useEffect } from 'react';
import {
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    LinearProgress 
} from '@material-ui/core'
import AddStudentForm from './Miniatures/AddStudentForm';
import FormatedTable from './Miniatures/FormatedTable';
import PageContainer from './Miniatures/PageContainer';
import { fetchStudents, fetchClasses } from '../Actions';
import { connect } from 'react-redux';

const tableFormatting = [{name: "Name", property: "name"}, {name: "Roll No", property: "rollNo"}, {name: "Class", property: 'className'}];
const refreshBtnStyles = {display: 'flex', flexDirection: 'row-reverse', margin: '10px 0'};

function Students({ studentsArray, isAllStudentsFetched, classesArray, classesCount, fetchStudents, fetchClasses }) {

    const [config, setConfig] = useState({
        addStudentDialogOpen: false,
        noClassesInProfileDialog: false,
    })

    useEffect(()=> {
        if(studentsArray === null || !isAllStudentsFetched) fetchStudents();
        if(classesArray === null) fetchClasses();
    // eslint-disable-next-line
    },[])
    
    useEffect(() => {
        setConfig({...config, addStudentDialogOpen: false});
    // eslint-disable-next-line
    }, [studentsArray])

    const toggleFAB = () => {
        if (classesCount === 0) return setConfig({ ...config, addStudentDialogOpen: false, noClassesInProfileDialog: true })
        setConfig({ ...config, addStudentDialogOpen: !config.addStudentDialogOpen });
    }

    const createReducedInfoArray = () => {
        let students = [];
        if(studentsArray === null) return [];
        studentsArray.forEach(stud => {
            students.push((({
                name: { firstName, lastName },
                rollNo,
                class: { className }
            }) => ({name: `${firstName} ${lastName}`, rollNo, className }))(stud))
        });
        return students;
    }

    const reducedStudentsObject = React.useMemo(createReducedInfoArray, [studentsArray]);

    const refresh = () => {
        fetchStudents();
    }

    return (
        <React.Fragment>
            <PageContainer onFabClick={toggleFAB} pageTitle="Students Section" >
                {
                    <React.Fragment>
                        <div style={refreshBtnStyles}>
                            <Button onClick={refresh}  variant="outlined" disabled={studentsArray === null} >Refresh</Button>
                        </div>
                        {
                            studentsArray === null ? <LinearProgress /> :
                            <div>
                                {
                                    <FormatedTable tableData={reducedStudentsObject} formatting={tableFormatting} />
                                }
                                <Dialog open={config.noClassesInProfileDialog} onClose={() => { setConfig({ ...config, noClassesInProfileDialog: false }) }}>
                                    <DialogTitle>We need Some More Data</DialogTitle>
                                    <DialogContent>In order to create student you will need to add class first</DialogContent>
                                    <DialogActions>
                                        <Button onClick={() => setConfig({ ...config, noClassesInProfileDialog: false })} >Okey</Button>
                                    </DialogActions>
                                </Dialog>
                                <AddStudentForm open={config.addStudentDialogOpen} toggleFAB={toggleFAB} />
                            </div>
                        }
                    </React.Fragment>
                }
            </PageContainer>
        </React.Fragment>
    )
}

export default connect(store => ({...store.students, classesArray: store.classes.classesArray }), { fetchStudents, fetchClasses })(Students)