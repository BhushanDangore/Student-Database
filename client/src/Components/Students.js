import React, { useState, useContext, useEffect } from 'react';
import {
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    LinearProgress 
} from '@material-ui/core'
import AddStudentForm from './Miniatures/AddStudentForm';
import { appStateContext } from '../Contexts';
import { getClasses, getStudents } from '../Actions';
import FormatedTable from './Miniatures/FormatedTable';
import PageContainer from './Miniatures/PageContainer';
import useFetchDataWithLoading from './../Utils/useLoading';

const tableFormatting = [{name: "Name", property: "name"}, {name: "Roll No", property: "rollNo"}, {name: "Class", property: 'className'}];
const refreshBtnStyles = {display: 'flex', flexDirection: 'row-reverse', margin: '10px 0'};

export default function Students() {

    const { appState } = useContext(appStateContext);

    const [config, setConfig] = useState({
        addStudentDialogOpen: false,
        noClassesInProfileDialog: false,
    })
    const [studentsLoading, getStudentsWithLoading] = useFetchDataWithLoading(getStudents, true);
    const [classesLoading, getClassesWithLoading] = useFetchDataWithLoading(getClasses, true );

    useEffect(() => {
        if (appState.students.array === null) getStudentsWithLoading();
        if(appState.classes.array === null) getClassesWithLoading();
    // eslint-disable-next-line
    }, [])

    const refresh = () => {
        getStudentsWithLoading();
    }

    useEffect(() => {
        setConfig({...config, addStudentDialogOpen: false});    //To close the dialog after student is saved
        // eslint-disable-next-line
    }, [appState.students.array])

    const toggleFAB = () => {

        if (appState.classes.array.length === 0) return setConfig({ ...config, addStudentDialogOpen: false, noClassesInProfileDialog: true })

        setConfig({ ...config, addStudentDialogOpen: !config.addStudentDialogOpen });
    }

    const createReducedInfoArray = () => {
        let students = [];
        if(!appState.students.array) return [];
        appState.students.array.forEach(stud => {
            students.push((({
                name: { firstName, lastName },
                rollNo,
                class: { className }
            }) => ({name: `${firstName} ${lastName}`, rollNo, className }))(stud))
        });
        return students;
    }

    const reducedStudentsObject = React.useMemo(createReducedInfoArray, [appState.students.array]);

    return (
        <React.Fragment>
            <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Students Section" noFab={classesLoading} >
                {
                    <React.Fragment>
                        <div style={refreshBtnStyles}>
                            <Button onClick={refresh}  variant="outlined" disabled={studentsLoading} >Refresh</Button>
                        </div>
                        {
                            studentsLoading ? <LinearProgress /> :
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
                                { classesLoading ? null : <AddStudentForm open={config.addStudentDialogOpen} toggleFAB={toggleFAB} />}
                            </div>
                        }
                    </React.Fragment>
                }
            </PageContainer>

        </React.Fragment>
    )
}
