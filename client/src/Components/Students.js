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

const tableFormatting = [{name: "Name", property: "name"}, {name: "Roll No", property: "rollNo"}, {name: "Class", property: 'className'}];

export default function Students() {

    const { appState, dispatch } = useContext(appStateContext);

    const [config, setConfig] = useState({
        loading: true,
        addStudentDialogOpen: false,
        noClassesInProfileDialog: false,
    })

    useEffect(() => {
        if (appState.classes === null) getClasses(dispatch);
        if (appState.students === null) getStudents(dispatch);
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(appState.classes && appState.students) setConfig({...config, loading: false, addStudentDialogOpen: false});
        // eslint-disable-next-line
    }, [appState.classes, appState.students])

    const toggleFAB = () => {

        if (appState.classes.length === 0) return setConfig({ ...config, addStudentDialogOpen: false, noClassesInProfileDialog: true })

        setConfig({ ...config, addStudentDialogOpen: !config.addStudentDialogOpen });
    }

    const createReducedInfoArray = () => {
        let students = [];
        if(!(appState.students instanceof Array)) return null;
        appState.students.forEach(stud => {
            students.push((({
                name: { firstName, lastName },
                rollNo,
                class: { className }
            }) => ({name: `${firstName} ${lastName}`, rollNo, className }))(stud))
        });
        return students;
    }

    const reducedStudentsObject = React.useMemo(createReducedInfoArray, [appState.students]);

    return (
        <React.Fragment>
            <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Classes Section" >
                {
                    config.loading ? <LinearProgress /> :
                        <React.Fragment>
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
                        </React.Fragment>
                }
            </PageContainer>
        </React.Fragment>
    )
}
