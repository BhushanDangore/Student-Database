import React, { useEffect } from 'react'
import { LinearProgress } from '@material-ui/core';
import AddClassForm from './Miniatures/AddClassForm';
import FormatedTable from './Miniatures/FormatedTable';
import PageContainer from './Miniatures/PageContainer';
import { 
    Switch, 
    Route, 
    useRouteMatch,
} from 'react-router-dom';
import ClassPage from './ClassPage';
import { connect } from 'react-redux';
import { fetchClasses } from './../Actions/index';

const formatting = [{ name: 'Class Name', property: 'className' }, { name: 'Class Number', property: 'classNumber' }];

function Classes({ classesArray, fetchClasses }) {

    const [config, setConfig] = React.useState({
        addClassDialogOpen: false,
    })

    let { path } = useRouteMatch();

    useEffect(()=> {
        if(classesArray === null) return fetchClasses();
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(config.addClassDialogOpen) return setConfig({...config, addClassDialogOpen: false});
        // eslint-disable-next-line
    }, [classesArray])

    const toggleFAB = () => {
        setConfig({ addClassDialogOpen: !config.addClassDialogOpen })
    }

    return (
        <React.Fragment>
            <Switch>
                <Route exact path={path}>
                    <PageContainer onFabClick={toggleFAB} addClassDialogOpen={config.addClassDialogOpen} pageTitle="Classes Section" >
                    {
                        classesArray === null ? <LinearProgress /> : 
                            <FormatedTable 
                                tableData={classesArray} 
                                formatting={ formatting } 
                                linkPathIdentifire="className" 
                                prefixPath="classes" 
                            />
                    }
                    </PageContainer>
                    <AddClassForm open={config.addClassDialogOpen} closeForm={toggleFAB} />
                </Route>
                <Route path={`${path}/:class_name`}>
                    <ClassPage />
                </Route>
            </Switch>
        </React.Fragment>
    )
}

export default connect(store => (store.classes), { fetchClasses })(Classes)